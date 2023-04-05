const express = require("express");
const router = express.Router();
const { index, getOne, create, update, destroy } = require("./controller");

router.get("/user", index);
router.get("/user/:id", getOne);
router.post("/user", create);
router.put("/user/:id", update);

router.delete("/user/:id", destroy);

module.exports = router;