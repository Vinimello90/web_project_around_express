const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

module.exports = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const errorMessage = Object.values(err.errors).map((e) => e.message);
    res.status(BAD_REQUEST).send({ message: `${errorMessage}` });
    return;
  }
  if (err.name === 'CastError') {
    res.status(BAD_REQUEST).send({ message: 'The provided ID is invalid.' });
    return;
  }
  if (err.statusCode === NOT_FOUND) {
    res.status(NOT_FOUND).send({ message: err.message });
    return;
  }
  res.status(INTERNAL_SERVER_ERROR).send({ error: 'Internal Server Error.' });
};
