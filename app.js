const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON bodies
app.use(express.json());

// Simple logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Root route
app.get('/', (req, res) => {
    res.send('OK');
});

// Loan interest calculation
app.get('/loan/calculate', (req, res) => {
    const principal = parseFloat(req.query.principal);
    const rate = parseFloat(req.query.rate);
    const years = parseFloat(req.query.years);

    if (isNaN(principal) || isNaN(rate) || isNaN(years)) {
        return res.status(400).json({ error: 'Invalid query parameters' });
    }

    const interest = principal * rate * years;
    res.json({ interest });
});

// Monthly savings calculation
// POST /savings/calculate
// Body: { targetGoal, interestRate, initialDeposit, durationMonths }
app.post('/savings/calculate', (req, res) => {
    const { targetGoal, interestRate, initialDeposit, durationMonths } = req.body;

    // Validate inputs
    if (
        typeof targetGoal !== 'number' ||
        typeof interestRate !== 'number' ||
        typeof initialDeposit !== 'number' ||
        typeof durationMonths !== 'number' ||
        durationMonths <= 0
    ) {
        return res.status(400).json({ error: 'Invalid request body' });
    }

    const r = interestRate / 12;           // monthly rate
    const n = durationMonths;

    // Future value of initial deposit
    const fv0 = initialDeposit * Math.pow(1 + r, n);

    // Solve for monthly payment PMT:
    // targetGoal = fv0 + PMT * [((1+r)^n - 1) / r]
    const factor = (Math.pow(1 + r, n) - 1) / r;
    const requiredMonthlySavings = (targetGoal - fv0) / factor;

    res.json({ requiredMonthlySavings });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
