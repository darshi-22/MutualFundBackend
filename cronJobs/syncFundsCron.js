const cron = require('node-cron');
const fetchFundsFromSheet = require('../utils/googleSheetsService');

console.log("📢 Cron job file loaded");

cron.schedule('*/5 * * * *', async () => {
  console.log("⏰ Running scheduled fetch from Google Sheets...");
  try {
    await fetchFundsFromSheet();
    console.log("✅ Sync completed");
  } catch (err) {
    console.error("❌ Error syncing:", err);
  }
});
