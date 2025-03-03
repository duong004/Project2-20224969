import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Nếu chưa đăng nhập, chuyển hướng về trang chủ
    // state: { from: location } để sau khi đăng nhập có thể quay lại trang trước đó
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children; // Nếu đã đăng nhập, hiển thị component con
}

export default ProtectedRoute;