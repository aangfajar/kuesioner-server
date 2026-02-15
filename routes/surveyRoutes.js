const express = require("express");
const router = express.Router();
const Response = require("../models/Response");
const { protect } = require("../middleware/authmiddleware");

// Endpoint: POST /api/survey/submit
router.post("/submit", protect, async (req, res) => {
  try {
    const { answers } = req.body;

    const newResponse = new Response({
      userId: req.user._id,
      namaMahasiswa: req.user.nama, // Diambil dari data user hasil login
      answers: answers,
    });

    await newResponse.save();
    res.status(201).json({ message: "Kuesioner berhasil terkirim, mantap!" });
  } catch (error) {
    res.status(500).json({ message: "Waduh, gagal simpan data ke DB" });
  }
});

module.exports = router;
