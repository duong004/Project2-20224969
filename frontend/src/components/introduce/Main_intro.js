import { useEffect, useState } from 'react';
import { useLocation, Navigate } from "react-router-dom";
import LoginModal from './intro';
import './main.css';
import Cookies from 'js-cookie';
import { notify } from '../../components/Notification/notification';
import help from "./img/help.png";
import logo from "./img/logo2-removebg-preview.png";

function Main() {
  const [a, setA] = useState(0);
  const handle = (x) => { setA(x); };
  const location = useLocation();
  const storedUser = Cookies.get("user");
  let user = null;

  useEffect(() => {
    if (location.state) {
      notify(2, "bạn phải đăng nhập", "Thất bại");
    }
  }, [location.state]);

  if (storedUser) {
    try {
      const decodedString = decodeURIComponent(storedUser);
      user = JSON.parse(decodedString);
    } catch (error) {
      console.error("Không thể giải mã hoặc phân tích dữ liệu người dùng:", error);
    }
  }

  if (user) {
    console.log(user);
    return <Navigate to="/home" replace />;
  }

  return (
    <>
      {a === 1 && <LoginModal off={handle} isSignup={false} />}
      {a === 2 && <LoginModal off={handle} isSignup={true} />}

      <div
        className="main"
        style={a !== 0 ? { opacity: 0.3 } : {}}
      >
        <header>
          <div className="logo">
            <img
              src={logo}
              alt="Logo"
              style={{
                height: "112px",
                position: "absolute",
                top: "0",
                left: "33%"
              }}
            />
            SMART STORE
          </div>
          <div className="auth-buttons">
            <button
              className="btn"
              onClick={() => setA(1)}
            >
              Đăng nhập
            </button>
            <button
              className="btn"
              onClick={() => setA(2)}
            >
              Đăng ký
            </button>
          </div>
        </header>

        <div id="wrapper">
          <div className="image-container">
            <div className="support-btn">
              <span className="support-text">
                <a href="http://localhost:8000">Hỗ trợ</a>
              </span>
            </div>
            <img
              src={help}
              alt="Background"
              className="background-image"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;