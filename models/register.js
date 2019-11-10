const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, maxlength: 255 },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    maxlength: 255
  },
  password: { type: String, required: true, minlength: 8, maxlength: 1024 }
});

userSchema.methods.generateToken = function() {
  return jwt.sign(
    { _id: this._id, username: this.username },
    config.get("jwtPrivateKey")
  );
};

const User = mongoose.model("User", userSchema);

function validate(user) {
  const schema = {
    email: Joi.string()
      .required()
      .email()
      .min(1)
      .max(255),
    username: Joi.string()
      .required()
      .min(1)
      .max(50),
    password: Joi.string()
      .required()
      .min(8)
      .max(255)
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validate;
