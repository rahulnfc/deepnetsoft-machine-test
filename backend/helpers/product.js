const { Product } = require('../models');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    getProducts: async (userId) => {
        console.log('getProducts', userId);
        try {
            // get all products added by the userId
            const products = await Product.aggregate([
                { $match: { userId: ObjectId(userId) } },
                { $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'user' } },
                { $unwind: '$user' },
                { $project: { _id: 1, name: 1, price: 1, quantity: 1, category: 1, user: { name: 1, } } }
            ]);
            return products;
        } catch (err) {
            throw err;
        }
    },
    addProduct: async (product) => {
        try {
            // check product name already exist for the userId
            const productExist = await Product.findOne({ name: product.name, userId: ObjectId(product.userId) });
            if (productExist) {
                return { productExist: true };
            } else {
                // add new product
                const newProduct = new Product(product);
                await newProduct.save();
                return { newProduct: true };
            }
        } catch (err) {
            throw err;
        }
    }
};