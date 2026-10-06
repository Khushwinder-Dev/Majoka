import { NextRequest, NextResponse } from "next/server";
import { processFormSubmission } from "@/lib/sheetsAndEmail";
import fs from "fs";
import path from "path";

const ALLOWED_EXTENSIONS = new Set([".pdf", ".doc", ".docx"]);
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB limit

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

    // Validate file size and extension
    const ext = path.extname(cvFile.name || "").toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json(
        { error: "Invalid file format. Only PDF and Word (.pdf, .doc, .docx) documents are accepted." },
        { status: 400 }
      );
    }

    if (cvFile.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "File size exceeds the 10MB limit. Please upload a smaller file." },
        { status: 400 }
      );
    }

    const cvBuffer = Buffer.from(await cvFile.arrayBuffer());
    const cvFileSizeFormatted = `${(cvFile.size / 1024 / 1024).toFixed(2)} MB`;

    // ── 1. STORE RESUME ON SERVER ──────────────────────────────
    const uploadDir = path.join(process.cwd(), "public", "uploads", "resumes");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const cleanCandidate = fullName.replace(/[^a-zA-Z0-9_-]/g, "_").substring(0, 30);
    const cleanOrigName = path.basename(cvFile.name, ext).replace(/[^a-zA-Z0-9_-]/g, "_").substring(0, 30);
    const timestamp = Date.now();
    const uniqueFileName = `resume_${timestamp}_${cleanCandidate || cleanOrigName}${ext}`;
    const destinationPath = path.join(uploadDir, uniqueFileName);

    fs.writeFileSync(destinationPath, cvBuffer);

    // Derive server base URL from request headers
    const forwardedHost = request.headers.get("x-forwarded-host");
    const host = forwardedHost || request.headers.get("host") || "localhost:3000";
    const proto = request.headers.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
    const origin = `${proto}://${host}`;

    // Direct permanent links to check/download the resume
    const directFileUrl = `${origin}/uploads/resumes/${uniqueFileName}`;
    const apiFileUrl = `${origin}/api/resumes/${uniqueFileName}`;

    // ── 2. MAINTAIN LOCAL APPLICATIONS INDEX ───────────────────
    try {
      const indexPath = path.join(uploadDir, "applications_index.json");
      let applicationsList: any[] = [];
      if (fs.existsSync(indexPath)) {
        try {
          applicationsList = JSON.parse(fs.readFileSync(indexPath, "utf-8"));
          if (!Array.isArray(applicationsList)) applicationsList = [];
        } catch {
          applicationsList = [];
        }
      }

      applicationsList.unshift({
        id: `APP-${timestamp}`,
        submittedAt: new Date().toISOString(),
        fullName,
        email,
        phone,
        jobTitle,
        jobId,
        experience,
        coverLetter: coverLetter || "None",
        originalFileName: cvFile.name,
        fileSize: cvFileSizeFormatted,
        storedFileName: uniqueFileName,
        resumeLink: directFileUrl,
        apiLink: apiFileUrl,
      });

      // Keep recent 500 applications stored in local JSON index
      fs.writeFileSync(indexPath, JSON.stringify(applicationsList.slice(0, 500), null, 2), "utf-8");
    } catch (indexErr) {
      console.warn("Could not write to applications_index.json:", indexErr);
    }

    // ── 3. PREPARE DATA FOR GOOGLE SHEETS & EMAIL NOTIFICATION ──
    const cvBase64 = cvBuffer.toString("base64");

    const sheetData = {
      jobTitle,
      jobId,
      fullName,
      email,
      phone,
      experience,
      cvLink: directFileUrl,
      cvUrl: directFileUrl,
      resumeLink: directFileUrl,
      cvFileName: `${cvFile.name} (${cvFileSizeFormatted})`,
      cvBase64,
      cvMimeType: cvFile.type || "application/pdf",
      coverLetter,
    };

    const fields = [
      { label: "Position Applied", value: `${jobTitle} (Job ID: ${jobId})` },
      { label: "Applicant Name", value: fullName },
      { label: "Email Address", value: email },
      { label: "Phone Number", value: phone },
      { label: "Years of Experience", value: experience },
      { label: "CV / Resume Link (Click to View)", value: directFileUrl },
      { label: "Original Resume File", value: `${cvFile.name} (${cvFileSizeFormatted})` },
      { label: "Cover Letter / Notes", value: coverLetter || "None provided" },
    ];

    // Concurrently sync to Google Sheet tab 5_Careers and send email notification
    await processFormSubmission({
      formType: "5_Careers",
      title: `New Career Application: ${jobTitle} - ${fullName}`,
      data: sheetData,
      fields,
      attachments: [
        {
          filename: cvFile.name,
          content: cvBuffer,
          contentType: cvFile.type || "application/pdf",
        },
      ],
    });

    return NextResponse.json(
      {
        message: "Application submitted successfully",
        resumeUrl: directFileUrl,
        apiResumeUrl: apiFileUrl,
        fileName: cvFile.name,
      },
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
