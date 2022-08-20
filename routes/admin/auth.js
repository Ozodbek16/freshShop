const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/auth");

router.get(`/${process.env.admin_url}/login`, controller.login);

router.post("/admin/add", controller.createAdmin);

router.post(`/${process.env.admin_url}/login`, controller.loginPOST);

router.get(`/${process.env.admin_url}/logout`, controller.logout);

module.exports = router;
