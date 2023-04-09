const { StatusCodes } = require("http-status-codes");

const handleErrorMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong",
  };

  if (err.name === "ValidationError") {
    customError = {
      message: Object.values(err.errors)
        .map((val) => val.message)
        .join(", "),
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  if (err.code && err.code === 11000) {
    customError = {
      message: "Duplicate field value entered",
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  if (err.name === "CastError") {
    customError = {
      message: `Resource not found: ${err.value}`,
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  return res.status(customError.statusCode).json({
    message: customError.message,
    statusCode: customError.statusCode,
  });
};

module.exports = handleErrorMiddleware;
