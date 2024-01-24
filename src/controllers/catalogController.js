const catalogModel = require('../models/catalogModel')
const jwt = require('jsonwebtoken')
const productModel = require('../models/productModel')
const date = new Date()

module.exports = {
    createCatalog: async (req, res) => {
        try {
            req.body.userId = req.decodedToken.userId
            let uniqueData = await catalogModel.findOne(req.body.item)
            if (uniqueData) {
                return res.status(409).send({ status: false, msg: "Item is already exsit...please try different item" })
            }
            let saveData = await catalogModel.create(req.body)
            return res.status(201).send({ status: true, msg: "Item created successfully", Data: saveData })
        } catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    },

    getAllCatalogsOfSeller: async (req, res) => {
        try {
            let { userId } = req.params
            let findCatalog = await catalogModel.find({userId: userId}).populate('User', {name: 1})
            if (!findCatalog) {
                return res.status(404).send({ status: false, msg: "Catalog not found on this sellerId" })
            }
            return res.status(200).send({ status: true, Data: findCatalog })
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    },

    getCatalogBySellerId: async (req, res) => {
        try {
            let { userId, catalogId } = req.params
            let findCatalog = await catalogModel.findById({userId: userId, _id: catalogId}).select({ name: 1, __v: 0, _id: 0 })
            if (!findCatalog) {
                return res.status(404).send({ status: false, msg: "Catalog not found" })
            }
            return res.status(200).send({ status: true, Data: findCatalog })
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    },

    updateCatalog: async (req, res) => {
        try {
            let {userId, catalogId} = req.params
            let data = req.body
            if (Object.keys(data).length < 1) {
                return res.status(400).send({ status: false, message: "Please enter data whatever you want to update" })
            }
            let uniqueData = await catalogModel.findOne({userId, item: body.item})
            if (uniqueData) {
                return res.status(409).send({ status: false, msg: "Item is already exsit...please try different item" })
            }

            data['updatedAt'] = date.toLocaleString()
            let updateData = await catalogModel.findOneAndUpdate({userId, _id: catalogId}, data, { new: true })
            if (!updateData) {
                return res.status(404).send({ status: false, msg: "Catagory not found" })
            }
            return res.status(400).send({ status: false, Data: updateData })
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    },

    deleteCatalogById : async (req, res) => {
        try {
            let { userId, catalogId } = req.params
            let findCatalog = await catalogModel.findOneAndDelete({userId, _id: catalogId})
            if (!findCatalog) {
                return res.status(404).send({ status: false, msg: "Catalog not found" })
            }
            await productModel.deleteMany({userId, catalogId})
            return res.status(204).send({ status: true, msg: 'Catalog with all the products deleted successfully' })
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    },
}