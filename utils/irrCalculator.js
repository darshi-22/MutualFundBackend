function calculateIRR(cashflows) {
  const npv = (rate) =>
    cashflows.reduce((acc, val, i) => acc + val / Math.pow(1 + rate, i), 0);

  let rate = 0.1;
  const epsilon = 1e-6;
  const maxIterations = 1000;

  for (let i = 0; i < maxIterations; i++) {
    const f = npv(rate);
    const fPrime = (npv(rate + epsilon) - f) / epsilon;
    const newRate = rate - f / fPrime;

    if (Math.abs(newRate - rate) < epsilon) break;
    rate = newRate;
  }

  return Number((rate * 100).toFixed(2));
}

module.exports = { calculateIRR };
