const User = require("../../api/v1/user/model");
const { BadRequestError, NotFoundError } = require("../../error");

const getAllUser = async () => {
  const result = await User.find();

  console.log(result);

  return result;
};

const getOneUser = async (req) => {
  const { id } = req.params;
  const result = await User.findOne({ _id: id });

  if (!result) {
    throw new NotFoundError("User not found");
  }

  return result;
};

const createUser = async (req, session) => {
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

const updateUser = async (req, session) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  const check = await User.findOne({ _id: id });

  if (!check) {
    throw new NotFoundError(`User with id '${id}' not found`);
  }

  // check if email is already exist
  const duplicate = await User.find({ email, _id: { $ne: id } });

  if (duplicate) {
    throw new BadRequestError("User already exist");
  }

  const result = await User.findOneAndUpdate(
    { _id: id },
    { name, email, password },
    { session, runValidators: true, new: true }
  );

  return result;
};

const deleteUser = async (req, session) => {
  const { id } = req.params;

  const result = await User.findOne({ _id: id });

  if (!result) {
    throw new NotFoundError(`User with id '${id}' not found`);
  }

  await result.remove({ session });

  return result;
};

module.exports = {
  getAllUser,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
}