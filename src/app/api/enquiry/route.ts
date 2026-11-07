import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { EnquiryType, EnquiryStatus } from "@prisma/client";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

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
    console.error("Database enquiry insertion failed, attempting safe storage fallback:", dbError.message);

    // Safe disk backup fallback if running in a Node environment with filesystem access
    try {
      const storageDir = path.join(process.cwd(), "storage");
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

      return NextResponse.json({
        success: true,
        message: "Your enquiry has been safely received and queued for priority follow-up by our marketing team.",
        enquiryId: record.id,
        persistedTo: "queue",
      });
    } catch (fsError: any) {
      console.error("Filesystem fallback failed as well:", fsError.message);
      return NextResponse.json(
        {
          error: "Database service is momentarily unavailable. Please contact our 24/7 hotline directly at +91 78997 87101 or email kwalitygasmarketing@gmail.com.",
        },
        { status: 503 }
      );
    }
  }
}
