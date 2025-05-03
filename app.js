const express = require('express');
const mongoose = require('mongoose');
const auth = require('./middlewares/auth');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const errorHandler = require('./middlewares/errorHandler');
const { login, createUser } = require('./controllers/auth');

mongoose
  .connect('mongodb://localhost:27017/aroundb')
  .catch(() => console.error('Failed to connect to MongoDB'));

const db = mongoose.connection;

db.on('open', () => console.log('MongoDB connection established'));

const app = express();

const { PORT = 3000 } = process.env;

app.use(express.json());
app.use('/signin', login);
app.use('/signup', createUser);
app.use(auth);
app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'The request was not found' });
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
