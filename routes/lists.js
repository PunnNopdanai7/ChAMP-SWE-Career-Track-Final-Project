const express = require("express");
const {
  getLists,
  getList,
  createList,
  updateList,
  deleteList,
  updateListOrder,
} = require("../controllers/lists");

const router = express.Router();

router.route("/").get(getLists).post(createList);

router.route("/:id").get(getList).put(updateList).delete(deleteList);

router.route("/:id/order").put(updateListOrder);

module.exports = router;
