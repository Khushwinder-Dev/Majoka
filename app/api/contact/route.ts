import { NextRequest, NextResponse } from "next/server";
import { processFormSubmission, FormType } from "@/lib/sheetsAndEmail";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let body: Record<string, any> = {};
    const rawFiles: File[] = [];

    // Support both multipart/form-data (with file uploads) and application/json
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          if (value.size > 0 && value.name) {
            rawFiles.push(value);
          }
        } else {
          body[key] = value;
        }
      }
    } else {
      body = await request.json().catch(() => ({}));
    }

    const {
      fullName,
      phone,
      phoneNumber,
      email,
      emailAddress,
      company,
      companyName,
      description,
      message,
      service,
      projectType,
      projectLocation,
      files: rawBodyFiles,
      offerDetails,
      notes,
    } = body;

    const resolvedName = (fullName || body.name || "").toString().trim();
    const resolvedPhone = (phone || phoneNumber || "").toString().trim();
    const resolvedEmail = (email || emailAddress || "").toString().trim();
    const resolvedCompany = (companyName || company || "").toString().trim();
    const resolvedMessage = (message || notes || description || "").toString().trim();
    const resolvedService = (service || projectType || "").toString().trim();

    // Validate essential fields
    if (!resolvedName && !resolvedEmail && !resolvedPhone) {
      return NextResponse.json(
        { error: "Please provide your contact information (name, phone or email)." },
        { status: 400 }
      );
    }

    // Determine target form type and sheet tab
    let formType: FormType = "4_Contact_Us";
    let title = "New Contact Us Inquiry";

    if (body.formType) {
      const ft = body.formType.toString().trim();
      if (
        ft === "1_Welcome_Popup" ||
        ft === "2_Free_Consultation" ||
        ft === "3_Subscriptions" ||
        ft === "4_Contact_Us" ||
        ft === "5_Careers" ||
        ft === "6_Technology_Expert" ||
        ft === "7_Get_A_Quote"
      ) {
        formType = ft;
      }
    } else {
      // Auto-detect based on context if not explicitly passed
      const combined = `${resolvedService} ${resolvedMessage}`.toLowerCase();
      if (combined.includes("welcome offer") || combined.includes("10% discount")) {
        formType = "1_Welcome_Popup";
      } else if (
        resolvedService.toLowerCase() === "free consultation" ||
        combined.includes("consultation request")
      ) {
        formType = "2_Free_Consultation";
      } else if (
        combined.includes("quote request") ||
        combined.includes("[project type:") ||
        projectLocation ||
        rawFiles.length > 0
      ) {
        formType = "7_Get_A_Quote";
      } else if (
        combined.includes("technology expert") ||
        combined.includes("talk to an expert") ||
        combined.includes("technical expert")
      ) {
        formType = "6_Technology_Expert";
      }
    }

    // Set human-readable title based on formType
    switch (formType) {
      case "1_Welcome_Popup":
        title = `Welcome Offer Claim (10% Discount) from ${resolvedName}`;
        break;
      case "2_Free_Consultation":
        title = `Free Consultation Request from ${resolvedName}`;
        break;
      case "6_Technology_Expert":
        title = `Technology Expert Inquiry from ${resolvedName}`;
        break;
      case "7_Get_A_Quote":
        title = `Project Quote Request from ${resolvedName}${resolvedService ? ` (${resolvedService})` : ""}`;
        break;
      default:
        title = `New Contact Inquiry from ${resolvedName}`;
        break;
    }

    // ── PROCESS & STORE UPLOADED FILES (DRAWINGS / BOQ) ──────────────
    const savedFilesInfo: Array<{
      originalName: string;
      sizeFormatted: string;
      directUrl: string;
      apiUrl: string;
      buffer: Buffer;
      contentType: string;
    }> = [];

    const origin = (() => {
      const forwardedHost = request.headers.get("x-forwarded-host");
      const host = forwardedHost || request.headers.get("host") || "localhost:3000";
      const proto = request.headers.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
      return `${proto}://${host}`;
    })();

    if (rawFiles.length > 0) {
      const quotesDir = path.join(process.cwd(), "public", "uploads", "quotes");
      if (!fs.existsSync(quotesDir)) {
        fs.mkdirSync(quotesDir, { recursive: true });
      }

      for (let i = 0; i < rawFiles.length; i++) {
        const file = rawFiles[i];
        const ext = path.extname(file.name || "").toLowerCase();
        const cleanBase = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "_").substring(0, 30);
        const cleanCandidate = resolvedName.replace(/[^a-zA-Z0-9_-]/g, "_").substring(0, 20);
        const timestamp = Date.now();
        const uniqueFileName = `quote_${timestamp}_${i + 1}_${cleanCandidate || cleanBase}${ext}`;
        const filePath = path.join(quotesDir, uniqueFileName);

        const buffer = Buffer.from(await file.arrayBuffer());
        fs.writeFileSync(filePath, buffer);

        const directUrl = `${origin}/uploads/quotes/${uniqueFileName}`;
        const apiUrl = `${origin}/api/quotes/${uniqueFileName}`;
        const sizeFormatted = `${(file.size / 1024 / 1024).toFixed(2)} MB`;

        savedFilesInfo.push({
          originalName: file.name,
          sizeFormatted,
          directUrl,
          apiUrl,
          buffer,
          contentType: file.type || "application/octet-stream",
        });
      }

      // Maintain local quotes applications log
      try {
        const indexPath = path.join(quotesDir, "quotes_index.json");
        let quotesIndex: any[] = [];
        if (fs.existsSync(indexPath)) {
          try {
            quotesIndex = JSON.parse(fs.readFileSync(indexPath, "utf-8"));
            if (!Array.isArray(quotesIndex)) quotesIndex = [];
          } catch {
            quotesIndex = [];
          }
        }

        quotesIndex.unshift({
          id: `QUOTE-${Date.now()}`,
          submittedAt: new Date().toISOString(),
          fullName: resolvedName,
          phone: resolvedPhone,
          email: resolvedEmail,
          companyName: resolvedCompany,
          projectType: projectType || resolvedService,
          projectLocation,
          projectDetails: resolvedMessage,
          files: savedFilesInfo.map((f) => ({
            name: f.originalName,
            size: f.sizeFormatted,
            directUrl: f.directUrl,
            apiUrl: f.apiUrl,
          })),
        });

        fs.writeFileSync(indexPath, JSON.stringify(quotesIndex.slice(0, 500), null, 2), "utf-8");
      } catch (logErr) {
        console.warn("Could not log to quotes_index.json:", logErr);
      }
    }

    // Construct readable file links text
    let filesSummary = "None";
    if (savedFilesInfo.length > 0) {
      filesSummary = savedFilesInfo
        .map((f) => `${f.originalName} (${f.sizeFormatted}): ${f.directUrl}`)
        .join("\n");
    } else if (rawBodyFiles) {
      filesSummary = Array.isArray(rawBodyFiles) ? rawBodyFiles.join(", ") : String(rawBodyFiles);
    }

    // Prepare fields for structured email
    const fields = [
      { label: "Full Name", value: resolvedName },
      { label: "Phone Number", value: resolvedPhone },
      { label: "Email Address", value: resolvedEmail },
      { label: "Company Name", value: resolvedCompany },
      { label: "Service / Requirement", value: resolvedService },
      { label: "Project Location", value: projectLocation },
      { label: "Offer / Discount", value: offerDetails },
      {
        label: "Uploaded Drawings & BOQ Files",
        value: savedFilesInfo.length > 0 ? savedFilesInfo.map((f) => f.directUrl).join("\n") : (rawBodyFiles ? String(rawBodyFiles) : undefined),
      },
      { label: "Message / Notes", value: resolvedMessage },
    ];

    // Prepare clean data object for Google Sheets
    const sheetData: Record<string, any> = {
      fullName: resolvedName,
      name: resolvedName,
      phone: resolvedPhone,
      phoneNumber: resolvedPhone,
      email: resolvedEmail,
      emailAddress: resolvedEmail,
      companyName: resolvedCompany,
      company: resolvedCompany,
      service: resolvedService,
      projectType: projectType || resolvedService,
      projectLocation: projectLocation || "",
      offerDetails: offerDetails || "10% Welcome Discount Offer",
      message: resolvedMessage,
      notes: resolvedMessage,
      enquiry: resolvedMessage,
      files: filesSummary,
      fileNames: savedFilesInfo.map((f) => f.originalName).join(", ") || (rawBodyFiles ? String(rawBodyFiles) : "None"),
      fileLinks: savedFilesInfo.map((f) => f.directUrl).join("\n"),
    };

    // Attach actual files to nodemailer email
    const emailAttachments = savedFilesInfo.map((f) => ({
      filename: f.originalName,
      content: f.buffer,
      contentType: f.contentType,
    }));

    // Execute concurrently: sync to Google Sheets and send email notification to owner
    const { sheetResult, emailResult } = await processFormSubmission({
      formType,
      title,
      data: sheetData,
      fields,
      attachments: emailAttachments.length > 0 ? emailAttachments : undefined,
    });

    console.log(`[FormSubmission] Processed ${formType}:`, {
      sheetSync: sheetResult.success,
      emailNotification: emailResult.success,
      filesSaved: savedFilesInfo.length,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully. We will contact you soon.",
        formType,
        uploadedFiles: savedFilesInfo.map((f) => ({
          name: f.originalName,
          size: f.sizeFormatted,
          url: f.directUrl,
        })),
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error processing contact form submission:", error);
    return NextResponse.json(
      { error: "Failed to process form submission. Please try again later." },
      { status: 500 }
    );
  }
}
