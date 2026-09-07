require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) console.error('DB connection failed:', err);
  else console.log('Connected to MySQL database');
});

const express = require("express");
const cors = require("cors");
const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/verify', (req, res) => {
  const { scan } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  const ticket = { busNo: "KA-01-AB-1234", time: "10:30 AM", fare: "25" };

  const sql = 'INSERT INTO tickets (bus_no, time, fare, otp) VALUES (?, ?, ?, ?)';
  db.query(sql, [ticket.busNo, ticket.time, ticket.fare, otp], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error saving ticket" });
    }
    res.json({
      message: "OTP verified. Ticket generated successfully.",
      otp,
      ticket,
      ticketId: result.insertId
    });
  });
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
