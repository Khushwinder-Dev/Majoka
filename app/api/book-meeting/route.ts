import { NextRequest, NextResponse } from "next/server";
import { processFormSubmission } from "@/lib/sheetsAndEmail";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, meetingDate, meetingTime, notes } = body;

    // Validate required fields
    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (!email || !email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json(
        { error: "A valid email address is required" },
        { status: 400 }
      );
    }

    if (!service || !service.trim()) {
      return NextResponse.json(
        { error: "Please select a service for your meeting query" },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = (phone || "").trim();
    const trimmedService = service.trim();
    const preferredSchedule =
      meetingDate || meetingTime
        ? `${meetingDate || ""} ${meetingTime ? `(${meetingTime})` : ""}`.trim()
        : "Flexible / Any Time";
    const trimmedNotes = (notes || "").trim();

    // Data for Google Sheets (2_Free_Consultation)
    const sheetData = {
      fullName: trimmedName,
      companyName: "N/A (Book a Meeting)",
      email: trimmedEmail,
      phone: trimmedPhone || "Not provided",
      service: trimmedService,
      preferredSchedule,
      meetingDate: meetingDate || "",
      meetingTime: meetingTime || "",
      message: trimmedNotes || "Meeting consultation booking request",
      notes: trimmedNotes,
    };

    // Fields for email notification
    const fields = [
      { label: "Client Name", value: trimmedName },
      { label: "Email Address", value: trimmedEmail },
      { label: "Phone / WhatsApp", value: trimmedPhone || "Not provided" },
      { label: "Requested Service", value: trimmedService },
      { label: "Preferred Schedule", value: preferredSchedule },
      { label: "Meeting Notes", value: trimmedNotes || "None provided" },
    ];

    await processFormSubmission({
      formType: "2_Free_Consultation",
      title: `Meeting Booking Request from ${trimmedName} (${trimmedService})`,
      data: sheetData,
      fields,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Meeting request received successfully. Our team will contact you shortly.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing meeting booking:", error);
    return NextResponse.json(
      { error: "Internal server error occurred while processing meeting request." },
      { status: 500 }
    );
  }
}
