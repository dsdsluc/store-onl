const express = require('express');
const router = express.Router();
const controller = require("../../controllers/admin/products-category.controller");
const multer  = require('multer');
const uploadCloudMiddleware = require("../../middlewares/admin/upLoadCloud.middleware");

const upload = multer();

router.get('/',  controller.index);

router.get('/create',  controller.create);

router.post('/create', 
upload.single('thumbnail'),
uploadCloudMiddleware.upload,
controller.createPost);

router.get('/edit/:id',  controller.edit);

router.patch('/edit/:id',
upload.single('thumbnail'),
uploadCloudMiddleware.upload,
controller.editPatch);

module.exports = router