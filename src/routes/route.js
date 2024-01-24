const express = require("express")
const router = express.Router()

const { createUser, login, fetchSeller, fetchSellerById, updateUser } = require('../controllers/userController')
const { authentication, authorization, sellerAuthorization } = require('../middlewares/auth')
const { createCatalog, getAllCatalogsOfSeller, getCatalogBySellerId, updateCatalog, deleteCatalogById } = require("../controllers/catalogController")
const { createProductUnderACatalog, fetchProductBySearch, getProductBySellerId, updateProduct } = require("../controllers/productController")
const { setUpWallet, walletDetails, creditToWallet, transactionDetails } = require("../controllers/walletController")
const { createOrder, fetchAllOrderBySellerId } = require("../controllers/orderController")

router.post('/createUser', createUser)
router.post('/login', login)
router.get('/fetchSeller/:page', fetchSeller)
router.get('/fetchSellerById/:userId', authentication, fetchSellerById)
router.put('/updateUser/:userId', authentication, authorization, updateUser)

router.post('/createCatalog', authentication, createCatalog)
router.get('/getAllCatalogsOfSeller/:userId', authentication, getAllCatalogsOfSeller)
router.get('/getCatalogBySellerId/:userId/:catalogId', authentication, getCatalogBySellerId)
router.put('/user/:userId/updateCatalog/:catalogId', authentication, authorization, sellerAuthorization, updateCatalog)
router.delete('/user/:userId/deleteCatalogById/:catalogId', authentication, authorization, sellerAuthorization, deleteCatalogById)

router.post('/user/:userId/createProductUnderACatalog/:catalogId', authentication, authorization, sellerAuthorization, createProductUnderACatalog)
router.get('/fetchProductBySearch/:search', authentication, fetchProductBySearch)
router.get('/getAllProductsOfSeller/:userId', authentication, getAllCatalogsOfSeller)
router.get('/getProductBySellerId/:userId/:productId', authentication, getProductBySellerId)
router.put('/user/:userId/updateProduct/:productId', authentication, authorization, sellerAuthorization, updateProduct)
router.delete('/user/:userId/deleteProductById/:productId', authentication, authorization, sellerAuthorization, deleteCatalogById)

router.post('/setUpWallet', authentication, setUpWallet)
router.post('/walletDetails/:walletId', authentication, walletDetails)
router.get('/creditToWallet/:walletId', authentication, creditToWallet)
router.get('/transactionDetails/:walletId', authentication, transactionDetails)

router.post('/user/:userId/createOrder/:walletId', authentication, createOrder)
router.get('/fetchAllOrderBySellerId/:userId', authentication, authorization, sellerAuthorization, fetchAllOrderBySellerId)


router.all("/*", function (req, res) {
    return res.status(400).send({ status: false, message: "invalid http request" });
});

module.exports = router