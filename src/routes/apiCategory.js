const {categoryAdd, categoryUpdate, categoryList, categoryListId, categoryDelete} = require('../controllers/categoryControllers')
const router = require('express').Router();

/* /api/Products */

router
    .get('/categoryList', categoryList)
    .get('/categoryId/:id', categoryListId)
    .put('/categoryEdit/:id', categoryUpdate)
    .post('/categoryAdd', categoryAdd)
    .delete('/categoryDelete/:id', categoryDelete)

module.exports = router