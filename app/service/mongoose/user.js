const User = require("../../api/v1/user/model");
const Book = require("../../api/v1/book/model");
const { BadRequestError, NotFoundError } = require("../../error");

const getAllUser = async (session) => {
  const result = await User.find().session(session);

  console.log(result);

  return result;
};

const getOneUser = async (req, session) => {
  const { id } = req.params;
  const result = await User.findOne({ _id: id }).session(session);

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

  const duplicate = await User.findOne({ email }).session(session);

  if (duplicate) {
    throw new BadRequestError("User already exist");
  }

  const result = await User.create([{ name, email, password }], { session });

  return result;
};

const updateUser = async (req, session) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  const check = await User.findOne({ _id: id }).session(session);

  if (!check) {
    throw new NotFoundError(`User with id '${id}' not found`);
  }

  // check if email is already exist
  const duplicate = await User.find({ email, _id: { $ne: id } }).session(
    session
  );

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

const checkoutUser = async (req, session) => {
  const { id } = req.user;
  const { totalBook, book_id } = req.body;

  const check = await User.findOne({ _id: id }).session(session);

  const targetBook = await Book.findOne({ _id: book_id }).session(session);

  console.log(targetBook)

  if (totalBook < 1) {
    throw new BadRequestError("Total book must be greater than 0");
  }

  if (targetBook.qty  < totalBook) {
    throw new BadRequestError("Stock is not enough");
  }

  const checkoutNominal = targetBook.price * totalBook;

  if (checkoutNominal < 1) {
    throw new BadRequestError("Checkout nominal must be greater than 0");
  }

  if (check.balance < checkoutNominal) {
    throw new BadRequestError("Balance is not enough");
  }

  const bookResult = await Book.updateOne(
    { _id: book_id },
    { $inc: { stock: -totalBook } },
  ).session(session);

  const userResult = await User.updateOne(
    { _id: id },
    { $inc: { balance: -checkoutNominal } },
  ).session(session);

  return { bookResult, userResult };
};

const topupUser = async (req, session) => {
  const { id } = req.user;
  const { nominal } = req.body;

  const result = await User.findOne({ _id: id }).session(session);

  if (nominal < 1) {
    throw new BadRequestError("Topup nominal must be greater than 0");
  }

  result.balance += nominal;

  await result.save({ session });

  return result;
};

const getProfileUser = async (req, session) => {
  const { id } = req.user;

  const result = await User.findOne({ _id: id }).session(session);

  if (!result) {
    throw new NotFoundError(`User with id '${id}' not found`);
  }

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
  topupUser,
  deleteUser,
  checkoutUser,
  getProfileUser,
};
