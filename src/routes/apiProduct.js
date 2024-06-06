const {productAdd, productUpdate, listProducts, getProductById, deleteProductById} = require('../controllers/productControllers')
const router = require('express').Router();
const { uploadProducts } = require('../middleware/uploadImage');

/* /api/Products */

router
    .get('/productList', listProducts)
    .get('/productId/:id', getProductById)
    .put('/productEdit/:id', productUpdate)
    .post('/productAdd', uploadProducts.single("image"), productAdd)
    .delete('/productDelete/:id', deleteProductById)

module.exports = router