import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './intro.css';

function LoginModal({ off, isSignup }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        ...(isSignup && { name: "", confirmPassword: "" }),
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setError('');
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isSignup ? 'http://localhost:5000/login/sign_up' : 'http://localhost:5000/login/login_raw';

        if (isSignup && formData.password !== formData.confirmPassword) {
            setError("Mật khẩu không khớp!");
            return;
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                if (!isSignup) {
                    // Tạm thời chỉ chuyển hướng, chưa xử lý token
                    navigate('/home/manage-product'); 
                } else {
                    off(); // Đóng modal sau khi đăng ký thành công
                }
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Lỗi kết nối đến server.');
        }
    };

    return (
        <div className="login">
            <div className="login-modal">
                <div className="login-header">
                    <h2>{isSignup ? "Sign up" : "Login"}</h2>
                    <span className="close-btn" onClick={() => off(0)}>×</span>
                </div>
                <form className="login-form" onSubmit={handleSubmit}>
                    {isSignup && (
                        <div className="form-group">
                            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                        </div>
                    )}
                    <div className="form-group">
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    </div>
                    {isSignup && (
                        <div className="form-group">
                            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
                        </div>
                    )}
                    <button id="login-btn" type="submit">{isSignup ? "Sign up" : "Login"}</button>
                    {error && <p style={{ color: "red", marginTop: '10px' }}>{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default LoginModal;