import { NextRequest, NextResponse } from "next/server";
import { processFormSubmission, FormType } from "@/lib/sheetsAndEmail";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
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
      files,
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
        projectLocation
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

    // Prepare fields for structured email
    const fields = [
      { label: "Full Name", value: resolvedName },
      { label: "Phone Number", value: resolvedPhone },
      { label: "Email Address", value: resolvedEmail },
      { label: "Company Name", value: resolvedCompany },
      { label: "Service / Requirement", value: resolvedService },
      { label: "Project Location", value: projectLocation },
      { label: "Offer / Discount", value: offerDetails },
      { label: "Attached Files", value: files ? (Array.isArray(files) ? files.join(", ") : files) : undefined },
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
      files: files ? (Array.isArray(files) ? files.join(", ") : files) : "None",
    };

    // Execute concurrently: sync to Google Sheets and send email notification to owner
    const { sheetResult, emailResult } = await processFormSubmission({
      formType,
      title,
      data: sheetData,
      fields,
    });

    console.log(`[FormSubmission] Processed ${formType}:`, {
      sheetSync: sheetResult.success,
      emailNotification: emailResult.success,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully. We will contact you soon.",
        formType,
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
