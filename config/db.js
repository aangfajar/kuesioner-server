const mongoose = require("mongoose");

// Variabel untuk menyimpan status koneksi secara caching
let isConnected = false;

const connectDB = async () => {
    // Jika sudah konek, jangan buat koneksi baru
    if (isConnected) {
        console.log("Menggunakan koneksi database yang sudah ada.");
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        // Simpan status koneksi (1 artinya connected)
        isConnected = conn.connections[0].readyState;
        
        console.log(`Mantap! MongoDB Terhubung: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // JANGAN pakai process.exit(1) di sini
    }
};

module.exports = connectDB;