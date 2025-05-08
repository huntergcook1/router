const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

app.get('/', (req, res) => {
  res.send('root path');
})

app.get('/students/:id', (req, res) => {
  const Id = req.params.id;
  res.send(`students path for ID: ${Id}`);
})

app.route('/students')
    .get(function (req, res) {
        res.send('Get all students')
  })
    .post(function (req, res) {
        res.send('Add a new student')
  })

// Route to get tuition report for all students
app.get('/tuition-reports', (req, res) => {
    const tuitionReports = [
        { studentId: 1, report: 'Tuition report for student 1' },
        { studentId: 2, report: 'Tuition report for student 2' },
        { studentId: 3, report: 'Tuition report for student 3' }
    ];
    res.json(tuitionReports);
});

// Route to get tuition report by student ID
app.post('/tuition-reports/:id', (req, res) => {
    const studentId = req.params.id;
    const tuitionReport = { studentId, report: `Tuition report for student ${studentId}` };
    res.json(tuitionReport);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
