const { typeUser, getUserTypes } = require('../controllers/typeUserControllers');
const router = require('express').Router();

/* /api/apiTypeUser */

router
.get('/userTypes-list', getUserTypes)
.post('/user-types', typeUser)

module.exports = router