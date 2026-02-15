const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Memanggil model User
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    res.status(201).json({ message: "User berhasil didaftarkan!" });
  } catch (error) {
    res.status(400).json({ message: "Email sudah terdaftar bosku" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && user.password === password) {
    res.json({
      message: "Login Berhasil!",
      token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      }),
      user: { id: user._id, email: user.email },
    });
  } else {
    res.status(401).json({ message: "Email atau Password salah!" });
  }
});

module.exports = router;
