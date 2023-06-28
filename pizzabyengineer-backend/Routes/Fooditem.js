const express = require("express");
const router = express.Router();

const itemController = require("../Controller/Item/index");

router.get("/", [], itemController.getCategoryItems);
router.post("/", [], itemController.createItem);
router.get("/all", [], itemController.getAllItems);

module.exports = router;
