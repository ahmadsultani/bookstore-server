const db = require("../../../db");
const { signinUser, signupUser } = require("../../../service/mongoose/auth");
const { StatusCodes } = require("http-status-codes");

const login = async (req, res, next) => {
  try {
    const result = await signinUser(req);

    res.status(StatusCodes.CREATED).json({ data: { token: result } });

    console.log("Logged In!");
  } catch (error) {
    next(error);
  }
};

const signup = async (req, res, next) => {
  const session = await db.startSession();
  try {
    await session.startTransaction();

    const result = await signupUser(req, session);

    await session.commitTransaction();

    res.status(StatusCodes.CREATED).json({ data: result });

    console.log("Signed Up!");
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    await session.endSession();
  }
};

module.exports = {
  login,
  signup,
};
