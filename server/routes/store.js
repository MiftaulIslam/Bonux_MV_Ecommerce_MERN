
const express = require('express');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const storeSchema = require('../models/storeSchema');
const {isAuthenticated} = require('../middlewares/index')
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

router.put('/update-media/:id',isAuthenticated,upload.single('media'), catchAsyncErrors(async (req, res, next)=>{
    try{

        const {id} = req.params
        const {type} = req.query;
        if(!req.file)return next(new ErrorHandler('400', 'Invalid file format'))
    
        const base64Image = req.file.buffer.toString('base64');
        let updatedObject = {}
        if (type === 'banner') {
            updatedObject['media.banner'] = base64Image;
        } else if (type === 'logo') {
            updatedObject['media.logo'] = base64Image;
        } else {
            return next(new ErrorHandler('Invalid media type. Must be "cover" or "logo".', 400));
        }
        console.log(type)
        const store = await storeSchema.findByIdAndUpdate(id, updatedObject,{new:true});
    
        if(!store) return next(new ErrorHandler('Store not found', 404))
        
            res.json({
                success: true,
                message: `${type} photo updated successfully`,
                data: store
            })
    } catch(e){
        next(new ErrorHandler('Internal Server Error', 500))
    }
}))
router.put('/update-info/:id',isAuthenticated,upload.none(), catchAsyncErrors(async (req, res, next)=>{
  
    const { id } = req.params;
  
    // Destructure the request body
    const { name, description, opening_hours, closing_hours, shop_status, address, region, city, zone } = req.body;
  
    // Construct the updated data
    const updatedData = {
      name,
      description,
      opening_hours,
      closing_hours,
      shop_status,
      address: {
        address,
        region,
        city,
        zone,
      },
    };
  console.log(req.body)
    try {
      const store = await storeSchema.findByIdAndUpdate(id, updatedData, { new: true });
      if (!store) {
        return next(new ErrorHandler(404, 'Store not found'))
      }
      return res.status(200).json({ success:true,message: 'Store updated successfully', data:store });
    } catch (err) {
        console.log(err)
      return next(new ErrorHandler(500, 'Internal Server Error'))
    }
}))




module.exports = router;