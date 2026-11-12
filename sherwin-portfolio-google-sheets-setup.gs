/**
 * Sherwin Elam Portfolio — Contact Form → Google Sheets
 *
 * 1) Open https://script.google.com/ and create a New project.
 * 2) Replace the editor contents with this file.
 * 3) Run setupSpreadsheet() once and approve permissions.
 * 4) In the execution log, open the created spreadsheet URL.
 * 5) Deploy → New deployment → Web app:
 *      Execute as: Me
 *      Who has access: Anyone
 * 6) Copy the Web app URL ending in /exec into the portfolio HTML:
 *      GOOGLE_SHEETS_WEB_APP_URL = '.../exec'
 */

function setupSpreadsheet() {
  var props = PropertiesService.getScriptProperties();
  var existingId = props.getProperty('INQUIRY_SHEET_ID');
  var ss;

  if (existingId) {
    ss = SpreadsheetApp.openById(existingId);
  } else {
    ss = SpreadsheetApp.create('Sherwin Elam — Website Inquiries');
    props.setProperty('INQUIRY_SHEET_ID', ss.getId());
  }

  var sheet = ss.getSheetByName('Inquiries') || ss.insertSheet('Inquiries');
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Name', 'Email Address', 'Your Project']);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, 4)
      .setFontWeight('bold')
      .setFontColor('#ffffff')
      .setBackground('#9b7438');
    sheet.setColumnWidth(1, 180);
    sheet.setColumnWidth(2, 220);
    sheet.setColumnWidth(3, 260);
    sheet.setColumnWidth(4, 520);
    sheet.getRange('A:A').setNumberFormat('yyyy-mm-dd hh:mm:ss');
    sheet.getRange('D:D').setWrap(true);
  }

  Logger.log('INQUIRY SPREADSHEET: ' + ss.getUrl());
  return ss.getUrl();
}

function doPost(e) {
  try {
    var p = (e && e.parameter) ? e.parameter : {};

    // Quietly discard bot submissions that fill the hidden honeypot.
    if (p.website) {
      return ContentService.createTextOutput('OK');
    }

    var name = clean_(p.name);
    var email = clean_(p.email);
    var project = clean_(p.project);

    if (!name || !email || !project) {
      return ContentService.createTextOutput('Missing required fields');
    }

    var sheetId = PropertiesService.getScriptProperties().getProperty('INQUIRY_SHEET_ID');
    if (!sheetId) {
      throw new Error('Run setupSpreadsheet() before deploying the web app.');
    }

    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      var ss = SpreadsheetApp.openById(sheetId);
      var sheet = ss.getSheetByName('Inquiries') || ss.insertSheet('Inquiries');
      sheet.appendRow([new Date(), safeCell_(name), safeCell_(email), safeCell_(project)]);
    } finally {
      lock.releaseLock();
    }

    return ContentService.createTextOutput('OK');
  } catch (err) {
    console.error(err);
    return ContentService.createTextOutput('ERROR');
  }
}

function clean_(value) {
  return String(value || '').trim().slice(0, 10000);
}

// Prevent user-entered text from being interpreted as a spreadsheet formula.
function safeCell_(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}
