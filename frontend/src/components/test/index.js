import React, { useState, useEffect } from 'react';
import { useAuth } from "../../components/introduce/useAuth";
import './index.css';

function OrderManagement({ openModalDetail, setIdOrder }) {
    const [orders, setOrders] = useState([]);
    const { user, loading } = useAuth();

    useEffect(() => {
        if (loading || !user) return;
        
        const fetchPendingOrders = async () => {
            try {
                const apiUrl = `http://localhost:5000/import/orderHistory/getOrder?ownerId=${user.id_owner}`;
                const response = await fetch(apiUrl);
                const data = await response.json();
                
                // Format lại dữ liệu để dễ hiển thị
                const formattedOrders = data.map(order => ({
                    id: order._id,
                    client: order.nameSupplier,
                    email: order.emailSupplier,
                    status: order.generalStatus,
                    date: order.updatedAt,
                    total: order.amount,
                }));
                setOrders(formattedOrders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchPendingOrders();
    }, [user, loading]);

    const handleViewDetails = (orderId) => {
        setIdOrder(orderId);
        openModalDetail();
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('vi-VN');
    };

    return (
        <div className="order-mgmt-container">
            <table className="order-mgmt-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Nhà cung cấp</th>
                        <th>Ngày cập nhật</th>
                        <th>Trạng thái</th>
                        <th>Tổng tiền</th>
                        <th>Chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={order.id}>
                            <td>#{order.id.slice(-6)}</td> {/* Hiển thị 6 ký tự cuối */}
                            <td>
                                {order.client} <br />
                                <small>{order.email}</small>
                            </td>
                            <td>{formatDate(order.date)}</td>
                            <td>
                                <span className={`order-mgmt-status ${order.status.toLowerCase()}`}>
                                    {order.status}
                                </span>
                            </td>
                            <td>{order.total} VND</td>
                            <td>
                                <button className="order-mgmt-button view" onClick={() => handleViewDetails(order.id)}>
                                    Xem
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrderManagement;