const { Schema, model } = require("mongoose");

module.exports = model(
  "admin",
  new Schema({
    username: {
      type: String,
    },
    password: {
      type: String,
    },
  })
);
