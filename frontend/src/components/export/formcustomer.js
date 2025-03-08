import React, { useState } from 'react';
import { useAuth } from '../introduce/useAuth';
import './formcustomer.css';

function CustomerForm({ close, change, supplier }) {
    const { user } = useAuth();
    const [customer, setCustomer] = useState({ name: '', email: '', phone: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = supplier ? 'http://localhost:5000/products/create_supplier' : 'http://localhost:5000/sell/create_customer';
        const body = { ...customer, user };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const data = await response.json();
            if (response.ok) {
                alert(`Thêm ${supplier ? 'nhà cung cấp' : 'khách hàng'} thành công!`);
                change(); // Trigger refresh
                close();
            } else {
                alert(data.message || 'Có lỗi xảy ra.');
            }
        } catch (error) {
            alert('Lỗi kết nối.');
        }
    };

    return (
        <div className='customer'>
            <div className="customer-form">
                <h2>{supplier ? 'Thêm nhà cung cấp mới' : 'Thêm khách hàng mới'}</h2>
                <p className='close-customer' onClick={close}>x</p>
                <form onSubmit={handleSubmit}>
                    <label>
                        {supplier ? 'Tên nhà cung cấp:' : 'Tên khách hàng:'}
                        <input type="text" name="name" value={customer.name} onChange={handleChange} />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" value={customer.email} onChange={handleChange} />
                    </label>
                    <label>
                        Số điện thoại *:
                        <input type="tel" name="phone" value={customer.phone} onChange={handleChange} required />
                    </label>
                    <button type="submit">{supplier ? 'Thêm nhà cung cấp' : 'Thêm khách hàng'}</button>
                </form>
            </div>
        </div>
    );
}

export default CustomerForm;