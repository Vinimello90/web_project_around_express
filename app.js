const express = require('express');
const path = require('path');
const fsPromises = require('fs').promises;

const app = express();

const { PORT = 3000 } = process.env;

const USERS_PATH = path.join(__dirname, './data/users.json');
const CARDS_PATH = path.join(__dirname, './data/cards.json');

app.get('/', (req, res) => {
  res.status(404).res({ message: 'Ocorreu um erro ao buscar os dados' });
});

app.get('/users', async (req, res) => {
  try {
    const data = await fsPromises.readFile(USERS_PATH, { encoding: 'utf8' });
    res.send(JSON.parse(data));
  } catch (err) {
    res.status(500).send({ message: 'Ocorreu um erro ao buscar os dados' });
  }
});

app.get('/users/:id', async (req, res) => {
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
    res.status(500).send({ message: 'Ocorreu um erro ao buscar os dados' });
  }
});

app.get('/cards', async (req, res) => {
  try {
    const data = await fsPromises.readFile(CARDS_PATH, { encoding: 'utf8' });
    res.send(JSON.parse(data));
  } catch (err) {
    res.status(500).send({ message: 'Ocorreu um erro ao buscar os dados' });
  }
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
