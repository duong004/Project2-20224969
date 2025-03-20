import React, { useState, useEffect } from 'react';
import { useAuth } from "../../components/introduce/useAuth";
import './history.css';

function History({ turnoff, customer, supplier }) {
    const [activities, setActivities] = useState([]);
    const { user } = useAuth();
    
    const getApiUrl = () => {
        if (customer) return 'http://localhost:5000/sell/get_history_customer';
        if (supplier) return 'http://localhost:5000/products/get_history_supplier';
        return 'http://localhost:5000/products/history';
    };

    useEffect(() => {
        if (!user) return;
        const fetchHistory = async () => {
            try {
                const response = await fetch(getApiUrl(), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ user }),
                });
                const data = await response.json();
                setActivities(data);
            } catch (error) {
                console.error("Error fetching history:", error);
            }
        };
        fetchHistory();
    }, [user, customer, supplier]);

    const formatDateTime = (isoString) => new Date(isoString).toLocaleString('vi-VN');

    return (
        <div className="history-mgmt-main">
            <div className="history-mgmt-container">
                <div className="close" onClick={turnoff}>x</div>
                <div className="history-mgmt-header">
                    <h2 className="history-mgmt-title">Lịch sử thay đổi</h2>
                </div>
                <table className="history-mgmt-table">
                    <thead>
                        <tr>
                            <th>Người thực hiện</th>
                            <th>Thời gian</th>
                            <th>Hành động</th>
                            <th>Đối tượng</th>
                            <th>Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activities.map((act) => (
                            <tr key={act._id}>
                                <td>{act.employee.name}</td>
                                <td>{formatDateTime(act.timestamp)}</td>
                                <td><span className={`history-mgmt-status ${act.action}`}>{act.action}</span></td>
                                <td>{act.product || act.supplier || act.customer}</td>
                                <td>{act.details}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default History;