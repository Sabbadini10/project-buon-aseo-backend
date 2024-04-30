const { registerUser, loginUser, passwordRecover, tokenRecover, resetPassword } = require('../controllers/authControllers');
const router = require('express').Router();
/* const authLogin = require('../../validators/api/loginAuth')
const authRegister = require('../../validators/api/registerAuth') */
/* const checkAdminToken = require('../../middlewares/api/checkAdminToken') */

/* /api/apiAuth */

router
    .post('/signup', registerUser ) /* authLogin */
    .post('/signin', loginUser) /* authRegister */
    .post('/recover', passwordRecover)
    .get('/reset/:token', tokenRecover)
    .post('/reset/:token', resetPassword)
     .post('/changePassword', resetPassword)
   /*  .post('/verify-name', verifyName)  */

module.exports = router