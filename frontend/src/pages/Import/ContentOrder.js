import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/introduce/useAuth';

function ContentOrder({ dataHis, setIdProductAdded }) {
    const { user } = useAuth();
    const [listProductWereAdded, setListProductWereAdded] = useState([]);

    // Khởi tạo một item cho đơn hàng
    const initItem = (item) => ({
        name: item.name,
        supplier: item.supplierDetails.name,
        price: item.purchasePrice,
        imageUrl: item.image ? item.image.secure_url : 'https://via.placeholder.com/50',
        supplierId: item.supplierDetails._id,
        productId: item._id,
        quantity: 1,
        status: "pending",
    });

    // Thêm sản phẩm vào danh sách khi prop dataHis thay đổi
    useEffect(() => {
        if (dataHis && dataHis.length > 0) {
            const newItems = dataHis.map(initItem);
            // Kiểm tra để tránh thêm trùng lặp
            const uniqueNewItems = newItems.filter(newItem => 
                !listProductWereAdded.some(existingItem => existingItem.productId === newItem.productId)
            );
            setListProductWereAdded(prevList => [...prevList, ...uniqueNewItems]);
            setIdProductAdded([]);
        }
    }, [dataHis]);
    
    // Hàm xử lý khi nhấn nút "Complete"
    const handleSubmit = async () => {
        if (listProductWereAdded.length === 0) {
            alert("Vui lòng thêm sản phẩm vào đơn hàng.");
            return;
        }

        // Nhóm các sản phẩm theo nhà cung cấp
        const groupBySupplier = listProductWereAdded.reduce((acc, item) => {
            if (!acc[item.supplierId]) {
                acc[item.supplierId] = [];
            }
            acc[item.supplierId].push(item);
            return acc;
        }, {});

        const body = {
            user: { ownerId: user.id_owner },
            dataForm: groupBySupplier,
        };

        try {
            const response = await fetch("http://localhost:5000/import/orderHistory/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            if (response.ok) {
                alert("Tạo đơn hàng thành công!");
                setListProductWereAdded([]);
            } else {
                const errorData = await response.json();
                alert(`Lỗi: ${errorData.message}`);
            }
        } catch (error) {
            alert("Lỗi kết nối server.");
        }
    };
    
    // ... Các hàm khác như handleRemove, handleQuantityChange ...

    return (
        <>
            <div className="list-product-title">Sản phẩm trong đơn</div>
            <div className="list-product-content">
                <table>
                    <thead>
                        <tr>
                            <th>Ảnh</th>
                            <th>Sản Phẩm</th>
                            <th>Nhà Cung Cấp</th>
                            <th>Số Lượng</th>
                            <th>Giá nhập</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listProductWereAdded.map((product, index) => (
                            <tr key={index}>
                                <td><img src={product.imageUrl} alt={product.name} style={{width: '50px'}}/></td>
                                <td>{product.name}</td>
                                <td>{product.supplier}</td>
                                <td>
                                    <input type="number" defaultValue="1" style={{width: '60px'}} />
                                </td>
                                <td>{product.price}</td>
                                <td>
                                    <span className={`product-status ${product.status}`}>
                                        {product.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="complete-order">
                <button onClick={handleSubmit}>Complete</button>
            </div>
        </>
    );
}

export default ContentOrder;