const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');
const transactionModel = require('../models/transactionModel');
const walletModel = require('../models/walletModel');
const { walletDetails } = require('./walletController');
const date = new Date()

module.exports = {
    createOrder: async (req, res) => {
        try {
            let { walletId, userId } = req.params
            const { products } = req.body

            // const orderProducts = [];
            let totalPrice = 0;
            for (const { productId, quantity } of products) {
                const product = await productModel.findById(productId);
                totalPrice += product.price * quantity;
                // orderProducts.push({ productId, quantity })
            }
            await walletDetails(req, res).then((data) => {
                if (data.balance < totalPrice) {
                    return res.status(400).send({ status: false, msg: "You have not enough money in your wallet to buy these products" })
                }
            }).catch((err) => {
                return res.status(500).send({ status: false, msg: err.message })
            })

            const orderData = await orderModel.save({userId, products}); // createing order

            await this.createTransaction(walletId, orderData._id, totalPrice)  // debit paisa from his account
            let updateWallet = await walletModel.findByIdAndUpdate(walletId, { $inc: { balance: -(totalPrice) } }, { new: true }) // then update wallet
            let obj = {
                Balance: updateWallet.balance,
                Description: findProduct.description,
                type: 'Debit',
                orderId: orderData._id,
                CreatedAt: date.toLocaleString()
            }
            return res.status(201).send({ status: true, message: 'order successfully', Data: obj })
        } catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    },

    fetchAllOrderBySellerId: async (req, res) => {  // seller authorization yaha lagega
        try {
            let { userId } = req.params
            const findOrder = await orderModel.find({ 'products.productId.userId': userId })
                .populate('products.productId', 'name', 'price')
                .populate('userId', 'name'); // Include necessary fields from User model
            return res.status(200).send({ status: true, Data: findOrder })
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    },

    createTransaction: async (walletId, orderId, totalPrice) => {
        const transactionData = {
            walletId,
            orderId,
            amount: totalPrice.toFixed(4),
            type: 'debit',
            debitedAt: date.toLocaleString(),
        };
        let transaction = await transactionModel.create(req.body)

    }
}