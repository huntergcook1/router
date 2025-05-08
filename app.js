const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// GET /loan/calculate?principal=10000&rate=0.05&years=3
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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});