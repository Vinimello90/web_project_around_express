const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find()
    .then((cards) => res.send(cards))
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({ name, link, owner: _id })
    .then((card) => res.send(card))
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

module.exports.removeCard = (req, res) => {
  const { id } = req.params;
  console.log(id);
  Card.findByIdAndDelete(id)
    .then(() => res.send({ message: 'Card successfully deleted' }))
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};
