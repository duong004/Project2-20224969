const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Sẽ được mã hóa
    role: { type: String, default: "Admin" }, // Mặc định người đăng ký đầu tiên là Admin
}, { timestamps: true });

const User = mongoose.model('Users', userSchema, 'Users');

module.exports = User;