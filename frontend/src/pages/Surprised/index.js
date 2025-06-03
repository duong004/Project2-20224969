import React, { useState, useEffect } from 'react';
import './index.css';

const Surprised = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const fullTitle = '🎉 Chúc Mừng Năm Mới 2025 🎉';
  const fullMessage = `Chúc bạn và gia đình một năm mới thật nhiều sức khỏe, 8386, hạnh phúc viên mãn, thành công trong công việc, 
    tràn ngập tiếng cười, gắn kết yêu thương và đạt được mọi ước mơ đã đặt ra. Chúc cho mọi nỗ lực đều được 
    đền đáp xứng đáng, mọi khó khăn đều hóa giải, và mỗi ngày trôi qua đều là một ngày đáng nhớ! 🌟🎇`;

  useEffect(() => {
    let i = 0;
    const ti = setInterval(() => {
      setTitle(prev => prev + fullTitle[i]);
      i += 1;
      if (i === fullTitle.length) clearInterval(ti);
    }, 100);
    return () => clearInterval(ti);
  }, []);

  useEffect(() => {
    let j = 0;
    const mi = setInterval(() => {
      setMessage(prev => prev + fullMessage[j]);
      j += 1;
      if (j === fullMessage.length) clearInterval(mi);
    }, 50);
    return () => clearInterval(mi);
  }, []);

  return (
    <div className="new-year-container">
      <div className="confetti"></div>
      <h1 className="new-year-title">{title}</h1>
      <p className="new-year-message">{message}</p>
      <div className="fireworks">
        <div className="firework"></div>
        <div className="firework"></div>
        <div className="firework"></div>
      </div>
    </div>
  );
};

export default Surprised;