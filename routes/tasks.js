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

/**
 * GET ALL TASKS
 * @swagger
 * /api/v1/tasks:
 *  get:
 *   summary: Returns the array of all the Tasks
 *   tags: [Tasks]
 *   parameters:
 *    - in: query
 *      name: list
 *      required: false
 *      description: The list id
 *      example: 64719c8412550acc41b14b37
 *      schema:
 *        type: string
 *   responses:
 *    200:
 *     description: The array of the tasks
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Task'
 *    500:
 *      description: Some server error
 */

/**
 * GET A TASK
 * @swagger
 * /api/v1/tasks/{id}:
 *  get:
 *   summary: Get the task by id
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: The task id
 *      schema:
 *       type: string
 *   tags: [Tasks]
 *   responses:
 *    200:
 *     description: The task description by id
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Task'
 *    400:
 *      description: Bad request, the task id is invalid
 *    404:
 *      description: The task was not found
 *    500:
 *      description: Some server error
 */

/**
 * CREATE A TASK
 * @swagger
 * /api/v1/tasks:
 *  post:
 *   summary: Create a new task
 *   tags: [Tasks]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Task'
 *   responses:
 *    201:
 *     description: The task was successfully created
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Task'
 *    400:
 *     description: Bad request, the input was invalid
 *    500:
 *     description: Some server error
 */

/**
 * UPDATE A TASK
 * @swagger
 * /api/v1/tasks/{id}:
 *  put:
 *   summary: Update a task by id
 *   tags: [Tasks]
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: The list id
 *      schema:
 *       type: string
 *   requestBody:
 *    required: true
 *    description: This endpoint allows only other fields except id, list, order, createdAt to be updated
 *    content:
 *     application/x-www-form-urlencoded:
 *      schema:
 *       type: object
 *       properties:
 *        dueDate:
 *         type: date
 *         description: The due date of the task
 *         example: 2021-05-12T15:43:02.000Z
 *        description:
 *         type: string
 *         description: The task description
 *         example: Task 1 description
 *   responses:
 *    200:
 *     description: The task was successfully updated
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Task'
 *    400:
 *     description: Bad request, the input was invalid
 *    404:
 *     description: The task was not found
 *    500:
 *     description: Some server error
 */

/**
 * DELETE A TASK
 * @swagger
 * /api/v1/tasks/{id}:
 *  delete:
 *   summary: Delete a task by id
 *   tags: [Tasks]
 *   parameters:
 *    - in: path
 *      name: id
 *      required : true
 *      description: The task id
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: The task was successfully deleted
 *    400:
 *     description: Bad request, the input was invalid
 *    404:
 *     description: The task was not found
 *    500:
 *     description: Some server error
 */

/**
 * MOVE A TASK TO ANOTHER LIST
 * @swagger
 * /api/v1/tasks/{id}/move:
 *  put:
 *   summary: Move a task to another list
 *   tags: [Tasks]
 *   parameters:
 *    - in: path
 *      name: id
 *      required : true
 *      description: The task id
 *      schema:
 *       type: string
 *   requestBody:
 *    required: true
 *    content:
 *     application/x-www-form-urlencoded:
 *      schema:
 *       type: object
 *       properties:
 *        order:
 *         type: number
 *         description: The order of the task in the new list (1 is the first)
 *         example: 1
 *        list:
 *         type: string
 *         description: The new list id
 *         example: 64719c7e12550acc41b14b34
 *   responses:
 *    200:
 *     description: The task was successfully moved to another list
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Task'
 *    400:
 *     description: Bad request, the input was invalid
 *    404:
 *     description: The task was not found
 *    500:
 *     description: Some server error
 */

/**
 * UPDATE TASK ORDER IN A LIST
 * @swagger
 * /api/v1/tasks/{id}/order:
 *  put:
 *   summary: Update task order in a list, the task will be moved to the given order and the other tasks that have order >= the given order will be moved to the next order
 *   tags: [Tasks]
 *   parameters:
 *    - in: path
 *      name: id
 *      required : true
 *      description: The task id
 *      schema:
 *       type: string
 *   requestBody:
 *    required: true
 *    content:
 *     application/x-www-form-urlencoded:
 *      schema:
 *       type: object
 *       properties:
 *        order:
 *         type: number
 *         description: The order of the task in the new list (1 is the first)
 *         example: 1
 *   responses:
 *    200:
 *     description: The task order was successfully updated
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Task'
 *    400:
 *     description: Bad request, the input was invalid
 *    404:
 *     description: The task was not found
 *    500:
 *     description: Some server error
 */
