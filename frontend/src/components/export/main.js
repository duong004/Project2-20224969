import React, { useState, useEffect } from 'react';
import './main.css';
import ListManager from './form_show';

function Billing() {
    const [allProducts, setAllProducts] = useState([]); // Danh sách tất cả sản phẩm
    const [currentBill, setCurrentBill] = useState([]);
    const [productCode, setProductCode] = useState("");
    const [showCustomerManager, setShowCustomerManager] = useState(false);

    // Lấy danh sách sản phẩm từ API
    useEffect(() => {
        const fetchAllProducts = async () => {
            const response = await fetch('http://localhost:5000/products/show', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) });
            const data = await response.json();
            setAllProducts(data);
        };
        fetchAllProducts();
    }, []);

    const addProductToBill = () => {
        const productToAdd = allProducts.find(p => p.sku === productCode);
        if (!productToAdd) {
            alert("Không tìm thấy sản phẩm!");
            return;
        }

        const existingProductIndex = currentBill.findIndex(item => item.productID === productToAdd._id);

        if (existingProductIndex > -1) {
            // Nếu sản phẩm đã có, tăng số lượng
            const updatedBill = [...currentBill];
            updatedBill[existingProductIndex].quantity += 1;
            setCurrentBill(updatedBill);
        } else {
            // Nếu chưa có, thêm mới
            const newItem = {
                productID: productToAdd._id,
                name: productToAdd.name,
                quantity: 1,
                price: productToAdd.price,
            };
            setCurrentBill([...currentBill, newItem]);
        }
        setProductCode(""); // Reset input
    };
    
    const calculateTotal = () => {
        return currentBill.reduce((total, item) => {
            return total + (item.quantity * parseFloat(item.price.replace(/\./g, '')));
        }, 0);
    };

    const handlePayment = async () => {
        if (currentBill.length === 0) {
            alert("Vui lòng thêm sản phẩm vào hóa đơn!");
            return;
        }

        const billData = {
            totalAmount: calculateTotal().toLocaleString('vi-VN'),
            items: currentBill,
        };

        try {
            const response = await fetch('http://localhost:5000/sell/history', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(billData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Thanh toán thất bại');
            }
            
            alert('Thanh toán thành công!');
            setCurrentBill([]); // Reset hóa đơn
        } catch (error) {
            alert(`Lỗi: ${error.message}`);
        }
    };

    return (     
        <>
            {showCustomerManager && <ListManager turnoff={() => setShowCustomerManager(false)} supplier={false} />}
            <div className="billing-container">
                <div className="top-bar">
                    <div className="form-group-sell">
                        <label className="label-sell">Mã sản phẩm (SKU): </label>
                        <input 
                            className="input-sell"
                            type="text"
                            value={productCode}
                            onChange={(e) => setProductCode(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addProductToBill()}
                        />
                        <button className="button-sell" onClick={addProductToBill}>Thêm sản phẩm</button>
                    </div>
                    <div className="xx">
                        <button className="create_user" onClick={() => setShowCustomerManager(true)}>
                            Danh sách khách hàng
                        </button>
                    </div>
                </div>

                <div className="product-list">
                    <h2>Danh sách sản phẩm</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Tên sản phẩm</th>
                                <th>Số lượng</th>
                                <th>Giá bán</th>
                                <th>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentBill.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price} VND</td>
                                    <td>{(item.quantity * parseFloat(item.price.replace(/\./g, ''))).toLocaleString('vi-VN')} VND</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="summary">
                    <div className="result">
                        <h2>Tổng hóa đơn: {calculateTotal().toLocaleString('vi-VN')} VND</h2>
                    </div>
                    <button 
                        className="button-sell" 
                        style={{ color: "white", marginTop: "10px" }}
                        onClick={handlePayment}
                    >
                        Thanh toán
                    </button>
                </div>
            </div>
        </>
    );
}

export default Billing;