import React, { useState } from 'react';
import LoginModal from './intro';
import './main.css';

function MainIntro() {
    const [modalType, setModalType] = useState(0); // 0: none, 1: login, 2: signup

    return (
        <>
            {modalType === 1 && <LoginModal off={() => setModalType(0)} isSignup={false} />}
            {modalType === 2 && <LoginModal off={() => setModalType(0)} isSignup={true} />}
            
            <div className="main" style={modalType !== 0 ? { opacity: 0.3 } : {}}>
                <header>
                    <div className="logo">SMART STORE</div>
                    <div className="auth-buttons">
                        <button className="btn" onClick={() => setModalType(1)}>Đăng nhập</button>
                        <button className="btn" onClick={() => setModalType(2)}>Đăng ký</button>
                    </div>
                </header>
                <section className="content">
                    <p>Chào mừng đến với trang web quản lý cửa hàng của chúng tôi!</p>
                </section>
            </div>
        </>
    );
}

export default MainIntro;