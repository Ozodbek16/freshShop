const express = require("express");
const home = require("../../controller/client/home");
const router = express.Router();

router.get("/", home.home);

router.get("/about", home.about);

router.get("/gallery", home.gallery);

router.get("/contact-us", home.contactUs);

router.post("/user/mail", home.email);

module.exports = router;
