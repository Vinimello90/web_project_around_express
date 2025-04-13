const router = require('express').Router();
const { getCards, createCard, removeCard } = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:id', removeCard);

module.exports = router;
