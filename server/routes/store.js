
const express = require('express');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const storeSchema = require('../models/storeSchema');
const { ErrorHandler, upload } = require('../utiles');
const router = express.Router();

router.get('/:id', catchAsyncErrors(async (req, res, next)=>{
const {id}= req.params
const store = await storeSchema.findById(id);
if(!store) return next(new ErrorHandler('Store not found', 404))

    res.status(200).json({
        success: true,
        message: 'Store found',
        data: store
    })
}))
router.post('/create',upload.fields([{name:'logo'}, {name:'banner'}]), catchAsyncErrors(async (req, res, next)=>{
const {seller, name, description, logo, banner, address, region, city, zone, opening_hours, closing_hours, shop_status}= req.body

if(!seller || !name || !description || !opening_hours || !closing_hours) return next(new ErrorHandler('Missing information'))
     // Create a new store
const newStore = new storeSchema({
    seller,
    name,
    description,
    address:{
        address, region, city, zone
    },
    opening_hours,
    closing_hours,
    shop_status,
    created_at: Date.now()
});
if((req.files.logo || req.files.banner) && req.files){
    const base64Logo = req.files?.logo[0].buffer.toString('base64')
    const base64Banner = req.files?.banner[0].buffer.toString('base64')
    newStore.media.logo =base64Logo
    newStore.media.banner =base64Banner
}
const store = await newStore.save();

    res.status(200).json({
        success: true,
        message: 'Store found',
        data: store
    })
}))




module.exports = router;