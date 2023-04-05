const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: process.env.PORT,
  dbUrl: process.env.MONGODB_URL,
  jwtExpiration: '24h',
  jwtSecret: process.env.JWT_SECRET,
};
