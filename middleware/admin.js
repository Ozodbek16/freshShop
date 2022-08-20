const { default: admin } = require("../model/admin");

module.exports = (req, res, next) => {
  if (!req.session.authen) {
    res.redirect(`${process.env.admin_url}/login`);
    return;
  }
  res.locals.admin = (admin.find())[0];
  next();
};
