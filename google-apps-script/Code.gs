/**
 * ======================================================================================
 * TAJ AL RAHMAH CONTRACTING UAE — MULTI-FORM GOOGLE SHEETS & EMAIL SYSTEM
 * ======================================================================================
 * Spreadsheet Name: TajAlRahmah_Forms_Database
 * Owner Notification Email: alrahmahtaj@gmail.com
 *
 * Dedicated Sheets (Tabs) & Exact Form Field Columns:
 *  1. 1_Welcome_Popup
 *  2. 2_Free_Consultation
 *  3. 3_Subscriptions
 *  4. 4_Contact_Us
 *  5. 5_Careers
 *  6. 6_Technology_Expert
 *  7. 7_Get_A_Quote
 * ======================================================================================
 */

const OWNER_EMAIL = "alrahmahtaj@gmail.com";
const BRAND_TEAL = "#009e90";

// Comprehensive sheet configuration with exact columns for all form fields
const SHEETS_CONFIG = {
  "1_Welcome_Popup": {
    headers: [
      "Submission Date & Time",
      "Full Name",
      "Phone Number",
      "Email Address",
      "Project / Service Type",
      "Discount Offer",
      "Notes / Message"
    ],
    aliases: ["welcome_popup", "welcome", "welcome_offer", "1_welcome_popup"]
  },
  "2_Free_Consultation": {
    headers: [
      "Submission Date & Time",
      "Full Name",
      "Company Name",
      "Email Address",
      "Phone / WhatsApp",
      "Service Needed",
      "Preferred Schedule",
      "Message / Project Notes",
      "Form Source"
    ],
    aliases: ["consultation", "free_consultation", "book_meeting", "meeting", "2_free_consultation"]
  },
  "3_Subscriptions": {
    headers: [
      "Submission Date & Time",
      "First Name",
      "Last Name",
      "Email Address",
      "Country",
      "Company Name",
      "Department",
      "Job Title"
    ],
    aliases: ["subscriptions", "subscription", "subscribe", "newsletter", "3_subscriptions"]
  },
  "4_Contact_Us": {
    headers: [
      "Submission Date & Time",
      "Full Name / Contact Person",
      "Company Name",
      "Email Address",
      "Phone Number",
      "Inquiry Type",
      "Subject / Service",
      "Preferred Call Time / Website",
      "Message / Details"
    ],
    aliases: ["contact_us", "contact", "callback", "enquiry", "supplier", "4_contact_us"]
  },
  "5_Careers": {
    headers: [
      "Submission Date & Time",
      "Job Title",
      "Job ID",
      "Applicant Name",
      "Email Address",
      "Phone Number",
      "Experience (Years)",
      "CV / Resume Link",
      "CV / Resume File Name",
      "Cover Letter / Notes"
    ],
    aliases: ["careers", "career", "job_application", "jobs", "5_careers"]
  },
  "6_Technology_Expert": {
    headers: [
      "Submission Date & Time",
      "Full Name",
      "Company Name",
      "Email Address",
      "Phone Number",
      "Subject / Service Needed",
      "Service Type",
      "Technical Requirements / Message"
    ],
    aliases: ["technology_expert", "tech_expert", "expert", "technology", "6_technology_expert"]
  },
  "7_Get_A_Quote": {
    headers: [
      "Submission Date & Time",
      "Full Name",
      "Phone Number",
      "Email Address",
      "Company Name",
      "Project Type",
      "Project Location",
      "Uploaded Files (Drawings / BOQ)",
      "Project Details & Scope"
    ],
    aliases: ["get_a_quote", "quote", "get_quote", "quotation", "7_get_a_quote"]
  }
};

/**
 * Helper to return formatted JSON responses
 */
function respondJson(obj, statusCode) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handle POST request from Next.js website webhook
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return respondJson({ status: "error", message: "Empty request payload" }, 400);
    }

    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      return respondJson({ status: "error", message: "Invalid JSON: " + parseErr.message }, 400);
    }

    // Support automatic setup trigger via webhook: { action: "setup_sheets" }
    if (data.action === "setup_sheets" || data.action === "init_sheets") {
      setupAllSheetsWithExactFormFields();
      return respondJson({
        status: "success",
        message: "All 7 sheets initialized with exact headers and formatting successfully!",
        sheets: Object.keys(SHEETS_CONFIG)
      }, 200);
    }

    var rawType = (data.formType || data.sheetName || data.type || "").trim();
    var targetSheetName = resolveSheetName(rawType);

    if (!targetSheetName) {
      return respondJson({
        status: "error",
        message: "Unknown formType: " + rawType + ". Must be one of: " + Object.keys(SHEETS_CONFIG).join(", ")
      }, 400);
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = getOrCreateSheet(ss, targetSheetName);

    // Build row values matching the exact columns of target sheet
    var timestamp = data.timestamp || Utilities.formatDate(new Date(), "Asia/Dubai", "yyyy-MM-dd HH:mm:ss");
    var rowValues = buildRowValues(targetSheetName, data, timestamp);

    // Append new row
    sheet.appendRow(rowValues);

    // Format new row
    try {
      var lastRow = sheet.getLastRow();
      var numCols = SHEETS_CONFIG[targetSheetName].headers.length;
      var rowRange = sheet.getRange(lastRow, 1, 1, numCols);
      rowRange.setVerticalAlignment("middle");
      rowRange.setFontSize(10);
    } catch (fmtErr) {}

    // Auto-adjust column widths
    try {
      var colsToResize = SHEETS_CONFIG[targetSheetName].headers.length;
      for (var col = 1; col <= colsToResize; col++) {
        sheet.autoResizeColumn(col);
      }
    } catch (resizeErr) {}

    // Send email notification to owner (alrahmahtaj@gmail.com)
    var emailSent = false;
    var emailError = null;
    try {
      sendAppsScriptNotification(targetSheetName, data, timestamp);
      emailSent = true;
    } catch (mailErr) {
      emailError = mailErr.message || String(mailErr);
      Logger.log("Email send warning: " + emailError);
    }

    return respondJson({
      status: "success",
      message: "Row added to " + targetSheetName,
      sheet: targetSheetName,
      timestamp: timestamp,
      emailSent: emailSent,
      emailError: emailError,
      row: rowValues
    }, 200);

  } catch (err) {
    return respondJson({ status: "error", message: err.toString(), stack: err.stack }, 500);
  }
}

/**
 * Handle GET requests (ping / health check)
 */
function doGet(e) {
  return respondJson({
    status: "ok",
    message: "Taj Al Rahmah Google Sheets Webhook is active and running",
    spreadsheetName: SpreadsheetApp.getActiveSpreadsheet().getName(),
    sheets: Object.keys(SHEETS_CONFIG),
    notificationEmail: OWNER_EMAIL
  }, 200);
}

/**
 * Resolves input sheet name or alias to official Sheet tab name
 */
function resolveSheetName(input) {
  if (!input) return null;
  var normalized = input.trim();

  // Exact match
  if (SHEETS_CONFIG[normalized]) {
    return normalized;
  }

  var lower = normalized.toLowerCase();
  for (var sheetName in SHEETS_CONFIG) {
    if (sheetName.toLowerCase() === lower) {
      return sheetName;
    }
    var aliases = SHEETS_CONFIG[sheetName].aliases || [];
    for (var i = 0; i < aliases.length; i++) {
      if (aliases[i].toLowerCase() === lower) {
        return sheetName;
      }
    }
  }

  return null;
}

/**
 * Returns existing sheet tab or creates it with formatted header row
 */
function getOrCreateSheet(ss, sheetName) {
  var sheet = ss.getSheetByName(sheetName);
  var config = SHEETS_CONFIG[sheetName];
  if (!config) throw new Error("No config found for sheet: " + sheetName);

  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    applyHeaderFormatting(sheet, config.headers);
  } else if (sheet.getLastRow() === 0) {
    applyHeaderFormatting(sheet, config.headers);
  }

  return sheet;
}

/**
 * Applies professional header styling (Teal background, bold white text, frozen top row)
 */
function applyHeaderFormatting(sheet, headers) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  } else {
    // Update existing row 1 with new exact headers
    var currentRange = sheet.getRange(1, 1, 1, headers.length);
    currentRange.setValues([headers]);
  }

  var range = sheet.getRange(1, 1, 1, headers.length);
  range.setBackground(BRAND_TEAL);
  range.setFontColor("#FFFFFF");
  range.setFontWeight("bold");
  range.setFontSize(10);
  range.setHorizontalAlignment("center");
  range.setVerticalAlignment("middle");
  sheet.setRowHeight(1, 35);
  sheet.setFrozenRows(1);
}

/**
 * Maps raw data object into exact column array for each of the 7 sheets
 */
function buildRowValues(sheetName, d, timestamp) {
  switch (sheetName) {
    case "1_Welcome_Popup":
      return [
        timestamp,
        d.fullName || d.name || "",
        d.phone || d.phoneNumber || "",
        d.email || d.emailAddress || "",
        d.projectType || d.service || "",
        d.offerDetails || d.discount || "10% Welcome Discount Offer",
        d.notes || d.message || ""
      ];

    case "2_Free_Consultation":
      var schedule = d.preferredSchedule || "";
      if (!schedule && (d.meetingDate || d.meetingTime)) {
        schedule = (d.meetingDate || "") + (d.meetingTime ? " (" + d.meetingTime + ")" : "");
      }
      return [
        timestamp,
        d.fullName || d.name || "",
        d.companyName || d.company || "",
        d.email || d.emailAddress || "",
        d.phone || d.phoneNumber || "",
        d.service || "Free Consultation",
        schedule,
        d.message || d.notes || "",
        d.source || (schedule ? "Hero Book Meeting Modal" : "Homepage Consultation Form")
      ];

    case "3_Subscriptions":
      return [
        timestamp,
        d.firstName || "",
        d.lastName || "",
        d.email || d.emailAddress || "",
        d.country || "",
        d.company || d.companyName || "",
        d.department || "",
        d.jobTitle || ""
      ];

    case "4_Contact_Us":
      var details = d.message || d.enquiry || d.description || "";
      var extra = d.preferredTime || d.website || "";
      return [
        timestamp,
        d.fullName || d.name || d.contactPerson || "",
        d.companyName || d.company || "",
        d.email || d.emailAddress || "",
        d.phone || d.phoneNumber || "",
        d.inquiryType || d.type || "General Inquiry",
        d.service || d.subject || "General Inquiry",
        extra,
        details
      ];

    case "5_Careers":
      var driveLink = null;
      if (d.cvBase64) {
        driveLink = saveCvToGoogleDrive(d.cvBase64, d.cvFileName || "Resume.pdf", d.cvMimeType);
      }
      var resumeLink = driveLink || d.cvLink || d.cvFileUrl || d.resumeLink || d.fileUrl || "";

      return [
        timestamp,
        d.jobTitle || "",
        d.jobId || "",
        d.fullName || d.name || "",
        d.email || d.emailAddress || "",
        d.phone || d.phoneNumber || "",
        d.experience || "",
        resumeLink,
        d.cvFileName || d.cvName || d.cv || "Uploaded via Website",
        d.coverLetter || d.notes || ""
      ];

    case "6_Technology_Expert":
      return [
        timestamp,
        d.fullName || d.name || "",
        d.companyName || d.company || "",
        d.email || d.emailAddress || "",
        d.phone || d.phoneNumber || "",
        d.subject || d.service || "Technology Expert Inquiry",
        d.serviceType || d.service || "",
        d.message || d.requirement || ""
      ];

    case "7_Get_A_Quote":
      var filesText = d.files || d.fileNames || "None";
      if (Array.isArray(filesText)) {
        filesText = filesText.join(", ");
      }
      return [
        timestamp,
        d.fullName || d.name || "",
        d.phoneNumber || d.phone || "",
        d.emailAddress || d.email || "",
        d.companyName || d.company || "",
        d.projectType || "",
        d.projectLocation || d.location || "",
        filesText,
        d.projectDetails || d.message || ""
      ];

    default:
      return [timestamp, JSON.stringify(d)];
  }
}

/**
 * Saves a base64 encoded CV / Resume directly to a dedicated Google Drive folder
 * and sets public viewing permission so the link can be opened by recruiters/reviewers.
 */
function saveCvToGoogleDrive(base64Data, fileName, mimeType) {
  if (!base64Data) return null;
  try {
    var folderName = "TajAlRahmah_Resumes";
    var folders = DriveApp.getFoldersByName(folderName);
    var folder;
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(folderName);
    }

    var cleanName = (fileName || "Applicant_Resume.pdf").replace(/[^\w\.\-\s]/gi, "_");
    var decoded = Utilities.base64Decode(base64Data);
    var blob = Utilities.newBlob(decoded, mimeType || "application/pdf", cleanName);
    var file = folder.createFile(blob);

    try {
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    } catch (shareErr) {
      Logger.log("Sharing permission warning: " + shareErr);
    }

    return file.getUrl();
  } catch (err) {
    Logger.log("Google Drive upload error: " + err);
    return null;
  }
}

/**
 * Sends rich HTML email notification directly via Google's MailApp (No SMTP credentials required)
 */
function sendAppsScriptNotification(sheetName, data, timestamp) {
  if (!OWNER_EMAIL) return;

  var clientName = data.fullName || data.name || data.firstName || "Website Visitor";
  var clientEmail = data.email || data.emailAddress || "";
  var clientPhone = data.phone || data.phoneNumber || "";
  var subject = "[Taj Al Rahmah Lead] New " + sheetName + " Submission from " + clientName;

  var rowsHtml = "";
  var plainLines = [
    "New submission received on Taj Al Rahmah Website",
    "Database Sheet Tab: " + sheetName,
    "Time: " + timestamp,
    "",
    "--- Submission Details ---"
  ];

  var ignoredKeys = [
    "formType", "sheetName", "type", "targetSheet", "timestamp", "isoTimestamp", "action", "cvBase64"
  ];

  for (var key in data) {
    if (ignoredKeys.indexOf(key) === -1 && data[key] !== undefined && data[key] !== null && String(data[key]).trim() !== "") {
      var val = String(data[key]);
      plainLines.push(key + ": " + val);

      var displayLabel = key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, function(str){ return str.toUpperCase(); });

      var displayVal = val;
      if (key.toLowerCase().indexOf("email") !== -1 && val.indexOf("@") !== -1) {
        displayVal = '<a href="mailto:' + val + '" style="color:#009e90;font-weight:600;text-decoration:none;">' + val + '</a>';
      } else if (key.toLowerCase().indexOf("phone") !== -1) {
        displayVal = '<a href="tel:' + val.replace(/\s+/g, '') + '" style="color:#009e90;font-weight:600;text-decoration:none;">' + val + '</a>';
      } else if (val.indexOf("http://") === 0 || val.indexOf("https://") === 0) {
        displayVal = '<a href="' + val + '" target="_blank" style="display:inline-block;background-color:#009e90;color:#ffffff;padding:6px 14px;border-radius:6px;text-decoration:none;font-weight:600;font-size:12px;">View / Download Resume &rarr;</a><br/><a href="' + val + '" target="_blank" style="color:#009e90;text-decoration:underline;font-size:11px;word-break:break-all;">' + val + '</a>';
      } else {
        displayVal = val.replace(/\n/g, "<br/>");
      }

      rowsHtml += '<tr>' +
        '<td style="padding:10px 14px;font-weight:600;color:#475569;background-color:#f8fafc;border-bottom:1px solid #e2e8f0;width:35%;font-size:13px;vertical-align:top;">' + displayLabel + '</td>' +
        '<td style="padding:10px 14px;color:#0f172a;border-bottom:1px solid #e2e8f0;font-size:14px;line-height:1.5;vertical-align:top;">' + displayVal + '</td>' +
      '</tr>';
    }
  }

  var htmlContent = '<!DOCTYPE html><html><head><meta charset="utf-8"/></head>' +
    '<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;color:#334155;">' +
      '<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;padding:25px 12px;">' +
        '<tr><td align="center">' +
          '<table width="100%" style="max-width:620px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 18px rgba(0,0,0,0.06);border:1px solid #e2e8f0;">' +
            
            '<!-- Header -->' +
            '<tr><td style="background:linear-gradient(135deg, #009e90 0%, #00756a 100%);padding:24px 28px;text-align:left;">' +
              '<div style="display:inline-block;background:rgba(255,255,255,0.22);padding:3px 10px;border-radius:16px;font-size:11px;font-weight:700;color:#ffffff;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;">' +
                sheetName +
              '</div>' +
              '<h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;line-height:1.3;">' +
                'New Website Lead: ' + clientName +
              '</h1>' +
              '<p style="margin:4px 0 0 0;color:rgba(255,255,255,0.88);font-size:12px;">Taj Al Rahmah Contracting UAE — Automated Lead Alert</p>' +
            '</td></tr>' +

            '<!-- Body Content -->' +
            '<tr><td style="padding:24px 28px;">' +
              '<p style="margin:0 0 16px 0;font-size:14px;color:#64748b;line-height:1.5;">' +
                'A new entry was submitted on the website and recorded to sheet tab <strong style="color:#009e90;">' + sheetName + '</strong>.' +
              '</p>' +

              '<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;margin-bottom:20px;">' +
                rowsHtml +
              '</table>' +

              '<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0fdfa;border-left:4px solid #009e90;border-radius:4px;padding:12px 14px;">' +
                '<tr><td style="font-size:12px;color:#134e4a;line-height:1.6;">' +
                  '<strong>Submission Time:</strong> ' + timestamp + ' (UAE GST)<br/>' +
                  '<strong>Database Tab:</strong> ' + sheetName + '<br/>' +
                  '<strong>Recipient:</strong> ' + OWNER_EMAIL +
                '</td></tr>' +
              '</table>' +

            '</td></tr>' +

            '<!-- Footer -->' +
            '<tr><td style="background-color:#f8fafc;padding:16px 28px;border-top:1px solid #e2e8f0;text-align:center;font-size:11px;color:#94a3b8;">' +
              'Taj Al Rahmah Contracting UAE • Automated Notification System' +
            '</td></tr>' +

          '</table>' +
        '</td></tr>' +
      '</table>' +
    '</body></html>';

  MailApp.sendEmail({
    to: OWNER_EMAIL,
    subject: subject,
    body: plainLines.join("\n"),
    htmlBody: htmlContent
  });
}

/**
 * ═══════════════════════════════════════════════════════════════════════
 * TEST & AUTHORIZE FUNCTION
 * Click "Run" on this function in Apps Script to grant MailApp permissions
 * and verify instant email delivery to alrahmahtaj@gmail.com!
 * ═══════════════════════════════════════════════════════════════════════
 */
function testSendEmailNotification() {
  Logger.log("Testing email delivery to: " + OWNER_EMAIL);
  MailApp.sendEmail({
    to: OWNER_EMAIL,
    subject: "✅ Verified: Taj Al Rahmah Lead Notification System",
    htmlBody: "<div style='font-family: Arial, sans-serif; padding: 25px; background: #f0fdfa; border: 1px solid #ccfbf1; border-left: 6px solid #009e90; border-radius: 8px;'><h2 style='color:#0f766e; margin-top:0;'>Email Notification System Authorized!</h2><p style='color:#334155; font-size:14px;'>This email confirms that Google Apps Script is fully authorized and working. Any new lead submitted on the website will now be delivered to <strong>" + OWNER_EMAIL + "</strong> and saved in <strong>TajAlRahmah_Forms_Database</strong>.</p><p style='color:#64748b; font-size:12px;'>Timestamp: " + new Date().toLocaleString() + "</p></div>",
    body: "Email notification system is active and verified for " + OWNER_EMAIL
  });
  Logger.log("Test email successfully sent to " + OWNER_EMAIL);
}

/**
 * Run this function in Apps Script editor to create/update all 7 sheets with exact column headers!
 */
function setupAllSheetsWithExactFormFields() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  for (var name in SHEETS_CONFIG) {
    var config = SHEETS_CONFIG[name];
    var sheet = ss.getSheetByName(name);

    if (!sheet) {
      sheet = ss.insertSheet(name);
    }

    applyHeaderFormatting(sheet, config.headers);

    for (var col = 1; col <= config.headers.length; col++) {
      sheet.autoResizeColumn(col);
    }

    Logger.log("Configured sheet: " + name + " with " + config.headers.length + " columns.");
  }

  // Remove default "Sheet1" if empty and other sheets exist
  try {
    var defaultSheet = ss.getSheetByName("Sheet1");
    if (defaultSheet && ss.getSheets().length > 1 && defaultSheet.getLastRow() === 0) {
      ss.deleteSheet(defaultSheet);
    }
  } catch (e) {}

  Logger.log("All 7 sheets have been created and formatted with exact form field columns!");
}
