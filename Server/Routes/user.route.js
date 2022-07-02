const express = require('express');
const userRouter = express.Router();
const userController = require('../Controller/user.controller')

userRouter.get('/', userController.item)
userRouter.post('/price', userController.qtyPrice)
module.exports = userRouter