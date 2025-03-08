const mongoose = require('mongoose');
const Bills = require('../modules/bill');
const Products = require('../modules/products');
const Customer = require('../modules/customer');

const history = async (req, res) => {
    const { totalAmount, items } = req.body;
    
    // Bắt đầu một session để đảm bảo tính toàn vẹn (atomicity)
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const newBill = new Bills({
            totalAmount,
            items,
        });
        await newBill.save({ session });

        // Cập nhật số lượng tồn kho cho từng sản phẩm
        for (const item of items) {
            const product = await Products.findById(item.productID).session(session);
            if (!product) {
                throw new Error(`Sản phẩm với ID ${item.productID} không tồn tại.`);
            }
            if (product.stock_in_shelf < item.quantity) {
                throw new Error(`Không đủ hàng cho sản phẩm: ${product.name}`);
            }
            product.stock_in_shelf -= item.quantity;
            await product.save({ session });
        }
        
        // Nếu mọi thứ thành công, commit transaction
        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ message: 'success', bill: newBill });
    } catch (error) {
        // Nếu có lỗi, abort transaction
        await session.abortTransaction();
        session.endSession();
        
        console.error("Error saving history:", error);
        return res.status(400).json({ message: error.message });
    }
};

const get_customer = async (req, res) => {
    const { user } = req.body;
    try {
        const customers = await Customer.find({ owner: user.id_owner })
            .populate("creater", "name email")
            .lean();
        res.json({ customers: customers, message: "success" });
    } catch (error) {
        res.status(500).json({ message: "Error", error });
    }
};

const create_customer = async (req, res) => {
    const { name, email, phone, user } = req.body;
    try {
        let check = await Customer.findOne({ owner: user.id_owner, phone });
        if (check) {
            return res.status(400).json({ message: "Số điện thoại này đã được đăng ký cho khách hàng khác." });
        }
        
        let new_customer = new Customer({
            name,
            email,
            phone,
            owner: user.id_owner,
            creater: user._id,
        });
        await new_customer.save();
        res.status(201).json({ new_customer, message: "success" });
    } catch (err) {
        res.status(500).json({ message: "Error creating customer" });
    }
};

module.exports = {
    history,
    get_customer,
    create_customer,
};