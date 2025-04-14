const Card = require('../models/card');

module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find().orFail(() => {
      const error = new Error('No cards found.');
      error.statusCode = 404;
      throw error;
    });
    res.send(cards);
  } catch (err) {
    next(err);
  }
};

module.exports.createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const { _id: userId } = req.user;
    const newCard = await Card.create({ name, link, owner: userId });
    res.send(newCard);
  } catch (err) {
    next(err);
  }
};

module.exports.removeCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    await Card.findByIdAndDelete(cardId).orFail(() => {
      const error = new Error('No card found with the provided ID.');
      error.statusCode = 404;
      throw error;
    });
  } catch (err) {
    next(err);
  }
};

module.exports.likeCard = async (req, res, next) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).orFail(() => {
      const error = new Error('No card found with the provided ID.');
      error.statusCode = 404;
      throw error;
    });
    res.send(updatedCard);
  } catch (err) {
    next(err);
  }
};

module.exports.dislikeCard = async (req, res, next) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).orFail(() => {
      const error = new Error('No card found with the provided ID.');
      error.statusCode = 404;
      throw error;
    });
    res.send(updatedCard);
  } catch (err) {
    next(err);
  }
};
