const catalogModel = require('../models/catalogModel')
const productModel = require('../models/productModel')
const date = new Date()

module.exports = {
    createProductUnderACatalog: async (req, res) => {
        try {
            let {userId, catalogId} = req.params
            let findData = await catalogModel.findOne({userId, catalogId})
            if (!findData) {
                return res.status(403).send({ status: true, msg: "Unauthorized seller" })
            }
            req.body.userId = userId, req.body.catalogId = catalogId
            let saveData = await productModel.create(req.body)
            return res.status(201).send({ status: true, msg: "Product created successfully", Data: saveData })
        } catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    },

    fetchProductBySearch : async (req, res) => {
        try {
            let search = ''
            if (req.params.search) {
                search = req.params.search
            }
            let findProduct = await productModel.find({name: {$regex: '.*'+search+'.*', $options: 'i' }, available: true}).select({available: 1, name: 1, price: 1, _id: 0})
            if (!findProduct[0]) {
                return res.status(404).send({ status: false, msg: "Product not found" })
            }
            return res.status(200).send({status: true, Data: findProduct})
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    },

    getAllProductsOfSeller: async (req, res) => {
        try {
            let { userId } = req.params
            let findProduct = await productModel.find({userId: userId, available: true}).populate('User', {name: 1})
            if (!findProduct) {
                return res.status(404).send({ status: false, msg: "Product not found on this sellerId" })
            }
            return res.status(200).send({ status: true, Data: findProduct })
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    },

    getProductBySellerId: async (req, res) => {
        try {
            let { userId, productId } = req.params
            let findProduct = await productModel.findById({userId: userId, _id: productId}).select({ __v: 0, _id: 0 })
            if (!findProduct) {
                return res.status(404).send({ status: false, msg: "Product not found" })
            }
            return res.status(200).send({ status: true, Data: findProduct })
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    },

    updateProduct: async (req, res) => {
        try {
            let {userId, productId} = req.params
            let data = req.body
            if (Object.keys(data).length < 1) {
                return res.status(400).send({ status: false, message: "Please enter data whatever you want to update" })
            }
            data['updatedAt'] = date.toLocaleString()
            let updateData = await productModel.findOneAndUpdate({userId, _id: productId}, data, { new: true })
            if (!updateData) {
                return res.status(404).send({ status: false, msg: "Product not found" })
            }
            return res.status(400).send({ status: false, Data: updateData })
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    },

    deleteProductById : async (req, res) => {
        try {
            let { userId, productId } = req.params
            let findProduct = await productModel.findOneAndDelete({userId: userId, _id: productId})
            if (!findProduct) {
                return res.status(404).send({ status: false, msg: "Product not found" })
            }
            return res.status(204).send({ status: true, msg: 'Product deleted successfully' })
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    }
}