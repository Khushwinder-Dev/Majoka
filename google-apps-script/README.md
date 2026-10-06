# Taj Al Rahmah — Exact Form Fields & Google Sheets Structure

All forms on the website now map 1-to-1 into **`TajAlRahmah_Forms_Database`** with dedicated columns matching every field collected from users.

---

## Exact Column Headers for Each of the 7 Sheets

### 1. `1_Welcome_Popup` (10% Discount Welcome Offer)
| Col | Header Name | Website Field |
|:---:|:---|:---|
| A | **Submission Date & Time** | Auto timestamp (UAE GST) |
| B | **Full Name** | `name` |
| C | **Phone Number** | `phone` |
| D | **Email Address** | `email` |
| E | **Project / Service Type** | `projectType` (Waterproofing, Roofing, etc.) |
| F | **Discount Offer** | `offerDetails` (10% Welcome Discount Offer) |
| G | **Notes / Message** | Additional notes |

---

### 2. `2_Free_Consultation` (Homepage Consultation & Hero Meeting Modal)
| Col | Header Name | Website Field |
|:---:|:---|:---|
| A | **Submission Date & Time** | Auto timestamp (UAE GST) |
| B | **Full Name** | `fullName` |
| C | **Company Name** | `companyName` |
| D | **Email Address** | `email` |
| E | **Phone / WhatsApp** | `phone` |
| F | **Service Needed** | `service` |
| G | **Preferred Schedule** | `meetingDate` + `meetingTime` (if booked via meeting modal) |
| H | **Message / Project Notes** | `message` |
| I | **Form Source** | "Homepage Consultation Form" or "Hero Book Meeting Modal" |

---

### 3. `3_Subscriptions` (Newsletter & Marketing)
| Col | Header Name | Website Field |
|:---:|:---|:---|
| A | **Submission Date & Time** | Auto timestamp (UAE GST) |
| B | **First Name** | `firstName` |
| C | **Last Name** | `lastName` |
| D | **Email Address** | `email` |
| E | **Country** | `country` |
| F | **Company Name** | `company` |
| G | **Department** | `department` |
| H | **Job Title** | `jobTitle` |

---

### 4. `4_Contact_Us` (Contact Page, Enquiry, Callback & Suppliers)
| Col | Header Name | Website Field |
|:---:|:---|:---|
| A | **Submission Date & Time** | Auto timestamp (UAE GST) |
| B | **Full Name / Contact Person** | `fullName` |
| C | **Company Name** | `companyName` |
| D | **Email Address** | `email` |
| E | **Phone Number** | `phone` |
| F | **Inquiry Type** | General Inquiry, Callback, Supplier Proposal, etc. |
| G | **Subject / Service** | `subject` or category |
| H | **Preferred Call Time / Website** | Callback time slot or supplier website |
| I | **Message / Details** | Inquiry message & specifications |

---

### 5. `5_Careers` (Job Applications)
| Col | Header Name | Website Field |
|:---:|:---|:---|
| A | **Submission Date & Time** | Auto timestamp (UAE GST) |
| B | **Job Title** | `jobTitle` |
| C | **Job ID** | `jobId` |
| D | **Applicant Name** | `fullName` |
| E | **Email Address** | `email` |
| F | **Phone Number** | `phone` |
| G | **Experience (Years)** | `experience` |
| H | **CV / Resume File Name** | Uploaded file name and size |
| I | **Cover Letter / Notes** | `coverLetter` |

---

### 6. `6_Technology_Expert` (Write Our Technology Experts & Talk to Expert)
| Col | Header Name | Website Field |
|:---:|:---|:---|
| A | **Submission Date & Time** | Auto timestamp (UAE GST) |
| B | **Full Name** | `fullName` |
| C | **Company Name** | `companyName` |
| D | **Email Address** | `email` |
| E | **Phone Number** | `phone` |
| F | **Subject / Service Needed** | `subject` |
| G | **Service Type** | Specific technical service (e.g. Polyurea, Epoxy) |
| H | **Technical Requirements / Message** | Technical specifications / project details |

---

### 7. `7_Get_A_Quote` (Quotation Request Page)
| Col | Header Name | Website Field |
|:---:|:---|:---|
| A | **Submission Date & Time** | Auto timestamp (UAE GST) |
| B | **Full Name** | `fullName` |
| C | **Phone Number** | `phoneNumber` |
| D | **Email Address** | `emailAddress` |
| E | **Company Name** | `companyName` |
| F | **Project Type** | Combo Waterproofing, Thermal Insulation, etc. |
| G | **Project Location** | `projectLocation` (e.g. Dubai, Abu Dhabi, etc.) |
| H | **Uploaded Files (Drawings / BOQ)** | List of uploaded files |
| I | **Project Details & Scope** | `projectDetails` |

---

## How to Set Up in Your Google Sheet (3 Simple Steps)

1. Open your Google Spreadsheet **`TajAlRahmah_Forms_Database`**.
2. Click **Extensions** > **Apps Script**.
3. Replace the code in **`Code.gs`** with the updated code from [google-apps-script/Code.gs](file:///c:/Users/asus%20system/Downloads/TajAlRahmah/google-apps-script/Code.gs).
4. In the top toolbar function dropdown, select **`setupAllSheetsWithExactFormFields`** and click **Run**.
   - *This will instantly create and format all 7 sheet tabs with teal headers and auto-adjusted columns!*
5. Click **Deploy** > **Manage deployments** > **Edit** > select **New version** > click **Deploy**.
