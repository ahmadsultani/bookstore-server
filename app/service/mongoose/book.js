const Book = require("../../api/v1/book/model");
const { BadRequestError, NotFoundError } = require("../../error");

const getAllBook = async (req) => {

  const result = await Book.find();

  console.log(result)

  return result;
};

const getOneBook = async (req) => {
  console.log(req.user)
  const { id } = req.params;
  const result = await Book.findOne({ _id: id });

  if (!result) {
    throw new NotFoundError("Book not found");
  }

  return result;
};

const createBook = async (req, session) => {
  console.log(req.user)
  const { title, author, qty, price } = req.body;

  const duplicate = await Book.findOne({ title, author });

  if (duplicate) {
    throw new BadRequestError("Book already exist");
  }

  const result = await Book.create([{ title, author, qty, price }], {
    session,
  });

  return result;
};

const updateBook = async (req, session) => {
  const { id } = req.params;
  const { title, author, qty, price } = req.body;

  // checking book exist or not
  await getOneBook(req);

  // check if title and author is already exist
  const duplicate = await Book.findOne({ title, author, _id: { $ne: id } });

  if (duplicate) {
    throw new BadRequestError("Book already exist");
  }

  const result = await Book.findOneAndUpdate(
    { _id: id },
    { title, author, qty, price },
    { session, runValidators: true, new: true }
  );

  return result;
};

const deleteBook = async (req, session) => {
  const { id } = req.params;

  const result = await Book.findOne({ _id: id });

  if (!result) {
    throw new NotFoundError(`Book with id '${id}' not found`);
  }

  await result.remove({ session });

  return result;
};

module.exports = {
  getAllBook,
  getOneBook,
  createBook,
  updateBook,
  deleteBook,
};
