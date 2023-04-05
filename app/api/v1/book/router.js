const express = require("express");
const router = express.Router();
const { create, index, getOne, update, destroy } = require("./controller");
const { authenticateUser } = require("../../../middleware/auth");

router.get("/book", index);

router.get("/book/:id", authenticateUser, getOne);
router.put("/book/:id", update);
router.delete("/book/:id", destroy);

router.post("/book", create);

module.exports = router;
