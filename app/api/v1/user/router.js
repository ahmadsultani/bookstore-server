const express = require("express");
const router = express.Router();
const {
  index,
  getOne,
  create,
  update,
  checkout,
  destroy,
  topup,
} = require("./controller");
const { authenticateUser } = require("../../../middleware/auth");

router.get("/user", index);
router.get("/user/:id", getOne);
router.post("/user", create);
router.put("/user/:id", update);
router.delete("/user/:id", destroy);

router.put("/topup", authenticateUser, topup);
router.put("/checkout", authenticateUser, checkout);

router.delete("/user/:id", destroy);

module.exports = router;
