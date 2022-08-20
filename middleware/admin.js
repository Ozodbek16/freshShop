const admin = require("../model/admin");

module.exports = async (req, res, next) => {
  if (!req.session.authen) {
    res.redirect(`${process.env.admin_url}/login`);
    return;
  }
  next();
};
