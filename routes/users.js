var express = require('express');
var router = express.Router();
const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const mongoose=require('mongoose')

const MyROutingFunction = require('../controller/controller')

router.post('/signup', MyROutingFunction.SignUpFunction)
router.post('/signin', MyROutingFunction.SigninFunction)
router.patch('/update/:id', MyROutingFunction.UpdateUser)
router.delete('/delete/:id',MyROutingFunction.DeleteUser)
module.exports = router;
