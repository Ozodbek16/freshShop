const express = require("express");
const shop = require("../../controller/client/shop/shop");
const router = express.Router();

router.get("/", shop.shop);
router.get("/shop-detail", shop.shopDetail);
router.get("/cart", shop.cart);

module.exports = router;
