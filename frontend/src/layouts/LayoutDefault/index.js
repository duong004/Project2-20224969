import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../../components/introduce/useAuth';
import './index.css';

function LayoutDefault() {
    const { logout } = useAuth();
    return (
        <div className="layout-container">
            <header className="main-header">
                <div className="logo">SMART STORE</div>
                <nav>
                    <Link to="/home/manage-product">Manage Products</Link>
                    <Link to="/home/export">Sell</Link> {/* Link tới trang bán hàng */}
                </nav>
                <button onClick={logout} className="logout-btn">Logout</button>
            </header>
            <main className="main-content">
                <Outlet /> {/* Đây là nơi các component con (như ManageProduct, Export) sẽ được render */}
            </main>
        </div>
    );
}

export default LayoutDefault;