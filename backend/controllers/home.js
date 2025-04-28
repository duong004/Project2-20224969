const Bills = require('../modules/bill');
const Customer = require('../modules/customer');
const Products = require('../modules/products');
const mongoose = require('mongoose');

// --- Hàm tính tổng doanh thu hôm nay và so sánh với hôm qua ---
const total_revenue = async (req, res) => {
    const { user } = req.body;
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Bắt đầu ngày hôm nay
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1); // Bắt đầu ngày mai
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1); // Bắt đầu ngày hôm qua

        // Sử dụng Aggregation để tính tổng
        const revenueAggregation = await Bills.aggregate([
            {
                $match: {
                    owner: new mongoose.Types.ObjectId(user.id_owner),
                    orderDate: { $gte: yesterday, $lt: tomorrow } // Lấy hóa đơn trong 2 ngày
                }
            },
            {
                $addFields: {
                    // Chuyển đổi totalAmount từ string (vd: "1.000.000") sang số
                    numericAmount: { $toDouble: { $replaceAll: { input: "$totalAmount", find: ".", replacement: "" } } }
                }
            },
            {
                $group: {
                    _id: null, // Nhóm tất cả lại
                    totalRevenueToday: {
                        $sum: {
                            $cond: [{ $gte: ["$orderDate", today] }, "$numericAmount", 0]
                        }
                    },
                    totalRevenueYesterday: {
                        $sum: {
                            $cond: [{ $and: [{ $gte: ["$orderDate", yesterday] }, { $lt: ["$orderDate", today] }] }, "$numericAmount", 0]
                        }
                    }
                }
            }
        ]);
        
        let { totalRevenueToday = 0, totalRevenueYesterday = 0 } = revenueAggregation[0] || {};
        
        // Tính toán phần trăm thay đổi
        let percentChange = 0;
        let state = "notchange";
        if (totalRevenueYesterday > 0) {
            percentChange = ((totalRevenueToday - totalRevenueYesterday) / totalRevenueYesterday) * 100;
        } else if (totalRevenueToday > 0) {
            percentChange = 100;
        }
        
        if (percentChange > 0) state = 'up';
        if (percentChange < 0) {
            state = 'down';
            percentChange = -percentChange;
        }

        res.status(200).json({
            totalRevenueToday: totalRevenueToday.toLocaleString('vi-VN', { style: "currency", currency: "VND" }),
            percentChange: percentChange.toFixed(2) + "%",
            state: state,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// --- Hàm tính top sản phẩm bán chạy ---
const generate_top_product = async (req, res) => {
    const { user } = req.body;
    try {
        // Tìm các sản phẩm thuộc owner, sắp xếp theo rate giảm dần, lấy 3 sản phẩm đầu
        const products = await Products.find({ owner: user.id_owner })
            .sort({ rate: -1 }) // Giả sử 'rate' là số lần bán
            .limit(3);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// --- Hàm thống kê doanh số 7 ngày gần nhất cho biểu đồ ---
const generatedailySale = async (req, res) => {
    const { user } = req.body;
    try {
        const today = new Date();
        const last7Days = new Date(today);
        last7Days.setDate(today.getDate() - 7);
        last7Days.setHours(0, 0, 0, 0);

        const result = await Bills.aggregate([
            {
                $match: {
                    owner: new mongoose.Types.ObjectId(user.id_owner),
                    orderDate: { $gte: last7Days }
                }
            },
            {
                $addFields: {
                    numericAmount: { $toDouble: { $replaceAll: { input: "$totalAmount", find: ".", replacement: "" } } }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } },
                    total: { $sum: "$numericAmount" }
                }
            },
            { $sort: { _id: 1 } } // Sắp xếp theo ngày tăng dần
        ]);

        // Format lại dữ liệu cho Recharts
        const dateLabels = [];
        const reportData = [];
        for (let i = 7; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateString = d.toISOString().split('T')[0];
            const dayLabel = `Ngày ${d.getDate()}`;
            
            dateLabels.push(dayLabel);
            
            const found = result.find(r => r._id === dateString);
            reportData.push(found ? found.total : 0);
        }

        res.json({ date: dateLabels, report: reportData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    total_revenue,
    generate_top_product,
    generatedailySale,
};