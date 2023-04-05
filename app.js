const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("morgan");

const app = express();

// router
const bookRouter = require("./app/api/v1/book/router");
const userRouter = require("./app/api/v1/user/router");
const authRouter = require("./app/api/v1/auth/router");

const v1 = "/api/v1";

const notFoundMiddleware = require("./app/middleware/not-found");
const handleErrorMiddleware = require("./app/middleware/handler-error");

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
}); 

app.use(v1, bookRouter);
app.use(v1, userRouter);
app.use(v1, authRouter);

app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

module.exports = app;
