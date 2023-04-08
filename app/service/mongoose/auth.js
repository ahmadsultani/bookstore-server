const User = require("../../api/v1/user/model");
const { BadRequestError, UnauthorizedError } = require("../../error");
const { createTokenUser, createJWT } = require("../../utils");

const signinUser = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Email and password is required");
  }

  if (!email.includes("@")) {
    throw new BadRequestError("Invalid email");
  }

  const result = await User.findOne({ email });

  if (!result) {
    throw new UnauthorizedError("Invalid credentials");
  }

  const isCorrectPassword = await result.comparePassword(password);

  if (!isCorrectPassword) {
    throw new UnauthorizedError("Invalid credentials");
  }

  const token = createJWT({ payload: createTokenUser(result) });

  req.user = {
    id: result._id,
    name: result.name,
    email: result.email,
    balance: result.balance,
  };

  console.log(req.user);

  return token;
};

const signupUser = async (req, session) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError("Password not match");
  }

  const duplicate = await User.findOne({ email });

  if (duplicate) {
    throw new BadRequestError("User already exist");
  }

  const result = await User.create([{ name, email, password }], { session });

  return result;
};

module.exports = {
  signinUser,
  signupUser,
};
