const express = require('express');
const router = express.Router();
const multer  = require('multer');
const controller = require("../../controllers/admin/setting.controller");
const uploadCloudMiddleware = require("../../middlewares/admin/upLoadCloud.middleware");

const upload = multer();

router.get('/general',  controller.general);

router.patch('/general',
    upload.single('logo'),
    uploadCloudMiddleware.upload,
    controller.generalPatch);

module.exports = router