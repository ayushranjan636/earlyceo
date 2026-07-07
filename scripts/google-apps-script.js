/**
 * Google Apps Script for EarlyCEO — two-tab workbook
 *
 * Sheet1 (Payments)   — registration, review, and payment tracking only
 * Sheet2 (Applications) — full application form answers
 *
 * SETUP:
 * 1. Open your spreadsheet → Extensions → Apps Script
 * 2. Paste this file and save
 * 3. Run setupSheet() once (authorize when prompted)
 * 4. Deploy → New deployment → Web app (Execute as: Me, Who has access: Anyone)
 *
 * UPGRADE (existing workbook):
 * 1. Paste this file → run upgradeSheetHeaders() once → redeploy
 */

const PAYMENT_SHEET_NAME = "Sheet1";
const APPLICATION_SHEET_NAME = "Sheet2";

const COHORT_SEAT_LIMIT = 100;
const COHORT_PRICE = 999;
const DEFAULT_COHORT = "Cohort 01";
const FROM_NAME = "EarlyCEO";
const REPLY_TO_EMAIL = "hello@earlyceo.online";

const PAYMENT_HEADERS = [
  "Submitted At",
  "Registration Number",
  "Cohort",
  "Full Name",
  "Email",
  "Phone",
  "Review Status",
  "Payment Status",
  "Amount Paid",
  "Order ID",
  "Payment ID",
  "Paid At",
];

const APPLICATION_HEADERS = [
  "Submitted At",
  "Registration Number",
  "Cohort",
  "Full Name",
  "Age",
  "Gender",
  "Email",
  "Phone",
  "City",
  "School / College",
  "Why Bootcamp",
  "Why Select You",
  "Commitment Level",
  "CEO Day Approach",
  "Has Idea",
  "Idea Details",
  "Willing To Pay",
  "Confirmation Email Sent",
];

const PAY_COL = {
  SUBMITTED_AT: 1,
  REGISTRATION_NUMBER: 2,
  COHORT: 3,
  FULL_NAME: 4,
  EMAIL: 5,
  PHONE: 6,
  REVIEW_STATUS: 7,
  PAYMENT_STATUS: 8,
  AMOUNT_PAID: 9,
  ORDER_ID: 10,
  PAYMENT_ID: 11,
  PAID_AT: 12,
};

const APP_COL = {
  REGISTRATION_NUMBER: 2,
  FULL_NAME: 4,
  EMAIL: 7,
  EMAIL_SENT_AT: 18,
};

function getSpreadsheet_() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

function getOrCreateSheet_(name) {
  const ss = getSpreadsheet_();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  return sheet;
}

function getPaymentSheet_() {
  return getOrCreateSheet_(PAYMENT_SHEET_NAME);
}

function getApplicationSheet_() {
  return getOrCreateSheet_(APPLICATION_SHEET_NAME);
}

function formatHeaderRow_(sheet, columnCount) {
  const headerRange = sheet.getRange(1, 1, 1, columnCount);
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#f3f3f3");
  headerRange.setWrap(true);
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, columnCount);
}

function headersMatch_(sheet, headers) {
  if (sheet.getLastRow() === 0) return false;

  const existing = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  return headers.every(function (header, index) {
    return String(existing[index] || "").trim() === header;
  });
}

function ensurePaymentHeaders_() {
  const sheet = getPaymentSheet_();

  if (sheet.getLastRow() === 0 || !headersMatch_(sheet, PAYMENT_HEADERS)) {
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(PAYMENT_HEADERS);
    } else {
      sheet.getRange(1, 1, 1, PAYMENT_HEADERS.length).setValues([PAYMENT_HEADERS]);
    }
    formatHeaderRow_(sheet, PAYMENT_HEADERS.length);
  }
}

function ensureApplicationHeaders_() {
  const sheet = getApplicationSheet_();

  if (sheet.getLastRow() === 0 || !headersMatch_(sheet, APPLICATION_HEADERS)) {
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(APPLICATION_HEADERS);
    } else {
      sheet
        .getRange(1, 1, 1, APPLICATION_HEADERS.length)
        .setValues([APPLICATION_HEADERS]);
    }
    formatHeaderRow_(sheet, APPLICATION_HEADERS.length);
  }
}

function ensureHeaders_() {
  ensurePaymentHeaders_();
  ensureApplicationHeaders_();
}

/** Run once on a new workbook */
function setupSheet() {
  const paymentSheet = getPaymentSheet_();
  const applicationSheet = getApplicationSheet_();

  paymentSheet.clear();
  applicationSheet.clear();

  paymentSheet.appendRow(PAYMENT_HEADERS);
  applicationSheet.appendRow(APPLICATION_HEADERS);

  formatHeaderRow_(paymentSheet, PAYMENT_HEADERS.length);
  formatHeaderRow_(applicationSheet, APPLICATION_HEADERS.length);
}

/** Run once when upgrading layout */
function upgradeSheetHeaders() {
  ensureHeaders_();
  Logger.log("Sheet1 (Payments) and Sheet2 (Applications) headers are ready.");
}

function countPaidCohortSeats_() {
  ensurePaymentHeaders_();
  const sheet = getPaymentSheet_();
  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) return 0;

  let count = 0;
  for (let i = 1; i < values.length; i++) {
    const paymentStatus = String(values[i][PAY_COL.PAYMENT_STATUS - 1])
      .trim()
      .toLowerCase();
    if (paymentStatus === "paid") {
      count++;
    }
  }
  return count;
}

function getStatus_() {
  const paidCount = countPaidCohortSeats_();
  const cohortFull = paidCount >= COHORT_SEAT_LIMIT;
  return {
    count: paidCount,
    seatsLeft: Math.max(0, COHORT_SEAT_LIMIT - paidCount),
    cohortFull: cohortFull,
    seatLimit: COHORT_SEAT_LIMIT,
    price: COHORT_PRICE,
  };
}

function appendApplicationRow_(data) {
  const sheet = getApplicationSheet_();
  sheet.appendRow([
    data.submittedAt || new Date().toISOString(),
    data.leadId || "",
    data.cohort || DEFAULT_COHORT,
    data.fullName || "",
    data.age || "",
    data.gender || "",
    data.email || "",
    data.phone || "",
    data.city || "",
    data.collegeOrSchool || "",
    data.whyBootcamp || "",
    data.whySelectYou || "",
    data.commitmentLevel || "",
    data.ceoDayApproach || "",
    data.hasIdea || "",
    data.ideaDetails || "",
    data.willingToPay || "",
    "",
  ]);
  return sheet.getLastRow();
}

function appendPaymentRow_(data) {
  const sheet = getPaymentSheet_();
  const paymentStatus = data.paymentStatus || "applied";
  const isPaid = paymentStatus === "paid";

  sheet.appendRow([
    data.submittedAt || new Date().toISOString(),
    data.leadId || "",
    data.cohort || DEFAULT_COHORT,
    data.fullName || "",
    data.email || "",
    data.phone || "",
    data.reviewStatus || "pending",
    paymentStatus,
    isPaid ? data.amount || COHORT_PRICE : "",
    data.orderId || "",
    data.paymentId || "",
    isPaid ? data.paidAt || new Date().toISOString() : "",
  ]);
}

function appendLead_(data) {
  ensureHeaders_();

  const paymentStatus = data.paymentStatus || "applied";
  const isApplication = paymentStatus === "applied";

  if (isApplication) {
    const applicationRow = appendApplicationRow_(data);
    appendPaymentRow_(data);
    sendApplicationEmail_(data, applicationRow);
    return { success: true };
  }

  appendApplicationRow_(data);
  appendPaymentRow_(data);
  return { success: true };
}

function sendApplicationEmail_(data, applicationRow) {
  if (!data.email || data.paymentStatus !== "applied") {
    return;
  }

  const firstName = String(data.fullName || "there").trim().split(/\s+/)[0];
  const registrationNumber = data.leadId || "";

  const subject = "EarlyCEO — Application received (" + registrationNumber + ")";
  const body =
    "Hi " +
    firstName +
    ",\n\n" +
    "Thank you for your interest in EarlyCEO Cohort 01.\n\n" +
    "Your registration number is: " +
    registrationNumber +
    "\n\n" +
    "We review every application carefully. Please wait for a while — we will reach out if you are selected.\n\n" +
    "If you don't see our reply soon, please check your spam or promotions folder.\n\n" +
    "— EarlyCEO Team\n" +
    "hello@earlyceo.online";

  try {
    MailApp.sendEmail({
      to: data.email,
      subject: subject,
      body: body,
      name: FROM_NAME,
      replyTo: REPLY_TO_EMAIL,
    });

    if (applicationRow) {
      const sheet = getApplicationSheet_();
      sheet
        .getRange(applicationRow, APP_COL.EMAIL_SENT_AT)
        .setValue(new Date().toISOString());
    }
  } catch (error) {
    Logger.log("Application email failed: " + error);
  }
}

function findLead_(data) {
  ensurePaymentHeaders_();
  const sheet = getPaymentSheet_();
  const values = sheet.getDataRange().getValues();
  const registrationNumber = String(data.registrationNumber || "")
    .trim()
    .toUpperCase();
  const fullName = String(data.fullName || "").trim().toLowerCase();

  if (!registrationNumber || !fullName) {
    throw new Error("Registration number and full name are required");
  }

  for (let i = 1; i < values.length; i++) {
    const rowReg = String(values[i][PAY_COL.REGISTRATION_NUMBER - 1])
      .trim()
      .toUpperCase();
    const rowName = String(values[i][PAY_COL.FULL_NAME - 1]).trim().toLowerCase();

    if (rowReg === registrationNumber && rowName === fullName) {
      const paymentStatus = String(values[i][PAY_COL.PAYMENT_STATUS - 1])
        .trim()
        .toLowerCase();
      const reviewStatus = String(values[i][PAY_COL.REVIEW_STATUS - 1])
        .trim()
        .toLowerCase();

      return {
        found: true,
        leadId: rowReg,
        fullName: values[i][PAY_COL.FULL_NAME - 1],
        paymentStatus: paymentStatus,
        reviewStatus: reviewStatus,
        alreadyPaid: paymentStatus === "paid",
      };
    }
  }

  return { found: false };
}

function updatePayment_(data) {
  ensurePaymentHeaders_();
  const sheet = getPaymentSheet_();
  const values = sheet.getDataRange().getValues();
  const leadId = String(data.leadId || "").trim().toUpperCase();
  const paymentStatus = data.paymentStatus || "paid";

  for (let i = 1; i < values.length; i++) {
    if (
      String(values[i][PAY_COL.REGISTRATION_NUMBER - 1]).trim().toUpperCase() ===
      leadId
    ) {
      const row = i + 1;
      sheet.getRange(row, PAY_COL.PAYMENT_STATUS).setValue(paymentStatus);

      if (data.orderId) {
        sheet.getRange(row, PAY_COL.ORDER_ID).setValue(data.orderId);
      }
      if (data.paymentId) {
        sheet.getRange(row, PAY_COL.PAYMENT_ID).setValue(data.paymentId);
      }
      if (paymentStatus === "paid") {
        sheet.getRange(row, PAY_COL.AMOUNT_PAID).setValue(COHORT_PRICE);
        sheet
          .getRange(row, PAY_COL.PAID_AT)
          .setValue(data.paidAt || new Date().toISOString());
        sheet.getRange(row, PAY_COL.REVIEW_STATUS).setValue("selected");
      }
      return { success: true };
    }
  }

  throw new Error("Lead not found in Sheet1 (Payments)");
}

function handleRequest_(payload) {
  const action = payload.action;

  if (action === "status") {
    return getStatus_();
  }

  if (action === "append") {
    return appendLead_(payload);
  }

  if (action === "findLead") {
    return findLead_(payload);
  }

  if (action === "updatePayment") {
    return updatePayment_(payload);
  }

  throw new Error("Unknown action");
}

function doGet() {
  return ContentService.createTextOutput(JSON.stringify(getStatus_())).setMimeType(
    ContentService.MimeType.JSON
  );
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const result = handleRequest_(payload);
    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ error: String(error) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
