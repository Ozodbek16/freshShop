const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/home/index");
router.get("/" , controller.home);
module.exports = router;
