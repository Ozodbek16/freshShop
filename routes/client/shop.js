const express = require("express");
const shop = require("../../controller/client/shop/shop");
const router = express.Router();

router.get("/", shop.shop);
router.get("/shop-detail", shop.shopDetail);
router.get("/cart", shop.cart);
router.get("/checkout", shop.checkout);
router.get("/my-account", shop.myAccount);
router.get("/wishlist", shop.wishlist);

module.exports = router;
