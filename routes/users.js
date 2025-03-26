const router = require('express').Router();
const fsPromises = require('fs').promises;
const path = require('path');

const USERS_PATH = path.join(__dirname, '../data/users.json');

router.get('/users', async (req, res) => {
  try {
    const data = await fsPromises.readFile(USERS_PATH, { encoding: 'utf8' });
    res.send(JSON.parse(data));
  } catch (err) {
    res.status(500).send({ message: 'Ocorreu um erro no servidor' });
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const data = JSON.parse(
      await fsPromises.readFile(USERS_PATH, { encoding: 'utf8' }),
    );
    const userData = data.find((user) => user._id === req.params.id);
    if (!userData) {
      res.status(404).send({ message: 'ID do usuário não encontrado' });
      return;
    }
    res.send(userData);
  } catch (err) {
    res.status(500).send({ message: 'Ocorreu um erro no servidor' });
    console.error(err);
  }
});

module.exports = router;
