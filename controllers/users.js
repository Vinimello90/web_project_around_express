const User = require('../models/user');

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().orFail(() => {
      const error = new Error('No users found.');
      error.statusCode = 404;
      throw error;
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
      const error = new Error('No user found with the provided ID.');
      error.statusCode = 404;
      throw error;
    });
    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const { name, about, avatar } = req.body;
    const newUser = await User.create({ name, about, avatar });
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
      const error = new Error('No user found with the provided ID.');
      error.statusCode = 404;
      throw error;
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
    );
    res.send(updatedUser);
  } catch (err) {
    next(err);
  }
};
