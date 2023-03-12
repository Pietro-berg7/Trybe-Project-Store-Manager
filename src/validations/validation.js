const { idSchema, insertSchema } = require('./schemas');

const idValidate = (id) => {
  const { error } = idSchema.validate(id);
  if (error) {
    return { type: 422, message: '"id" must be a number' };
  }
  return { type: null, message: 'OK' };
};

const productValidate = (name) => {
  const { error } = insertSchema.validate(name);
  if (error) {
    return {
      type: 422,
      message: '"name" length must be at least 5 characters long',
    };
  }
  return { type: null, message: 'OK' };
};

module.exports = {
  idValidate,
  productValidate,
};
