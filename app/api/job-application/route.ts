import { NextRequest, NextResponse } from "next/server";
import { processFormSubmission } from "@/lib/sheetsAndEmail";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const fullName = (formData.get("fullName") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim();
    const experience = (formData.get("experience") as string)?.trim();
    const coverLetter = (formData.get("coverLetter") as string)?.trim() || "";
    const jobTitle = (formData.get("jobTitle") as string)?.trim();
    const jobId = (formData.get("jobId") as string)?.trim() || "";
    const cvFile = formData.get("cv") as File | null;

    if (!fullName || !email || !phone || !experience || !jobTitle || !cvFile) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    const cvBuffer = Buffer.from(await cvFile.arrayBuffer());
    const cvFileSizeFormatted = `${(cvFile.size / 1024 / 1024).toFixed(2)} MB`;

    // Data for Google Sheets
    const sheetData = {
      jobTitle,
      jobId,
      fullName,
      email,
      phone,
      experience,
      cvFileName: `${cvFile.name} (${cvFileSizeFormatted})`,
      coverLetter,
    };

    // Fields for formatted email
    const fields = [
      { label: "Position Applied", value: `${jobTitle} (Job ID: ${jobId})` },
      { label: "Applicant Name", value: fullName },
      { label: "Email Address", value: email },
      { label: "Phone Number", value: phone },
      { label: "Years of Experience", value: experience },
      { label: "Attached CV / Resume", value: `${cvFile.name} (${cvFileSizeFormatted})` },
      { label: "Cover Letter / Notes", value: coverLetter || "None provided" },
    ];

    // Concurrently log to Google Sheet tab 5_Careers and email owner with CV attachment
    await processFormSubmission({
      formType: "5_Careers",
      title: `New Career Application: ${jobTitle} - ${fullName}`,
      data: sheetData,
      fields,
      attachments: [
        {
          filename: cvFile.name,
          content: cvBuffer,
          contentType: cvFile.type,
        },
      ],
    });

    return NextResponse.json(
      { message: "Application submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting job application:", error);
    return NextResponse.json(
      { error: "Failed to submit application. Please try again later." },
      { status: 500 }
    );
  }
}
