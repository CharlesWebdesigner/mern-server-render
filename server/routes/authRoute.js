const express=require('express')
const authCtrl=require('../controllers/authController')
const router=express.Router()
// router.post('/auth/signin',authCtrl.signUp)
router.route('/auth/signin').post(authCtrl.signin)
router.route('/auth/signout').get(authCtrl.signout)
module.exports=router;