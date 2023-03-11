const { idSchema } = require('./schemas');

module.exports = (id) =>
  (idSchema.validate(id).error
    ? { type: 'INPUT_ID', message: '"id" must be a number' }
    : { type: null, message: 'OK' });
