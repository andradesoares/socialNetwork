const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    const token = authHeader.replace('Bearer ', '');

    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        return user;
      } catch (error) {
        throw new AuthenticationError('Invalid/Expired token');
      }
    }

    throw new Error('Authentication token must be valid');
  }

  throw new Error('Authorization header must be provided');
};
