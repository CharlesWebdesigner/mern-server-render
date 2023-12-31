const express=require('express');
const userCtrl=require('../controllers/userController')
const authCtrl=require('../controllers/authController')
const router=express.Router()

router.route('/users')
  .get(userCtrl.list)
 .post(userCtrl.create)

router.route('/api/users/:userId')
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

router.param('userId', userCtrl.userById)

module.exports=router;