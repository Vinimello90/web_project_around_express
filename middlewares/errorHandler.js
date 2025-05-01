const BAD_REQUEST = 400;
const INTERNAL_SERVER_ERROR = 500;

module.exports = (err, req, res, next) => {
  const { name, statusCode = 500, message } = err;
  if (name === 'ValidationError') {
    const errorMessage = Object.values(err.errors).map((e) => e.message);
    res.status(BAD_REQUEST).send({ message: `${errorMessage}` });
    return;
  }
  if (name === 'CastError') {
    res.status(BAD_REQUEST).send({ message: 'The provided ID is invalid.' });
    return;
  }

  res.status(statusCode).send({
    error:
      statusCode !== INTERNAL_SERVER_ERROR ? message : 'Internal Server Error.',
  });
};
