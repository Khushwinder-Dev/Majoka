import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

    console.log("New newsletter subscription:", {
      email,
      firstName,
      lastName,
      country,
      company,
      department,
      jobTitle,
      date: new Date().toISOString(),
    });

    // If SMTP is configured, attempt sending confirmation / notification email
    if (process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || "smtp.gmail.com",
          port: parseInt(process.env.SMTP_PORT || "587"),
          secure: process.env.SMTP_SECURE === "true",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
          },
        });

        // 1. Notification to admin
        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: process.env.CONTACT_EMAIL || "info@tajalrahmah.com",
          subject: `New Marketing Subscription: ${firstName} ${lastName} (${company})`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
              <h2 style="color: #01a9a0; margin-top: 0;">New Marketing Communications Subscription</h2>
              <p>A new subscriber has signed up for marketing communications:</p>
              <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Full Name:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${firstName} ${lastName}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Email:</td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td></tr>
                <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Country:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${country}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Company:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${company}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Department:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${department}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Job Title:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${jobTitle}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Date:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${new Date().toLocaleString()}</td></tr>
              </table>
            </div>
          `,
        });
      } catch (mailError) {
        console.warn("SMTP email sending skipped or failed:", mailError);
      }
    }

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
