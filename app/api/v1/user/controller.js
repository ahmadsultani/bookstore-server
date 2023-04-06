const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");

const {
  getAllUser,
  getOneUser,
  createUser,
  updateUser,
  topupUser,
  checkoutUser,
  deleteUser,
} = require("../../../service/mongoose/user");

const index = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const result = await getAllUser(session);

    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const result = await getOneUser(req, session);

    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const result = await createUser(req, session);

    await session.commitTransaction();

    res.status(201).json({ data: result });
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

    const result = await updateUser(req, session);

    res.status(200).json({ data: result });

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    next(error);
  }
};

const destroy = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const result = await deleteUser(req, session);

    res.status(200).json({ data: result });

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    next(error);
  }
};

const topup = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const result = await topupUser(req, session);

    res.status(StatusCodes.ACCEPTED).json({ data: result });
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    await session.endSession();
  }
};

const checkout = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const result = await checkoutUser(req, session);

    res.status(StatusCodes.ACCEPTED).json({ data: result });
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
  topup,
  checkout,
};
