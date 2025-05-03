const Card = require('../models/card');
const NotFoundError = require('../utils/errors/NotFoundError');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find().orFail(() => {
      throw NotFoundError('No cards found.');
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
    const { _id: userId } = req.user;
    const card = await Card.findById(cardId).orFail(() => {
      throw new NotFoundError('No card found with the provided ID.');
    });
    if (card.owner.toString() !== userId) {
      throw new UnauthorizedError('User not authorized to delete this card.');
    }
    await card.deleteOne();
    res.send('Card has been removed');
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
      throw new NotFoundError('No card found with the provided ID.');
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
      throw new NotFoundError('No card found with the provided ID.');
    });
    res.send(updatedCard);
  } catch (err) {
    next(err);
  }
};
