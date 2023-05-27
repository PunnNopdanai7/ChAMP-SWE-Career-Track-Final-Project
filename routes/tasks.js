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

/**
 * @swagger
 * tags:
 *  name: Tasks
 *  description: The tasks managing API
 * components:
 *  schemas:
 *   Task:
 *    type: object
 *    required:
 *     - order
 *     - list
 *    properties:
 *     id:
 *      type: string
 *      format: uuid
 *      description: The auto-generated id of the task
 *      example: 64719c9612550acc41b14b3c
 *     order:
 *      type: integer
 *      description: The task order (starting from 1)
 *      example: 1
 *     description:
 *      type: string
 *      description: The task description
 *      maxLength: 500
 *      trim: true
 *      example: Task 1 description
 *     dueDate:
 *      type: date
 *      description: The due date of the task
 *      example: 2021-05-12T15:43:02.000Z
 *      default: 7 days from now
 *     createdAt:
 *      type: date
 *      description: The auto-generated date of the creation of the list
 *      default: Date.now()
 *     list:
 *      type: mongoose.Schema.ObjectId
 *      ref: "List"
 *    example:
 *     id: 64719c9612550acc41b14b3c
 *     order: 1
 *     description: Task 1 description
 *     dueDate: 2021-05-19T15:43:02.000Z
 *     createdAt: 2021-05-12T15:43:02.000Z
 *     list: 64719c7e12550acc41b14b34
 */

module.exports = router;
