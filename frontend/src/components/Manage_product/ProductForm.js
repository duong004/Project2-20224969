import React, { useState, useEffect } from 'react';
import './ProductForm.css';

function ProductForm({ turnoff, refresh, productToEdit }) {
    const CLOUD_NAME = "your_cloud_name"; // Thay bằng cloud_name của bạn
    const UPLOAD_PRESET = "your_upload_preset"; // Thay bằng upload_preset của bạn

    const [formData, setFormData] = useState({
        name: "", sku: "", price: "", stock_in_shelf: 0, image: null
    });

    const [imageFile, setImageFile] = useState(null); // State để lưu file ảnh
    const [imagePreview, setImagePreview] = useState(""); // State để xem trước ảnh
    const [isLoading, setIsLoading] = useState(false);
    const isEditing = !!productToEdit;

    useEffect(() => {
        if (isEditing) {
            setFormData(productToEdit);
            if (productToEdit.image) {
                setImagePreview(productToEdit.image.secure_url);
            }
        }
    }, [productToEdit, isEditing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        let imageUrl = formData.image; // Giữ lại ảnh cũ nếu có

        // Nếu có file ảnh mới được chọn, upload nó lên Cloudinary
        if (imageFile) {
            const data = new FormData();
            data.append('file', imageFile);
            data.append('upload_preset', UPLOAD_PRESET);

            try {
                const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                    method: 'POST',
                    body: data,
                });
                const fileData = await res.json();
                imageUrl = { secure_url: fileData.secure_url, public_id: fileData.public_id };
            } catch (error) {
                alert("Lỗi upload ảnh!");
                setIsLoading(false);
                return;
            }
        }

        const finalFormData = { ...formData, image: imageUrl };

        // Gửi dữ liệu (bao gồm cả URL ảnh) về backend
        const url = isEditing ? 'http://localhost:5000/products/edit' : 'http://localhost:5000/products/create';
        const body = isEditing ? { product_edit: finalFormData } : { newPr: finalFormData };
        // Giả lập user object
        body.user = { id_owner: '66515971167b58098c9b4e67', _id: '66515971167b58098c9b4e67' };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const data = await response.json();
            if (response.ok) {
                alert(`Thành công!`);
                refresh();
                turnoff();
            } else {
                alert(data.message || 'Có lỗi xảy ra');
            }
        } catch (error) {
            alert('Lỗi kết nối.');
        } finally {
            setIsLoading(false);
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
                <div className="form-group">
                    <label htmlFor="image">Ảnh sản phẩm</label>
                    <input type="file" id="image" name="image" onChange={handleImageChange} />
                    {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '100px', marginTop: '10px' }} />}
                </div>
                <div className="submit-row">
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Đang xử lý...' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ProductForm;