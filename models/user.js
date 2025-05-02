const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const UnauthorizedError = require('../utils/UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (url) =>
        /^(https?:\/\/|w{3}\.)([\w-]+\.)+([\w]{2,})(\/[\w._~:/?%#[\]@!$&'()*+,;=-]*)?$/.test(
          url,
        ),
      message: '`link` value is not a valid URL',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

userSchema.statics.findUserByCredentials = async function findUserByCredencials(
  email,
  password,
) {
  const user = await this.findOne(email);
  if (!user) {
    throw new UnauthorizedError('Email or password is incorrect.');
  }
  const matched = bcrypt(password, user.password);
  if (!matched) {
    throw new UnauthorizedError('Email or password is incorrect.');
  }
  return user;
};

module.exports = mongoose.model('user', userSchema);
