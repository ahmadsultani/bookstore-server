const db = require("../../../db");
const {
  getAllUser,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../../../service/mongoose/user");

const index = async (req, res, next) => {
  try {
    const result = await getAllUser();

    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const result = await getOneUser(req);

    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const session = await db.startSession();
  try {
    await session.startTransaction();

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
  const session = await db.startSession();
  try {
    await session.startTransaction();

    const result = await updateUser(req, session);

    res.status(200).json({ data: result });

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    next(error);
  }
};

const destroy = async (req, res, next) => {
  const session = await db.startSession();
  try {
    await session.startTransaction();

    const result = await deleteUser(req, session);

    res.status(200).json({ data: result });

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    next(error);
  }
};

module.exports = {
  index,
  getOne,
  create,
  update,
  destroy,
}