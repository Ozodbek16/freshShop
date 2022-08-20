const model = require("../../../model/admin");
const bcrypt = require("bcrypt");

module.exports = {
  login: async (req, res) => {
    res.render("login", {
      title: `Login for ${process.env.admin_url}`,
      layout: "space",
      login: process.env.admin_url,
      error: req.flash("error"),
    });
  },
  createAdmin: async (req, res) => {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const newAdmin = new model(req.body);
    await newAdmin.save();
    res.send("Qo'shilding bratishka");
  },
  loginPOST: async (req, res) => {
    const admin = await model.findOne({ username: req.body.username });
    if (!admin) {
      req.flash("error", "Username or password incorrect");
      res.redirect("back");
      console.log("ushladi 1");
      return;
    }

    if (admin.username !== req.body.username) {
      req.flash("error", "Username or password incorrect");
      res.redirect("back");
      console.log("ushladi 2", admin.username + req.body.username);
      return;
    }

    const pass = bcrypt.compare(admin.password, req.body.password);
    if (!pass) {
      req.flash("error", "Username or password incorrect");
      res.redirect("back");
      console.log("ushladi 3");
      return;
    }

    req.session.authen = true;
    req.session.admin = admin;
    res.redirect(`/${process.env.admin_url}`);
  },
  logout: async (req, res) => {
    await req.session.destroy();
    res.redirect("/");
  },
};
