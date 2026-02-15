const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true, // Supaya satu email tidak bisa daftar dua kali
    lowercase: true // Biar gak sensitif huruf besar/kecil pas login
  },
  password: { 
    type: String, 
    required: true 
  }
});

module.exports = mongoose.model('User', UserSchema);