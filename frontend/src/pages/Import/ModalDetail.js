import React, { useState, useEffect } from 'react';
import Modal from "../../components/ComponentExport/Modal";
import { useAuth } from "../../components/introduce/useAuth";
import './ModalDetail.css';

const ModalDetail = ({ isOpen, onClose, idOrder }) => {
    const [products, setProducts] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (!isOpen || !idOrder) return;

        const fetchOrderDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/import/orderDetail/listorder?idOrder=${idOrder}`);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching order details:", error);
            }
        };

        fetchOrderDetails();
    }, [isOpen, idOrder]);

    const handleStatusChange = (index, newStatus) => {
        const updatedProducts = [...products];
        updatedProducts[index].status = newStatus;
        setProducts(updatedProducts);
    };
    
    const handleQuantityChange = (index, newQuantity) => {
        const updatedProducts = [...products];
        updatedProducts[index].quantity = newQuantity;
        setProducts(updatedProducts);
    };

    const handleSubmit = async () => {
        const allDelivered = products.every(p => p.status === 'deliveried');
        const allCanceled = products.every(p => p.status === 'canceled');
        let generalStatus = 'pending';
        if (allDelivered) generalStatus = 'deliveried';
        if (allCanceled) generalStatus = 'canceled';
        
        const totalAmount = products.reduce((sum, p) => sum + (Number(p.price.replace(/\./g, '')) * Number(p.quantity)), 0).toString();

        const body = {
            formData: products,
            status: generalStatus,
            total: totalAmount,
            ownerId: user.id_owner,
        };

        try {
            await fetch("http://localhost:5000/import/orderDetail/updateDetail", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            alert("Cập nhật thành công!");
            onClose(); 
        } catch (error) {
            alert("Cập nhật thất bại.");
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="Modal-title">Chi tiết đơn hàng #{idOrder}</div>
            <div className="divide"></div>
            <div className="containerKhoe">
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Trạng thái</th>
                            <th>Số lượng</th>
                            <th>Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product._id}>
                                <td><img src={product.image ? product.image.secure_url : 'https://via.placeholder.com/50'} alt={product.name} style={{width: '50px'}}/></td>
                                <td>{product.name}</td>
                                <td>
                                    <select value={product.status} onChange={(e) => handleStatusChange(index, e.target.value)}>
                                        <option value="pending">Pending</option>
                                        <option value="deliveried">Deliveried</option>
                                        <option value="canceled">Canceled</option>
                                    </select>
                                </td>
                                <td><input type="number" value={product.quantity} onChange={(e) => handleQuantityChange(index, e.target.value)} style={{width: '60px'}}/></td>
                                <td>{(Number(product.price.replace(/\./g, '')) * Number(product.quantity)).toLocaleString('vi-VN')} VND</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="complete-order">
                    <button onClick={handleSubmit}>Cập nhật đơn hàng</button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalDetail;