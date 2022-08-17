const express = require("express");
const router = express.Router();

router.use("/", require("./home"));
router.use("/shop", require("./shop"));

module.exports = router;
