const { idSchema, insertSchema } = require('./schemas');

const idValidate = (id) => {
  const { error } = idSchema.validate(id);
  return error
    ? { type: 'INPUT_ID', message: '"id" must be a number' }
    : { type: null, message: 'OK' };
};

const productValidate = (name) => {
  const { error } = insertSchema.validate({ name });

  if (error) {
    return {
      type: 'INVALID_PRODUCT_NAME',
      message: 'Product name must be at least 5 characters long',
    };
  }

  return { type: null, message: 'OK' };
};

module.exports = {
  idValidate,
  productValidate,
};
