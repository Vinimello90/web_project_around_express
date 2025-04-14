module.exports = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const errorMessage = Object.values(err.errors).map((e) => e.message);
    res.status(400).send({ message: `${errorMessage}` });
    return;
  }
  if (err.name === 'CastError') {
    res.status(400).send({ message: 'The provided ID is invalid.' });
    return;
  }
  if (err.statusCode === 404) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  }
  res.status(500).send({ error: 'Internal Server Error.' });
};
