const router = require('express').Router();
const fsPromises = require('fs').promises;
const path = require('path');

const CARDS_PATH = path.join(__dirname, '../data/cards.json');

router.get('/cards', async (req, res) => {
  try {
    const data = await fsPromises.readFile(CARDS_PATH, { encoding: 'utf8' });
    res.send(JSON.parse(data));
  } catch (err) {
    res.status(500).send({ message: 'Ocorreu um erro no servidor' });
  }
});

module.exports = router;
