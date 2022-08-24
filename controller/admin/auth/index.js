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
      return;
    }

    if (admin.username !== req.body.username || req.body.username == "") {
      req.flash("error", "Username or password incorrect");
      res.redirect("back");
      return;
    }

    const pass = await bcrypt.compare(req.body.password, admin.password);

    if (!pass || req.body.password == "") {
      req.flash("error", "Username or password incorrect");
      res.redirect("back");
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
