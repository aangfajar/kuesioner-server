const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Ambil data user dari DB (tanpa password) dan masukkan ke req.user
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Tidak diizinkan, token salah' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Tidak diizinkan, tidak ada token' });
  }
};

module.exports = { protect };