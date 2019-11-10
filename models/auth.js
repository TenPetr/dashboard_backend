const Joi = require("joi");

function validate(user) {
  const schema = {
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

exports.validate = validate;
