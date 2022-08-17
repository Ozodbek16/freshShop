const express = require("express");
const home = require("../../controller/client/home");
const router = express.Router();

router.get("/", home.home);

router.get("/about", home.about);

module.exports = router;
