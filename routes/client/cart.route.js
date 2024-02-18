const express = require('express');
const router = express.Router();
const controller = require("../../controllers/client/cart.controller");

router.get('/', controller.index);

router.get('/delete/:productId', controller.delete);

router.post('/add/:idProduct', controller.addPost);

router.get('/update/:productId/:quantity', controller.updateOne);

module.exports = router