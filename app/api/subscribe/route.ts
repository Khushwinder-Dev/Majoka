import { NextRequest, NextResponse } from "next/server";
import { processFormSubmission } from "@/lib/sheetsAndEmail";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName, lastName, country, company, department, jobTitle } = body;

    // Validate required fields
    if (!email || !firstName || !lastName || !country || !company || !department || !jobTitle) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedEmail = email.trim();
    const trimmedCountry = country.trim();
    const trimmedCompany = company.trim();
    const trimmedDepartment = department.trim();
    const trimmedJobTitle = jobTitle.trim();

    // Data for Google Sheets
    const sheetData = {
      firstName: trimmedFirstName,
      lastName: trimmedLastName,
      fullName: `${trimmedFirstName} ${trimmedLastName}`,
      email: trimmedEmail,
      country: trimmedCountry,
      company: trimmedCompany,
      department: trimmedDepartment,
      jobTitle: trimmedJobTitle,
    };

    // Fields for email notification
    const fields = [
      { label: "Subscriber Name", value: `${trimmedFirstName} ${trimmedLastName}` },
      { label: "Email Address", value: trimmedEmail },
      { label: "Company", value: trimmedCompany },
      { label: "Job Title", value: trimmedJobTitle },
      { label: "Department", value: trimmedDepartment },
      { label: "Country", value: trimmedCountry },
    ];

    // Process both Google Sheet sync and email notification
    await processFormSubmission({
      formType: "3_Subscriptions",
      title: `New Marketing Subscription: ${trimmedFirstName} ${trimmedLastName} (${trimmedCompany})`,
      data: sheetData,
      fields,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for subscribing! Watch your inbox for confirmation.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
