/**
 * ======================================================================================
 * TAJ AL RAHMAH CONTRACTING UAE — MULTI-FORM GOOGLE SHEETS & EMAIL SYSTEM
 * ======================================================================================
 * Spreadsheet Name: TajAlRahmah_Forms_Database
 * Owner Notification Email: khushwinder.dev@gmail.com
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

const OWNER_EMAIL = "khushwinder.dev@gmail.com";
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
    var lastRow = sheet.getLastRow();
    var numCols = SHEETS_CONFIG[targetSheetName].headers.length;
    var rowRange = sheet.getRange(lastRow, 1, 1, numCols);
    rowRange.setVerticalAlignment("middle");
    rowRange.setFontSize(10);

    // Auto-adjust column widths
    try {
      for (var col = 1; col <= numCols; col++) {
        sheet.autoResizeColumn(col);
      }
    } catch (resizeErr) {}

    // Send email notification to owner
    try {
      sendAppsScriptNotification(targetSheetName, data, timestamp);
    } catch (mailErr) {
      console.warn("Apps Script notification skipped: " + mailErr.message);
    }

    return respondJson({
      status: "success",
      message: "Row added to " + targetSheetName,
      sheet: targetSheetName,
      timestamp: timestamp,
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
      return [
        timestamp,
        d.jobTitle || "",
        d.jobId || "",
        d.fullName || d.name || "",
        d.email || d.emailAddress || "",
        d.phone || d.phoneNumber || "",
        d.experience || "",
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
 * Optional email sender from Apps Script (Dual Guarantee)
 */
function sendAppsScriptNotification(sheetName, data, timestamp) {
  if (!OWNER_EMAIL) return;

  var subject = "[Taj Al Rahmah Web Lead] New " + sheetName + " Submission";
  var lines = [
    "A new lead has been submitted on Taj Al Rahmah Contracting UAE website.",
    "Database Sheet Tab: " + sheetName,
    "Time: " + timestamp,
    "",
    "--- Submission Details ---"
  ];

  for (var key in data) {
    if (key !== "formType" && key !== "sheetName" && key !== "type" && key !== "targetSheet" && key !== "timestamp" && key !== "isoTimestamp") {
      lines.push(key + ": " + data[key]);
    }
  }

  MailApp.sendEmail({
    to: OWNER_EMAIL,
    subject: subject,
    body: lines.join("\n")
  });
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
