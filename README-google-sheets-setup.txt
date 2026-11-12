SHERWIN ELAM PORTFOLIO — GOOGLE SHEETS CONTACT FORM

FILES
- index.html: updated portfolio; form fields are Name, Email Address, Your Project.
- sherwin-portfolio-google-sheets-setup.gs: creates the Google Sheet and receives form submissions.
- Sherwin_Elam_Creative_Video_Editor_Resume.pdf: resume file.
- sherwin-website-inquiries-template.xlsx: optional local spreadsheet template/backup.

IMPORTANT
The HTML cannot write into a Google Sheet until the Apps Script Web App is deployed and its URL is pasted into the HTML. Google Drive integration is not connected in this ChatGPT session, so the live Google Sheet must be created in your Google account by following these steps.

SETUP
1. Go to https://script.google.com/ while signed in to the Google account where you want the inquiry sheet.
2. Create a New project.
3. Open the supplied .gs file, copy all its contents, and paste into Code.gs.
4. Save. Select setupSpreadsheet from the function dropdown and click Run.
5. Approve the Google permissions.
6. Open the execution log; copy the URL after “INQUIRY SPREADSHEET”. This is the Google Sheet that will receive leads.
7. Deploy → New deployment → gear icon → Web app.
8. Set “Execute as” to Me, and “Who has access” to Anyone. Deploy and authorize if prompted.
9. Copy the Web app URL ending in /exec.
10. Open index.html in a code editor and find:
    var GOOGLE_SHEETS_WEB_APP_URL = 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
    Replace the placeholder with your /exec URL. Keep the URL inside the quotes.
11. Save and upload index.html (and the resume PDF) to your website hosting.

SHEET COLUMNS
Timestamp | Name | Email Address | Your Project

TEST
After deployment, submit one test inquiry from your live portfolio. Confirm that a new row appears in the Inquiries tab. If you later edit Apps Script, deploy a new version of the Web App.
