var express = require('express');
const mongoose = require('mongoose')
const check_auth=require('../middleWare/check_auth')
///😑🤍💛multer
const multer=require('multer')
const storage=multer.diskStorage({
    destination:(req,file,calBackFunction)=>{
        calBackFunction(null,"./productimages/")
    },

    filename:(req,file,cb)=>{
        cb(null,new Date().toDateString() +file.originalname)

    }
});
const upload=multer({
   storage:storage,
   limits:{
      fileSize:1024*1024*5,
       
   }
})

var router = express.Router();
const injectionModel = require('../models/ProductSchema')

const ProductFunction=require('../controller/productController')





router.get('/getinjection',check_auth,ProductFunction.getinjectionNameOnly)

router.get('/:productID',check_auth,ProductFunction.getAllinjectionInfo)

router.post('/addProductInjection',upload.single('productphoto'),check_auth,ProductFunction.addProductInjection)

router.delete('/deleteinjection/:id',check_auth,ProductFunction.deleteinjection)

router.patch('/updateinjection/:id',upload.single('productphoto'),check_auth,ProductFunction.updateinjection)
    

module.exports=router