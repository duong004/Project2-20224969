const mongoose = require('mongoose');
const Bills = require('../modules/bill');
const Products = require('../modules/products');

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

module.exports = {
    history,
};