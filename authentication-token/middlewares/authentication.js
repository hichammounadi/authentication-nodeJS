const CustomError = require('../shared-services/errors');
const jwt = require('jsonwebtoken');

const authenticateUser = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new CustomError.UnauthenticatedError('You are not authorized');
  }

  const token = authorization.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userId: payload.userId,
      userName: payload.userName
    }
    next();
  } catch (error) {
    console.log('Something went wrong');
  }
};

module.exports = authenticateUser;
