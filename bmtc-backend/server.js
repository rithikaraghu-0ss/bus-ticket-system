const express = require("express");
const cors = require("cors");
const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post("/verify", (req, res) => {
  console.log("VERIFY API HIT");
  console.log(req.body);

  const otp = Math.floor(100000 + Math.random() * 900000);

  res.json({
    message: "OTP verified. Ticket generated successfully.",
    otp,
    ticket: {
      busNo: "KA-01-AB-1234",
      time: "10:30 AM",
      fare: "₹25"
    }
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
