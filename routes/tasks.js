const express = require("express");
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  moveTask,
  updateTaskOrder,
} = require("../controllers/tasks");

const router = express.Router();

router.route("/").get(getTasks).post(createTask);

router.route("/:id").get(getTask).put(updateTask).delete(deleteTask);

router.route("/:id/move").put(moveTask);
router.route("/:id/order").put(updateTaskOrder);

module.exports = router;
