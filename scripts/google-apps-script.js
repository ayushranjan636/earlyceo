/**
 * Google Apps Script for EarlyCEO Leads Sheet
 *
 * SETUP:
 * 1. Open your sheet → Extensions → Apps Script
 * 2. Paste this file and save
 * 3. Run setupSheet() once
 * 4. Deploy → New deployment → Web app (Execute as: Me, Who has access: Anyone)
 */

const SHEET_NAME = "Sheet1";
const EARLY_BIRD_LIMIT = 10;

const COL = {
  PAYMENT_STATUS: 16,
  TIER: 14,
  ORDER_ID: 17,
  PAYMENT_ID: 18,
  PAID_AT: 19,
};

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  return sheet;
}

function setupSheet() {
  const sheet = getSheet_();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Submitted At",
      "Lead ID",
      "Full Name",
      "Age",
      "Gender",
      "Email",
      "Phone",
      "City",
      "School / College",
      "Why Bootcamp",
      "Has Idea",
      "Idea Details",
      "Willing To Pay",
      "Tier",
      "Amount",
      "Payment Status",
      "Order ID",
      "Payment ID",
      "Paid At",
    ]);
    sheet.getRange(1, 1, 1, 19).setFontWeight("bold");
  }
}

/** Only count paid early bird seats — pending/cancelled do not reduce availability */
function countPaidEarlyBird_() {
  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) return 0;

  let count = 0;
  for (let i = 1; i < values.length; i++) {
    const paymentStatus = String(values[i][COL.PAYMENT_STATUS - 1]).toLowerCase();
    const tier = String(values[i][COL.TIER - 1]).toLowerCase();
    if (paymentStatus === "paid" && tier === "early_bird") {
      count++;
    }
  }
  return count;
}

function getStatus_() {
  const paidCount = countPaidEarlyBird_();
  const earlyBirdFull = paidCount >= EARLY_BIRD_LIMIT;
  return {
    count: paidCount,
    seatsLeft: Math.max(0, EARLY_BIRD_LIMIT - paidCount),
    earlyBirdFull,
    earlyBirdLimit: EARLY_BIRD_LIMIT,
    currentPrice: earlyBirdFull ? 4999 : 499,
    regularPrice: 4999,
  };
}

function appendLead_(data) {
  setupSheet();
  const sheet = getSheet_();
  sheet.appendRow([
    data.submittedAt || new Date().toISOString(),
    data.leadId || "",
    data.fullName || "",
    data.age || "",
    data.gender || "",
    data.email || "",
    data.phone || "",
    data.city || "",
    data.collegeOrSchool || "",
    data.whyBootcamp || "",
    data.hasIdea || "",
    data.ideaDetails || "",
    data.willingToPay || "",
    data.tier || "",
    data.amount || "",
    data.paymentStatus || "pending",
    "",
    "",
    "",
  ]);
  return { success: true };
}

function updatePayment_(data) {
  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();
  const leadId = data.leadId;

  for (let i = 1; i < values.length; i++) {
    if (values[i][1] === leadId) {
      const row = i + 1;
      sheet.getRange(row, COL.PAYMENT_STATUS).setValue(data.paymentStatus || "paid");
      if (data.orderId) {
        sheet.getRange(row, COL.ORDER_ID).setValue(data.orderId);
      }
      if (data.paymentId) {
        sheet.getRange(row, COL.PAYMENT_ID).setValue(data.paymentId);
      }
      if (data.paymentStatus === "paid") {
        sheet.getRange(row, COL.PAID_AT).setValue(
          data.paidAt || new Date().toISOString()
        );
      }
      return { success: true };
    }
  }

  throw new Error("Lead not found");
}

function handleRequest_(payload) {
  const action = payload.action;

  if (action === "status") {
    return getStatus_();
  }

  if (action === "append") {
    return appendLead_(payload);
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
