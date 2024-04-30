const {getUserCart, updateCartItemQuantity, addToCart, removeFromCart} = require('../controllers/cartControllers')
const router = require('express').Router();

/* /api/Cart */

router
    /* .get('/cartList') */
    .get('/cartId/:id', getUserCart)
    .put('/cartEdit/:id', updateCartItemQuantity)
    .post('/cartAdd', addToCart)
    .delete('/cartDelete/:id', removeFromCart)

module.exports = router