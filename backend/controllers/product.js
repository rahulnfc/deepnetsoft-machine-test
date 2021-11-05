const { ProductHelper } = require('../helpers');

module.exports = {
    getProducts: async (req, res) => {
        try {
            const products = await ProductHelper.getProducts(req.params.id);
            res.status(200).json(products);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    addProduct: async (req, res) => {
        // add product
        const Add = await ProductHelper.addProduct(req.body);
        if (Add.productExist) {
            return res.status(400).json({ productExist: true });
        } else if (Add.newProduct) {
            return res.status(200).json({ newProduct: true });
        }
    }
}