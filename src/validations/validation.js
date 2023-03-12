const { idSchema, insertSchema } = require('./schemas');

const idValidate = (id) => {
  const { error } = idSchema.validate(id);
  return error
    ? { type: 422, message: '"id" must be a number' }
    : { type: null, message: 'OK' };
};

const productValidate = (name) => {
  const { error } = insertSchema.validate(name);
  return error
    ? { type: 422, message: '"name" length must be at least 5 characters long' }
    : { type: null, message: 'OK' };
};

module.exports = {
  idValidate,
  productValidate,
};
