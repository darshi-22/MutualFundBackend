const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');
const Fund = require('../models/Fund');

const SHEET_ID = '19fMY72aAbTS3AALnPkMRAERxiiLAK702K6XvAJJWLk0';
const RANGE = 'Sheet1!A2:G'; // Assuming row 1 is headers

async function fetchFundsFromSheet() {
  try {
    console.log("🔄 Fetching data from Google Sheet...");

    const auth = new GoogleAuth({
      keyFile: './mutualfundsheetsync-6fdb32888c93.json', // ✅ Relative path to key file
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth: await auth.getClient() });

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: RANGE,
    });

    const rows = res.data.values;
    if (!rows || !rows.length) {
      console.log("⚠️ No data found in Google Sheet.");
      return;
    }

    console.log(`✅ ${rows.length} rows fetched from sheet.`);

    for (const row of rows) {
      const [name, one, three, five, seven, ten, category] = row;

      // 🚫 Skip if name is empty or any return is invalid (NaN)
      if (
        !name ||
        isNaN(parseFloat(one)) ||
        isNaN(parseFloat(three)) ||
        isNaN(parseFloat(five)) ||
        isNaN(parseFloat(seven)) ||
        isNaN(parseFloat(ten))
      ) {
        console.warn(`⚠️ Skipping invalid row: ${JSON.stringify(row)}`);
        continue;
      }

      const trailingReturns = {
        1: parseFloat(one),
        3: parseFloat(three),
        5: parseFloat(five),
        7: parseFloat(seven),
        10: parseFloat(ten),
      };

      const existingFund = await Fund.findOne({ name });

      if (existingFund) {
        console.log(`🔁 Updating fund: ${name}`);
        existingFund.trailingReturns = trailingReturns;
        existingFund.category = category;
        await existingFund.save();
      } else {
        console.log(`🆕 Creating new fund: ${name}`);
        await Fund.create({
          name,
          trailingReturns,
          category,
        });
      }
    }

    console.log("✅ Sheet sync completed.");
  } catch (error) {
    console.error("❌ Error fetching data from Google Sheet:", error.message);
  }
}

module.exports = fetchFundsFromSheet;
