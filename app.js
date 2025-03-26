const express = require('express');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const app = express();

const { PORT = 3000 } = process.env;

app.use('/users', usersRoutes);

app.use('/cards', cardsRoutes);

app.get('*', (req, res) => {
  res.status(404).send({ message: 'A solicitação não foi encontrada' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
