const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find()
    .then((users) => res.send({ users }))
    .catch(() => {
      res.status(500).send({ message: 'Erro' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((users) => res.send(users))
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((users) => res.send(users))
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};
