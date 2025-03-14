import React, { useState, useEffect } from 'react';
import ProductForm from '../../components/Manage_product/ProductForm';
import './index.css';
import ListManager from '../../components/export/form_show';

function ManageProduct() {
    const [products, setProducts] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false); // State để điều khiển form
    const [refreshKey, setRefreshKey] = useState(0); // State để trigger refresh
    const [editingProduct, setEditingProduct] = useState(null);
    const [showSupplierManager, setShowSupplierManager] = useState(false);

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

    const handleDelete = async (product) => {
        if (window.confirm(`Bạn có chắc muốn xóa sản phẩm ${product.name}?`)) {
            try {
                const body = { user: {}, product_delete: product };
                await fetch('http://localhost:5000/products/deletes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                });
                refreshProductList();
            } catch (error) {
                console.error("Lỗi khi xóa:", error);
            }
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product); // Đưa sản phẩm cần sửa vào state
        setIsFormVisible(true); // Mở form
    };

    const closeForm = () => {
        setIsFormVisible(false);
        setEditingProduct(null); // Reset sản phẩm đang sửa
    };

    return (
        <div className="product-manager">
            {isFormVisible && (
                <ProductForm 
                    turnoff={closeForm} 
                    refresh={refreshProductList}
                    productToEdit={editingProduct}
                />
            )}
            {showSupplierManager && <ListManager turnoff={() => setShowSupplierManager(false)} supplier={true} />}

            <div className="header">
                <h2>Quản lý hàng hóa</h2>
                <button className="create-button" onClick={() => setIsFormVisible(true)}>Add</button>
            </div>

            <div className="extended-filter-bar">
                <button className="supplier-button" onClick={() => setShowSupplierManager(true)}>
                    Nhà cung cấp
                </button>
            </div>

            <table className="product-table">
                <thead>
                    <tr>
                        <th>Ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Mã (SKU)</th>
                        <th>Giá bán</th>
                        <th>Tồn kho</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>
                                <img 
                                    src={product.image ? product.image.secure_url : 'https://via.placeholder.com/50'} 
                                    alt={product.name} 
                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                />
                            </td>
                            <td>{product.name}</td>
                            <td>{product.sku}</td>
                            <td>{product.price}</td>
                            <td>{product.stock_in_shelf}</td>
                            <td>
                                <button onClick={() => handleEdit(product)}>Sửa</button>
                                <button onClick={() => handleDelete(product)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManageProduct;