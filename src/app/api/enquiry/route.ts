import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
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

    if (!customerName || !phone) {
      return NextResponse.json(
        { error: "Customer name and phone number are required." },
        { status: 400 }
      );
    }

    const type = enquiryType && ["DOMESTIC", "COMMERCIAL", "INDUSTRIAL"].includes(enquiryType.toUpperCase())
      ? enquiryType.toUpperCase()
      : "DOMESTIC";

    const newEnquiry = await prisma.enquiry.create({
      data: {
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
        status: "NEW",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Your enquiry has been received successfully! Our representative will contact you shortly.",
      enquiryId: newEnquiry.id,
    });
  } catch (error: any) {
    console.error("Enquiry submission error:", error);
    return NextResponse.json(
      { error: "An error occurred while submitting your enquiry. Please try again or call our office." },
      { status: 500 }
    );
  }
}

