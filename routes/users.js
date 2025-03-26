const router = require('express').Router();
const fsPromises = require('fs').promises;
const path = require('path');

const USERS_PATH = path.join(__dirname, '../data/users.json');

// Se eu importar com require o json, não vou precisar usar tbm o fs para ler o arquivo correto??
// usei o path e o fs porque foi um dos requerimentos do roteiro...
// levando isso em conta, eu mudo a importação ou mantém como fiz???

router.get('/', async (req, res) => {
  try {
    const data = JSON.parse(
      await fsPromises.readFile(USERS_PATH, { encoding: 'utf8' }),
    );
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: 'Ocorreu um erro no servidor' });
  }
});

router.get('/:id', async (req, res) => {
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
