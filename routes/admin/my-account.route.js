const express = require('express');
const router = express.Router();
const multer  = require('multer');
const uploadCloudMiddleware = require("../../middlewares/admin/upLoadCloud.middleware");
const controller = require("../../controllers/admin/my-account.controller");
const upload = multer();
router.get('/',  controller.index);

router.get('/edit',  controller.edit);

router.patch('/edit', 
upload.single('thumbnail'),
uploadCloudMiddleware.upload,
controller.editPatch);

module.exports = router