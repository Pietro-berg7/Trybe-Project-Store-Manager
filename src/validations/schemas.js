const Joi = require('joi');

module.exports = {
  idSchema: Joi.number().integer().min(1).required(),
  insertSchema: Joi.string().min(5).required(),
};
