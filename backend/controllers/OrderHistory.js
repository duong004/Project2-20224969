const mongoose = require('mongoose');
const OrderHistory = require('../modules/orderHistory');
const OrderDetailHistory = require('../modules/OrderDetailHistory');

const saveOrderHistory = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Dữ liệu gửi lên từ frontend 
        const listOrder = Object.values(req.body.dataForm);
        const ownerId = new mongoose.Types.ObjectId(req.body.user.ownerId);

        // Lặp qua từng nhóm đơn hàng (mỗi nhóm cho một nhà cung cấp)
        for (const suppOrders of listOrder) {
            // Xác định trạng thái chung của đơn hàng
            const generalStatus = suppOrders.some(item => item.status === "pending")
                ? "pending"
                : "deliveried";
            
            // Tính tổng tiền cho nhóm đơn hàng này
            const amount = suppOrders
                .reduce((acc, curr) => acc + (Number(curr.price.replace(/\./g, '')) * Number(curr.quantity)), 0)
                .toString();

            // Tạo một bản ghi OrderHistory (đơn hàng cha)
            const order = new OrderHistory({
                supplierId: suppOrders[0].supplierId,
                generalStatus,
                amount,
                ownerId,
            });
            const savedOrder = await order.save({ session });

            // Tạo các bản ghi OrderDetailHistory (chi tiết sản phẩm trong đơn hàng)
            const orderDetails = suppOrders.map(item => ({
                orderId: savedOrder._id,
                productId: new mongoose.Types.ObjectId(item.productId),
                price: item.price,
                quantity: item.quantity,
                status: item.status,
                ownerId,
            }));
            
            // Insert nhiều chi tiết đơn hàng cùng lúc
            await OrderDetailHistory.insertMany(orderDetails, { session });

            // Logic cập nhật kho hàng sẽ được thêm sau
        }
        
        // Nếu mọi thứ thành công, commit transaction
        await session.commitTransaction();
        res.status(200).send({ message: "Order history saved successfully!" });

    } catch (error) {
        // Nếu có lỗi, hủy bỏ tất cả thay đổi
        await session.abortTransaction();
        console.error("Error during the transaction:", error);
        res.status(500).send({ message: "An error occurred during the transaction", error: error.message });
    } finally {
        // Luôn kết thúc session
        session.endSession();
    }
};

module.exports = {
    saveOrderHistory,
};