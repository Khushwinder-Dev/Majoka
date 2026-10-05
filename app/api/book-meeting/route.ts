import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

    // Optional phone validation if provided
    if (phone && phone.trim() && phone.replace(/\D/g, "").length < 7) {
      return NextResponse.json(
        { error: "Please enter a valid phone number" },
        { status: 400 }
      );
    }

    // Attempt to send email notification if SMTP is configured
    try {
      if (process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || "smtp.gmail.com",
          port: parseInt(process.env.SMTP_PORT || "587"),
          secure: process.env.SMTP_SECURE === "true",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
          },
        });

        const recipient = process.env.NOTIFICATION_EMAIL || "saad.samiul85@gmail.com";

        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: recipient,
          subject: `New Meeting Request: ${name} - ${service}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; }
                .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
                .header { background: linear-gradient(135deg, #00c2b2 0%, #009b8e 100%); color: white; padding: 24px; text-align: center; }
                .content { padding: 24px; }
                .field { margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid #f1f5f9; }
                .label { font-weight: bold; color: #009b8e; display: block; font-size: 13px; text-transform: uppercase; margin-bottom: 4px; }
                .value { font-size: 15px; color: #0f172a; }
                .notes-box { background: #f0fdfa; border-left: 4px solid #00c2b2; padding: 12px; border-radius: 4px; margin-top: 8px; }
                .footer { padding: 16px; text-align: center; font-size: 12px; color: #94a3b8; background: #f8fafc; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2 style="margin: 0; font-size: 20px;">📅 New Meeting Booking Request</h2>
                  <p style="margin: 6px 0 0 0; opacity: 0.9; font-size: 14px;">Taj Al Rahmah Contracting UAE</p>
                </div>
                <div class="content">
                  <div class="field">
                    <span class="label">Client Name:</span>
                    <span class="value">${name}</span>
                  </div>
                  <div class="field">
                    <span class="label">Email Address:</span>
                    <span class="value"><a href="mailto:${email}" style="color: #00c2b2;">${email}</a></span>
                  </div>
                  <div class="field">
                    <span class="label">Phone / WhatsApp:</span>
                    <span class="value">${phone && phone.trim() ? phone : "Not provided (Optional)"}</span>
                  </div>
                  <div class="field">
                    <span class="label">Requested Service:</span>
                    <span class="value" style="font-weight: 600; color: #009b8e;">${service}</span>
                  </div>
                  ${
                    meetingDate || meetingTime
                      ? `
                  <div class="field">
                    <span class="label">Preferred Schedule:</span>
                    <span class="value">${meetingDate || ""} ${meetingTime ? `(${meetingTime})` : ""}</span>
                  </div>`
                      : ""
                  }
                  ${
                    notes && notes.trim()
                      ? `
                  <div class="field">
                    <span class="label">Query / Project Notes:</span>
                    <div class="notes-box">${notes.replace(/\n/g, "<br>")}</div>
                  </div>`
                      : ""
                  }
                </div>
                <div class="footer">
                  Received from Taj Al Rahmah Website Hero Section • ${new Date().toLocaleString()}
                </div>
              </div>
            </body>
            </html>
          `,
        });
      }
    } catch (mailError) {
      console.warn("Mail sending warning in book-meeting (proceeding with successful response):", mailError);
    }

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
