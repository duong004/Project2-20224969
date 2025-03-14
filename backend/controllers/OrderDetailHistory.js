const OrderDetailHistory = require('../modules/OrderDetailHistory');
const OrderHistory = require('../modules/orderHistory');
const Products = require('../modules/products');
const mongoose = require('mongoose');

const updateDetail = async (req, res) => {
    const { formData, status, total, ownerId } = req.body;
    
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Cập nhật trạng thái chung của đơn hàng cha
        const orderHis = await OrderHistory.findById(formData[0].orderId).session(session);
        if (!orderHis) {
            throw new Error("Không tìm thấy đơn hàng cha");
        }
        orderHis.generalStatus = status;
        orderHis.amount = total;
        await orderHis.save({ session });

        for (const info of formData) {
            const orderDetail = await OrderDetailHistory.findById(info._id).session(session);
            if (!orderDetail) continue;

            const oldStatus = orderDetail.status;
            orderDetail.status = info.status;
            orderDetail.quantity = info.quantity;
            await orderDetail.save({ session });

            // Nếu trạng thái chuyển thành "deliveried", cập nhật kho
            if (oldStatus !== 'deliveried' && info.status === 'deliveried') {
                await Products.findByIdAndUpdate(
                    info.productId,
                    { $inc: { stock_in_Warehouse: Number(info.quantity) } },
                    { session }
                );
            }
        }
        
        await session.commitTransaction();
        res.status(200).json({ message: "Order details updated successfully" });
    } catch (error) {
        await session.abortTransaction();
        console.error("Error updating order history:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    } finally {
        session.endSession();
    }
};

const listOrderDetail = async (req, res) => {
    const { idOrder } = req.query;
    try {
        const orderDetails = await OrderDetailHistory.find({ orderId: new mongoose.Types.ObjectId(idOrder) })
            .populate('productId', 'name image description'); // Lấy thông tin sản phẩm
        
        const formattedDetails = orderDetails.map(d => ({
            _id: d._id,
            orderId: d.orderId,
            productId: d.productId._id,
            status: d.status,
            quantity: d.quantity,
            updatedAt: d.updatedAt,
            name: d.productId.name,
            image: d.productId.image,
            price: d.price,
            description: d.productId.description,
        }));

        res.json(formattedDetails);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


module.exports = {
    updateDetail,
    listOrderDetail,
};