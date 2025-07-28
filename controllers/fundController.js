const Fund = require('../models/Fund');

exports.getAllFunds = async (req, res) => {
  const funds = await Fund.find();
  res.json(funds);
};

exports.getFundById = async (req, res) => {
  const fund = await Fund.findById(req.params.id);
  res.json(fund);
};

exports.createFund = async (req, res) => {
  const fund = new Fund(req.body);
  await fund.save();
  res.status(201).json(fund);
};

exports.updateFund = async (req, res) => {
  const updated = await Fund.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// ✅ Delete Fund
exports.deleteFund = async (req, res) => {
  try {
    const fund = await Fund.findByIdAndDelete(req.params.id);
    if (!fund) {
      return res.status(404).json({ message: 'Fund not found' });
    }
    res.json({ message: 'Fund deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting fund', error });
  }
};
