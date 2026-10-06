import nodemailer from "nodemailer";

export type FormType =
  | "1_Welcome_Popup"
  | "2_Free_Consultation"
  | "3_Subscriptions"
  | "4_Contact_Us"
  | "5_Careers"
  | "6_Technology_Expert"
  | "7_Get_A_Quote";

export interface FormSubmissionPayload {
  formType: FormType;
  title: string;
  data: Record<string, any>;
  fields: Array<{ label: string; value: string | undefined | null }>;
  attachments?: Array<{
    filename: string;
    content: Buffer;
    contentType?: string;
  }>;
}

/**
 * Maps the standard FormType to snake_case and human aliases so
 * the Google Apps Script can identify it regardless of script version.
 */
export function getFormTypeAliases(formType: FormType): string[] {
  switch (formType) {
    case "1_Welcome_Popup":
      return ["1_Welcome_Popup", "welcome_popup", "welcome", "welcome_offer"];
    case "2_Free_Consultation":
      return ["2_Free_Consultation", "free_consultation", "consultation", "book_meeting"];
    case "3_Subscriptions":
      return ["3_Subscriptions", "subscriptions", "subscription", "subscribe"];
    case "4_Contact_Us":
      return ["4_Contact_Us", "contact_us", "contact", "callback", "enquiry", "supplier"];
    case "5_Careers":
      return ["5_Careers", "careers", "career", "job_application"];
    case "6_Technology_Expert":
      return ["6_Technology_Expert", "technology_expert", "tech_expert", "expert"];
    case "7_Get_A_Quote":
      return ["7_Get_A_Quote", "get_a_quote", "quote", "get_quote"];
    default:
      return [formType];
  }
}

export function getPrimaryFormKey(formType: FormType): string {
  switch (formType) {
    case "1_Welcome_Popup":
      return "welcome_popup";
    case "2_Free_Consultation":
      return "consultation";
    case "3_Subscriptions":
      return "subscriptions";
    case "4_Contact_Us":
      return "contact_us";
    case "5_Careers":
      return "careers";
    case "6_Technology_Expert":
      return "technology_expert";
    case "7_Get_A_Quote":
      return "get_a_quote";
    default:
      return formType;
  }
}

/**
 * Sends form submission data to Google Sheets via Webhook URL
 */
export async function sendToGoogleSheet(
  formType: FormType,
  data: Record<string, any>
): Promise<{ success: boolean; message?: string; error?: any }> {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

  if (!webhookUrl || !webhookUrl.startsWith("http")) {
    console.warn("GOOGLE_SHEET_WEBHOOK_URL is not configured. Skipping Google Sheet sync.");
    return { success: false, message: "Webhook URL not configured" };
  }

  const primaryKey = getPrimaryFormKey(formType);

  const timestampIso = new Date().toISOString();
  const timestampDubai = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Dubai",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  // Provide broad alias coverage for all data fields
  const normalizedData: Record<string, any> = { ...data };
  if (data.fullName && !data.name) normalizedData.name = data.fullName;
  if (data.name && !data.fullName) normalizedData.fullName = data.name;
  if (data.phone && !data.phoneNumber) normalizedData.phoneNumber = data.phone;
  if (data.phoneNumber && !data.phone) normalizedData.phone = data.phoneNumber;
  if (data.email && !data.emailAddress) normalizedData.emailAddress = data.email;
  if (data.emailAddress && !data.email) normalizedData.email = data.emailAddress;
  if (data.company && !data.companyName) normalizedData.companyName = data.company;
  if (data.companyName && !data.company) normalizedData.company = data.companyName;

  const payload = {
    formType: primaryKey, // Matches current and new Google Apps Script
    sheetName: formType,  // Official tab name (1_Welcome_Popup, etc.)
    targetSheet: formType,
    type: primaryKey,
    timestamp: timestampDubai,
    isoTimestamp: timestampIso,
    ...normalizedData,
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseText = await res.text();
    let parsed: any;
    try {
      parsed = JSON.parse(responseText);
    } catch {
      parsed = { raw: responseText };
    }

    console.log(`[GoogleSheetSync] ${formType} sync result:`, parsed);
    return { success: res.ok, message: responseText };
  } catch (err: any) {
    console.error(`[GoogleSheetSync] Error syncing ${formType} to Google Sheets:`, err);
    return { success: false, error: err?.message || err };
  }
}

/**
 * Sends formatted email notification to the website owner
 */
export async function sendEmailNotification({
  formType,
  title,
  fields,
  attachments,
}: FormSubmissionPayload): Promise<{ success: boolean; error?: any }> {
  const recipient = process.env.NOTIFICATION_EMAIL || "khushwinder.dev@gmail.com";

  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.warn("SMTP credentials not fully configured. Skipping email notification.");
    return { success: false, error: "SMTP not configured" };
  }

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

    const formattedTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Dubai",
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const validFields = fields.filter(
      (f) => f.value !== undefined && f.value !== null && f.value.toString().trim() !== ""
    );

    const rowsHtml = validFields
      .map(
        (f) => `
        <tr>
          <td style="padding: 12px 14px; font-weight: 600; color: #475569; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0; width: 35%; font-size: 13px; vertical-align: top;">
            ${escapeHtml(f.label)}
          </td>
          <td style="padding: 12px 14px; color: #0f172a; border-bottom: 1px solid #e2e8f0; font-size: 14px; line-height: 1.5; vertical-align: top;">
            ${formatFieldValue(f.label, f.value)}
          </td>
        </tr>
      `
      )
      .join("");

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>${escapeHtml(title)}</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #334155;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 30px 15px;">
          <tr>
            <td align="center">
              <table width="100%" max-width="640" style="max-width: 640px; background-color: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
                
                <!-- HEADER -->
                <tr>
                  <td style="background: linear-gradient(135deg, #009e90 0%, #00756a 100%); padding: 26px 30px; text-align: left;">
                    <div style="display: inline-block; background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; color: #ffffff; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
                      ${escapeHtml(formType)}
                    </div>
                    <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700; line-height: 1.3;">
                      ${escapeHtml(title)}
                    </h1>
                    <p style="margin: 6px 0 0 0; color: rgba(255,255,255,0.85); font-size: 13px;">
                      Taj Al Rahmah Contracting • UAE Website Lead Notification
                    </p>
                  </td>
                </tr>

                <!-- CONTENT -->
                <tr>
                  <td style="padding: 28px 30px;">
                    <p style="margin: 0 0 18px 0; font-size: 14px; color: #64748b; line-height: 1.5;">
                      A new entry has been submitted on the website and synced to your database spreadsheet tab 
                      <strong style="color: #009e90;">${escapeHtml(formType)}</strong>.
                    </p>

                    <!-- FIELDS TABLE -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; margin-bottom: 24px;">
                      ${rowsHtml}
                    </table>

                    <!-- FOOTER INFO BOX -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0fdfa; border-left: 4px solid #009e90; border-radius: 4px; padding: 12px 16px;">
                      <tr>
                        <td style="font-size: 12px; color: #134e4a; line-height: 1.6;">
                          <strong>Submission Time:</strong> ${formattedTime} (GST - UAE)<br/>
                          <strong>Spreadsheet Tab:</strong> ${escapeHtml(formType)}<br/>
                          <strong>Recipient:</strong> ${escapeHtml(recipient)}
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>

                <!-- FOOTER -->
                <tr>
                  <td style="background-color: #f8fafc; padding: 18px 30px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #94a3b8;">
                    Taj Al Rahmah Contracting UAE — Automated Lead & Inquiries System
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const plainText = `
${title}
Form: ${formType}
Time: ${formattedTime} (UAE GST)
Recipient: ${recipient}
Spreadsheet Sheet: ${formType}

${validFields.map((f) => `${f.label}: ${f.value}`).join("\n")}
    `.trim();

    await transporter.sendMail({
      from: `"Taj Al Rahmah Leads" <${process.env.SMTP_USER}>`,
      to: recipient,
      subject: `[Taj Al Rahmah] ${title}`,
      text: plainText,
      html: htmlContent,
      attachments: attachments || [],
    });

    console.log(`[EmailNotification] Successfully sent notification for ${formType} to ${recipient}`);
    return { success: true };
  } catch (err: any) {
    console.error(`[EmailNotification] Error sending email for ${formType}:`, err);
    return { success: false, error: err?.message || err };
  }
}

/**
 * High-level helper that executes both Google Sheets sync and Email Notification concurrently
 */
export async function processFormSubmission(payload: FormSubmissionPayload): Promise<{
  sheetResult: { success: boolean; message?: string; error?: any };
  emailResult: { success: boolean; error?: any };
}> {
  const [sheetResult, emailResult] = await Promise.all([
    sendToGoogleSheet(payload.formType, payload.data),
    sendEmailNotification(payload),
  ]);

  return { sheetResult, emailResult };
}

function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatFieldValue(label: string, value: any): string {
  if (value === null || value === undefined) return "";
  const str = String(value);

  const lowerLabel = label.toLowerCase();
  if (lowerLabel.includes("email") && str.includes("@")) {
    return `<a href="mailto:${escapeHtml(str)}" style="color: #009e90; text-decoration: none; font-weight: 500;">${escapeHtml(str)}</a>`;
  }
  if (lowerLabel.includes("phone")) {
    return `<a href="tel:${escapeHtml(str.replace(/\s+/g, ""))}" style="color: #009e90; text-decoration: none; font-weight: 500;">${escapeHtml(str)}</a>`;
  }

  // Preserve newlines for messages, cover letters, details
  return escapeHtml(str).replace(/\n/g, "<br/>");
}
