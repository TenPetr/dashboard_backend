const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
var randToken = require("rand-token");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, maxlength: 255 },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    maxlength: 255
  },
  password: { type: String, required: true, minlength: 8, maxlength: 1024 },
  refreshToken: { type: String }
});

// Generuje JWT, do payloadu se přidává random string
userSchema.methods.generateToken = function() {
  return jwt.sign(
    { _id: this._id, username: this.username },
    config.get("jwtPrivateKey"),
    { expiresIn: 5 }
  );
};

// Generuje random token (RF-T)
userSchema.methods.generateRefreshToken = function() {
  return randToken.uid(64);
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
