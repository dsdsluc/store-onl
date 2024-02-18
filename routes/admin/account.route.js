const express = require('express');
const router = express.Router();
const controller = require("../../controllers/admin/accounts.controller");
const multer  = require('multer');



const uploadCloudMiddleware = require("../../middlewares/admin/upLoadCloud.middleware");
const upload = multer();

router.get('/',  controller.index);

router.get('/create',  controller.create);

router.post('/create',  
upload.single('avatar'),
uploadCloudMiddleware.upload,
controller.createPost);


module.exports = router