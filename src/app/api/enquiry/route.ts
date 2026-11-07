import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { EnquiryType, EnquiryStatus } from "@prisma/client";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

function getStorageConfig() {
  // 1. If an explicit Persistent Disk mount path is configured (e.g. Render Persistent Disk at /var/data/storage)
  if (process.env.PERSISTENT_STORAGE_DIR) {
    return { dir: process.env.PERSISTENT_STORAGE_DIR, isDurable: true };
  }
  // 2. On Vercel / serverless platforms, only /tmp is writable but is strictly ephemeral
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return { dir: path.join("/tmp", "kwality_storage"), isDurable: false };
  }
  // 3. On Render Web Service default container (without a Persistent Disk), the filesystem is ephemeral across deploys
  if (process.env.RENDER) {
    return { dir: path.join(process.cwd(), "storage"), isDurable: false };
  }
  // 4. Local development environment
  return { dir: path.join(process.cwd(), "storage"), isDurable: true };
}

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const {
    enquiryType,
    customerName,
    companyName,
    contactPerson,
    email,
    phone,
    address,
    consumption,
    establishmentType,
    requiredDate,
    message,
  } = body;

  if (!customerName || !customerName.trim()) {
    return NextResponse.json(
      { error: "Please enter your full name or company name." },
      { status: 400 }
    );
  }

  if (!phone || !phone.trim() || phone.trim().length < 8) {
    return NextResponse.json(
      { error: "Please enter a valid contact phone number (at least 8 digits)." },
      { status: 400 }
    );
  }

  const type: EnquiryType =
    enquiryType && ["DOMESTIC", "COMMERCIAL", "INDUSTRIAL"].includes(enquiryType.toUpperCase())
      ? (enquiryType.toUpperCase() as EnquiryType)
      : EnquiryType.DOMESTIC;

  const enquiryData = {
    enquiryType: type,
    customerName: customerName.trim(),
    companyName: companyName ? companyName.trim() : null,
    contactPerson: contactPerson ? contactPerson.trim() : null,
    email: email ? email.trim() : "",
    phone: phone.trim(),
    address: address ? address.trim() : null,
    consumption: consumption ? consumption.trim() : null,
    establishmentType: establishmentType ? establishmentType.trim() : null,
    requiredDate: requiredDate ? requiredDate.trim() : null,
    message: message ? message.trim() : null,
    status: EnquiryStatus.NEW,
  };

  // 1. Primary persistence: Relational database via Prisma
  try {
    const newEnquiry = await prisma.enquiry.create({
      data: enquiryData,
    });

    return NextResponse.json({
      success: true,
      message: "Your enquiry has been received successfully! Our representative will contact you shortly.",
      enquiryId: newEnquiry.id,
      persistedTo: "database",
    });
  } catch (dbError: any) {
    console.warn("Database connection unavailable, checking durable webhook fallback:", dbError.message);

    // 2. Secondary persistence: Cloud Webhook (e.g., Slack, CRM, Zapier, Google Sheets)
    const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        const webhookRes = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "new_enquiry",
            timestamp: new Date().toISOString(),
            data: enquiryData,
          }),
        });

        if (webhookRes.ok) {
          return NextResponse.json({
            success: true,
            message: "Your enquiry has been safely received and queued for priority processing.",
            enquiryId: "webhook-" + Date.now(),
            persistedTo: "webhook",
          });
        }
      } catch (webhookErr: any) {
        console.error("Webhook dispatch failed:", webhookErr.message);
      }
    }

    // 3. Persistent Disk or Emergency Buffer Fallback
    try {
      const { dir: storageDir, isDurable } = getStorageConfig();
      if (!fs.existsSync(storageDir)) {
        fs.mkdirSync(storageDir, { recursive: true });
      }
      const record = {
        ...enquiryData,
        id: "offline-" + Date.now() + "-" + Math.random().toString(36).substring(2, 8),
        createdAt: new Date().toISOString(),
      };
      fs.appendFileSync(
        path.join(storageDir, "offline_enquiries.jsonl"),
        JSON.stringify(record) + "\n",
        "utf8"
      );

      // If the storage directory is a verified durable persistent disk (e.g. Render Persistent Disk mount)
      if (isDurable) {
        return NextResponse.json({
          success: true,
          message: "Your enquiry has been safely queued on secure persistent storage for priority follow-up.",
          enquiryId: record.id,
          persistedTo: "persistent-disk",
        });
      }

      // If running on an ephemeral filesystem (Render default container or Vercel serverless):
      // Record was written to disk for emergency admin inspection, but DO NOT claim durable success to customer.
      console.warn("Storage warning: Database unavailable and filesystem is ephemeral. Returning 503 so customer contacts hotline.");
      return NextResponse.json(
        {
          error: "Our online booking system is momentarily unavailable while database maintenance is underway. Please call our 24/7 marketing hotline directly at +91 78997 87101 or email kwalitygasmarketing@gmail.com for immediate priority assistance.",
        },
        { status: 503 }
      );
    } catch (fsError: any) {
      console.error("Filesystem fallback failed as well:", fsError.message);
      return NextResponse.json(
        {
          error: "Our online booking system is momentarily unavailable. Please contact our 24/7 hotline directly at +91 78997 87101 or email kwalitygasmarketing@gmail.com.",
        },
        { status: 503 }
      );
    }
  }
}
