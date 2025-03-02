import React, { useState, useEffect } from 'react';
import ProductForm from '../../components/Manage_product/ProductForm';
import './index.css';

function ManageProduct() {
    const [products, setProducts] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false); // State để điều khiển form
    const [refreshKey, setRefreshKey] = useState(0); // State để trigger refresh

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Giả lập user object để gửi đi
                const user = { id_owner: '66515971167b58098c9b4e67' }; 
                const response = await fetch('http://localhost:5000/products/show', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user }),
                });
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
            }
        };

        fetchProducts();
    }, [refreshKey]); // Thêm refreshKey vào dependency

    const refreshProductList = () => {
        setRefreshKey(oldKey => oldKey + 1);
    };

    return (
        <div className="product-manager">
            {isFormVisible && <ProductForm turnoff={() => setIsFormVisible(false)} refresh={refreshProductList} />}

            <div className="header">
                <h2>Quản lý hàng hóa</h2>
                <button className="create-button" onClick={() => setIsFormVisible(true)}>Add</button>
            </div>

            <table className="product-table">
                <thead>
                    <tr>
                        <th>Tên sản phẩm</th>
                        <th>Mã (SKU)</th>
                        <th>Giá bán</th>
                        <th>Tồn kho</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map(product => (
                            <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>{product.sku}</td>
                                <td>{product.price}</td>
                                <td>{product.stock_in_shelf}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">Không có sản phẩm nào.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ManageProduct;