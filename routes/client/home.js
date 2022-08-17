const express = require("express");
const home = require("../../controller/client/home");
const router = express.Router();

router.get("/", home.home);

module.exports = router;