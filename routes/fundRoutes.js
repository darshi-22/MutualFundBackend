const express = require('express');
const router = express.Router();
const {
  getAllFunds,
  getFundById,
  createFund,
  updateFund,
  deleteFund
} = require('../controllers/fundController');
const { fetchAndSyncFundsFromSheet } = require('../utils/googleSheetsService');


// Add a route to trigger Google Sheet sync manually
router.get('/sync-sheet', async (req, res) => {
  try {
    await fetchAndSyncFundsFromSheet();
    res.send('Data synced from Google Sheets');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to sync sheet data');
  }
});

router.get('/', getAllFunds);
router.get('/:id', getFundById);
router.post('/', createFund);
router.put('/:id', updateFund);
router.delete('/:id', deleteFund);

module.exports = router;
