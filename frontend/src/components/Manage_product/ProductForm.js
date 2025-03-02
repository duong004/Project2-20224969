import React, { useState, useEffect } from 'react';
import './ProductForm.css';

function ProductForm({ turnoff, refresh, productToEdit }) {
    const [formData, setFormData] = useState({
        name: "", sku: "", price: "", stock_in_shelf: 0,
    });
    const isEditing = !!productToEdit;

    useEffect(() => {
        if (isEditing) {
            setFormData(productToEdit);
        }
    }, [productToEdit, isEditing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isEditing ? 'http://localhost:5000/products/edit' : 'http://localhost:5000/products/create';
        const body = isEditing ? { product_edit: formData } : { newPr: formData };
        const user = { id_owner: '66515971167b58098c9b4e67' }; // Hardcode user
        body.user = {}; // Hardcode user

        try {
            const response = await fetch("http://localhost:5000/products/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
            const data = await response.json();
            if (data.message === "Success") {
                alert("Thêm sản phẩm thành công!");
                refresh(); // Gọi hàm refresh để tải lại danh sách
                turnoff(); // Đóng form
            } else {
                alert(data.message || "Có lỗi xảy ra");
            }
        } catch (error) {
            console.error("Lỗi:", error);
            alert("Thêm sản phẩm thất bại");
        }
    };

    return (
        <div className="form-container">
            <span className="close-button" onClick={turnoff}>×</span>
            <h2>{isEditing ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Tên hàng hóa *</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="sku">Mã *</label>
                    <input type="text" id="sku" name="sku" value={formData.sku} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Giá bán *</label>
                    <input type="text" id="price" name="price" value={formData.price} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="stock_in_shelf">Số lượng trên kệ</label>
                    <input type="number" id="stock_in_shelf" name="stock_in_shelf" value={formData.stock_in_shelf} onChange={handleChange} />
                </div>
                <div className="submit-row">
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </div>
    );
}

export default ProductForm;