const User = require('../modules/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const sign_up = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Kiểm tra xem email đã tồn tại chưa
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Email đã tồn tại' });
        }

        // Tạo người dùng mới
        user = new User({
            name,
            email,
            password, // Mật khẩu chưa được mã hóa
        });

        // Mã hóa mật khẩu trước khi lưu
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        
        // Trả về thông tin người dùng (không bao gồm mật khẩu)
        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        res.status(201).json({ message: 'User created successfully', user: userResponse });
    } catch (error) {
        console.error('Error in sign_up:', error);
        res.status(500).json({ message: 'Có lỗi xảy ra. Vui lòng thử lại!' });
    }
};

const login_raw = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Tìm user theo email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // So sánh mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Tạo JWT payload
        const payload = {
            user: {
                id: user.id,
                name: user.name,
                role: user.role,
            },
        };

        // Ký và tạo token
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }, // Token hết hạn sau 1 giờ
            (err, token) => {
                if (err) throw err;
                
                // Trả về token và thông tin người dùng (không có mật khẩu)
                const userResponse = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                };
                res.status(200).json({ message: 'Login successful', token, user: userResponse });
            }
        );
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
};

module.exports = {
    sign_up,
    login_raw,
};