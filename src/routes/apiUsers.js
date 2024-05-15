var express = require('express');
const { getUsers, getUserById, updateUser } = require('../controllers/usersControllers');
var router = express.Router();

/* GET users listing. */
router
.get('/usersList', getUsers)
.get('/users/:id', getUserById)
.put('/users/:id', updateUser)

module.exports = router;
