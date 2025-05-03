const UnauthorizedError = require('../utils/UnauthorizedError');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Authorization required');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'chave secreta');
  } catch (err) {
    next(err);
  }
  req.user = payload;
  next();
};
