import React, { useState, useEffect } from 'react';
import { useAuth } from "../introduce/useAuth";
import CustomerForm from "./formcustomer";
import './history.css';

function ListManager({ turnoff, supplier }) {
    const [list, setList] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const { user } = useAuth();
    const title = supplier ? "Nhà cung cấp" : "Khách hàng";
    const apiUrl = supplier ? 'http://localhost:5000/products/get_supplier' : 'http://localhost:5000/sell/get_customer';
    const dataKey = supplier ? 'suppliers' : 'customers';

    useEffect(() => {
        if (!user) return;
        
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ user }),
                });
                const data = await response.json();
                if (data.message === 'success') {
                    setList(data[dataKey]);
                }
            } catch (error) {
                console.error(`Error fetching ${title}:`, error);
            }
        };
        fetchData();
    }, [user, apiUrl, dataKey, refreshKey]);

    const triggerRefresh = () => {
        setRefreshKey(k => k + 1);
    };

    const formatDateTime = (isoString) => {
        if (!isoString) return 'N/A';
        const date = new Date(isoString);
        return date.toLocaleString('vi-VN');
    };

    return (
        <>
            {isFormVisible && <CustomerForm close={() => setIsFormVisible(false)} change={triggerRefresh} supplier={supplier} />}
            <div className="history-mgmt-main">
                <div className="history-mgmt-container">
                    <div className="close" onClick={turnoff}>x</div>
                    <div className="history-mgmt-header">
                        <h2 className="history-mgmt-title">{title}</h2>
                        <div className="history-mgmt-header-controls">
                            <button className="order-mgmt-create-btn" onClick={() => setIsFormVisible(true)}>
                                Create {title}
                            </button>
                        </div>
                    </div>
                    <table className="history-mgmt-table">
                        <thead>
                            <tr>
                                <th>Tên người tạo</th>
                                <th>Ngày tạo</th>
                                <th>Tên {title}</th>
                                <th>Số điện thoại</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.creater.name}</td>
                                    <td>{formatDateTime(item.createdAt)}</td>
                                    <td>{item.name}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        {/* Nút sửa/xóa sẽ được thêm ở các commit sau */}
                                        <button className="order-mgmt-button edit">✏️</button>
                                        <button className="order-mgmt-button delete">🗑️</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default ListManager;