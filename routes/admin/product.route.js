const express = require('express');
const router = express.Router();
const controller = require("../../controllers/admin/products.controller");
const multer  = require('multer');
const uploadCloudMiddleware = require("../../middlewares/admin/upLoadCloud.middleware");

const  validates = require("../../validates/admin/createPost.validates");

// const storageMulterHelper = require("../../helpers/storageMulter");
// const storage = storageMulterHelper();

const upload = multer();


router.get('/',  controller.index);

router.patch('/change-status/:status/:id',  controller.changeStatus);

router.patch('/change-multi',  controller.changeMulti);

router.delete('/delete/:id',  controller.DeleteItem);

router.get('/create',  controller.create);

router.post('/create',upload.single('thumbnail'),
uploadCloudMiddleware.upload,
validates.createPost,  controller.createPost);

router.get('/edit/:id',  controller.edit);

router.patch('/edit/:id',upload.single('thumbnail'),
uploadCloudMiddleware.upload,
validates.createPost, controller.editPatch);

router.get('/detail/:id',  controller.detail);

module.exports = router