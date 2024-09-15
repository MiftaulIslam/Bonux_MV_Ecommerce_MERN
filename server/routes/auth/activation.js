const express = require('express');
const ErrorHandler = require('../../utiles/ErrorHandler')
const catchAsync = require('../../middlewares/catchAsyncErrors');
const userScheme = require('../../models/userScheme');
const {ActiveAccount, requestActivation, } = require('../../controllers/index')
const router = express.Router();


//Request Activation
router.post('/activate/request', catchAsync(requestActivation))
//Active Account
router.post('/activate/:token', catchAsync(ActiveAccount))
module.exports = router;