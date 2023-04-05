const jwt = require("jsonwebtoken");
const { jwtExpiration, jwtSecret } = require("../../config");

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiration });
  return token;
};

const verifyJWT = ({ token }) => {
  const decoded = jwt.verify(token, jwtSecret);
  return decoded;
}

module.exports = {
  createJWT,
  verifyJWT,
};
