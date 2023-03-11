const Joi = require('joi');

module.exports = {
  idSchema: Joi.number().integer().min(1).required(),
};
