const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../utils/errors/NotFoundError');
const UnauthorizedError = require('../utils/UnauthorizedError');

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().orFail(() => {
      throw new NotFoundError('No users found.');
    });
    res.send(users);
  } catch (err) {
    next(err);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).orFail(() => {
      throw new NotFoundError('No user found with the provided ID.');
    });
    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await User.findOne({ email }).orFail(() => {
      throw new UnauthorizedError('Email or password is incorrect.');
    });
  } catch (err) {}
};

module.exports.createUser = async (req, res, next) => {
  try {
    const { name, about, avatar, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });
    res.send(newUser);
  } catch (err) {
    next(err);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const { _id: userId } = req.user;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true },
    ).orFail(() => {
      throw new NotFoundError('No user found with the provided ID.');
    });
    res.send(updatedUser);
  } catch (err) {
    next(err);
  }
};

module.exports.updateAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const { _id: userId } = req.user;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    ).orFail(() => {
      throw new NotFoundError('No user found with the provided ID.');
    });
    res.send(updatedUser);
  } catch (err) {
    next(err);
  }
};
