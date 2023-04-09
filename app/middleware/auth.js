const { UnauthenticatedError } = require("../error");
const { verifyJWT } = require("../utils");

const authenticateUser = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;

    if (!authToken) {
      throw new UnauthenticatedError("Unauthenticated");
    }

    if (!authToken.startsWith("Bearer ")) {
      throw new UnauthenticatedError("Invalid token");
    }

    const token = authToken.split(" ")[1];

    const payload = await verifyJWT({ token });

    console.log(req);

    req.user = {
      email: payload.email,
      name: payload.name,
      balance: payload.balance,
      id: payload.id,
    };

    next();
  } catch (error) {
    next(new UnauthenticatedError(error.message));
  }
};

module.exports = {
  authenticateUser,
};
