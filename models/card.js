const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (url) => Promise.reject(/^(https?:\/\/|w{3}\.)([\w-]+\.)+([\w]{2,})(\/[\w._~:/?%#[\]@!$&'()*+,;=-]*)?$/.test(url)),
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

module.exports = mongoose.model('card', cardSchema);
