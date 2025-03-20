import React, { useState, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import Modal from '../../components/ComponentExport/Modal';
import { useAuth } from '../../components/introduce/useAuth';
import './import.css';
import OrderManagement from '../../components/test/index';
import ModalDetail from './ModalDetail';
import ContentOrder from './ContentOrder'; 


function Import() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]); // Gợi ý tìm kiếm
    const [idProductAdded, setIdProductAdded] = useState([]); // Sản phẩm được thêm vào đơn
    const { user } = useAuth();
    const [openDetail, setOpenDetail] = useState(false);
    const [idOrder, setIdOrder] = useState(null);

    const openModalDetail = () => setOpenDetail(true);
    const closeModalDetail = () => setOpenDetail(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    // Hàm gọi API lấy gợi ý sản phẩm/nhà cung cấp
    const fetchSuggestions = async (keyword) => {
        if (!keyword) {
            setSuggestions([]);
            return;
        }
        try {
            // Tạm thời chỉ tìm kiếm sản phẩm
            const response = await axios.get(`http://localhost:5000/import/products/exhibitProN`, {
                params: { query: keyword, ownerId: user.id_owner },
            });
            setSuggestions(response.data);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setSuggestions([]);
            } else {
                console.error("Error fetching suggestions:", error);
            }
        }
    };
    
    // Sử dụng debounce để tránh gọi API liên tục
    const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 500), [user]);

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        debouncedFetchSuggestions(term);
    };

    const handleSelectSuggestion = (product) => {
        setIdProductAdded([product]);
        setSearchTerm("");
        setSuggestions([]);
    };

    return (
        <>
            <OrderManagement openModalDetail={openModalDetail} setIdOrder={setIdOrder} />
            
            <ModalDetail
                isOpen={openDetail}
                onClose={closeModalDetail}
                idOrder={idOrder}
            />
            
            {/* Component bảng hiển thị đơn hàng đã có sẽ được thêm sau */}
            <div className="order-mgmt-header">
                <h2 className="order-mgmt-title">Quản lý nhập hàng</h2>
                <button className="order-mgmt-create-btn" onClick={openModal}>Create Order</button>
            </div>

            <Modal isOpen={isOpen} onClose={closeModal}>
                <div className="Modal-title">Tạo đơn hàng nhập kho</div>
                <div className="divide"></div>
                <div className="header-order">
                    <div className="search-container">
                        <input
                            type="text"
                            className="order-mgmt-search"
                            placeholder="Tìm kiếm sản phẩm theo tên..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        {suggestions.length > 0 && (
                            <ul className="dropdown">
                                {suggestions.map((product) => (
                                    <li key={product._id} onClick={() => handleSelectSuggestion(product)}>
                                        {product.name} (NCC: {product.supplierDetails.name})
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div className="body-modal">
                    <ContentOrder 
                        dataHis={idProductAdded}
                        setIdProductAdded={setIdProductAdded}
                    />
                </div>
            </Modal>
        </>
    );
}

export default Import;