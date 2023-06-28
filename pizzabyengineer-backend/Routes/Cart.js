const express = require("express");
const router = express.Router();

const cartController = require('../Controller/Cart/index');

router.post('/addtocart',[],cartController.addtoCart)
router.post('/getcart',[],cartController.getCart)
router.delete('/deleteItem/:id',[],cartController.deleteItem)
router.get('/deletecart',[],cartController.deleteCart)

module.exports = router;