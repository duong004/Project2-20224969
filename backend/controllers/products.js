const Products = require('../modules/products');
const Suppliers = require('../modules/supplier');

const create = async (req, res) => {
    try {
        const { newPr, user } = req.body;
        
        const productExists = await Products.findOne({ sku: newPr.sku, owner: user.id_owner });
        if (productExists) {
            return res.status(400).json({ message: 'SKU đã tồn tại' });
        }

        const productData = {
            ...newPr,
            owner: user.id_owner,
        };

        const newProduct = new Products(productData);
        await newProduct.save();
        res.status(201).json({ message: "Success", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const show = async (req, res) => {
    try {
        const products = await Products.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error', error });
    }
};

const edit = async (req, res) => {
    try {
        const { product_edit } = req.body;
        
        // Logic xóa ảnh cũ trên Cloudinary sẽ được thêm sau
        // ...

        const updatedProduct = await Products.findByIdAndUpdate(
            product_edit._id,
            product_edit,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: "success", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deletes = async (req, res) => {
    try {
        const { product_delete } = req.body;
        const product = await Products.findByIdAndDelete(product_delete._id);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const get_supplier = async (req, res) => {
    const { user } = req.body;
    try {
        const suppliers = await Suppliers.find({ owner: user.id_owner })
            .populate("creater", "name email") // Lấy thông tin người tạo
            .lean(); // .lean() để trả về plain object, nhanh hơn
        res.json({ suppliers: suppliers, message: "success" });
    } catch (error) {
        res.status(500).json({ message: "Error", error });
    }
};

const create_supplier = async (req, res) => {
    const { name, email, phone, user } = req.body;
    try {
        let check = await Suppliers.findOne({ owner: user.id_owner, phone });
        if (check) {
            return res.status(400).json({ message: "Số điện thoại này đã được đăng ký cho nhà cung cấp khác." });
        }
        
        let new_supplier = new Suppliers({
            name,
            email,
            phone,
            owner: user.id_owner,
            creater: user._id, // user._id là người đang thực hiện hành động
        });
        await new_supplier.save();
        res.status(201).json({ new_supplier, message: "success" });
    } catch (err) {
        res.status(500).json({ message: "Error creating supplier" });
    }
};

module.exports = {
    create,
    show,
    edit,
    deletes,
    get_supplier,
    create_supplier,
};