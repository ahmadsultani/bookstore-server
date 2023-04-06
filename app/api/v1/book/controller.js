const mongoose = require("mongoose");
const {
  createBook,
  getOneBook,
  getAllBook,
  updateBook,
  deleteBook,
} = require("../../../service/mongoose/book");

const index = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    const result = await getAllBook(session);

    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const result = await getOneBook(req);

    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();

    const result = await createBook(req, session);

    await getAllBook();

    res.status(201).json({ data: result });

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    await session.endSession();
  }
};

const update = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const result = await updateBook(req, session);

    res.status(200).json({ data: result });

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    await session.endSession();
  }
};

const destroy = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const result = await deleteBook(req, session);

    res.status(200).json({ data: result });

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    await session.endSession();
  }
};

module.exports = {
  index,
  getOne,
  create,
  update,
  destroy,
};
