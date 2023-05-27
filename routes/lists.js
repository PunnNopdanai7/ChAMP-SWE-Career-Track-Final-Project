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

/**
 * @swagger
 * tags:
 *  name: Lists
 *  description: The lists managing API
 * components:
 *  schemas:
 *   List:
 *    type: object
 *    required:
 *     - title
 *     - order
 *    properties:
 *     id:
 *      type: string
 *      format: uuid
 *      description: The auto-generated id of the list
 *      example: 64719c7e12550acc41b14b34
 *     title:
 *      type: string
 *      description: The list title
 *      maxLength: 50
 *      trim: true
 *      example: List 1
 *     order:
 *      type: integer
 *      description: The list order (starting from 1)
 *      example: 1
 *     createdAt:
 *      type: date
 *      description: The auto-generated date of the creation of the list
 *      default: now (Date.now())
 *    example:
 *     id: 64719c7e12550acc41b14b34
 *     title: List 1
 *     order: 1
 *     createdAt: 2021-05-12T15:43:02.000Z
 */

/**
 * GET ALL LISTS
 * @swagger
 * /api/v1/lists:
 *  get:
 *   summary: Returns the list of all the lists
 *   tags: [Lists]
 *   responses:
 *    200:
 *     description: The array of the lists
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/List'
 *    500:
 *      description: Some server error
 *
 */

/**
 * GET A LIST
 * @swagger
 * /api/v1/lists/{id}:
 *  get:
 *   summary: Get the list by id
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: The list id
 *      schema:
 *       type: string
 *   tags: [Lists]
 *   responses:
 *    200:
 *     description: The list description by id
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/List'
 *    400:
 *      description: Bad request, the list id is invalid
 *    404:
 *      description: The list was not found
 *    500:
 *      description: Some server error
 *
 */

/**
 * CREATE A LIST
 * @swagger
 * /api/v1/lists:
 *  post:
 *   summary: Create a new list
 *   tags: [Lists]
 *   requestBody:
 *    required: true
 *    content:
 *     application/x-www-form-urlencoded:
 *      schema:
 *       type: object
 *       required:
 *        - title
 *        - order
 *       properties:
 *        title:
 *         type: string
 *         description: The list title
 *         maxLength: 50
 *         trim: true
 *         example: List 1
 *        order:
 *         type: integer
 *         description: The list order (starting from 1)
 *         example: 1
 *   responses:
 *    201:
 *     description: The list was successfully created
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/List'
 *    400:
 *     description: Bad request, the input was invalid
 *    500:
 *     description: Some server error
 *
 */

/**
 * UPDATE A LIST
 * @swagger
 * /api/v1/lists/{id}:
 *  put:
 *   summary: Update a list
 *   tags: [Lists]
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: The list id
 *      schema:
 *       type: string
 *   requestBody:
 *    required: true
 *    content:
 *     application/x-www-form-urlencoded:
 *      schema:
 *       type: object
 *       properties:
 *        title:
 *         type: string
 *         description: The list title
 *         maxLength: 50
 *         trim: true
 *         example: List 1
 *   responses:
 *    200:
 *     description: The list was successfully updated
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/List'
 *    400:
 *     description: Bad request, the input was invalid
 *    404:
 *     description: The list was not found
 *    500:
 *     description: Some server error
 *
 */

/**
 * DELETE A LIST
 * @swagger
 * /api/v1/lists/{id}:
 *  delete:
 *   summary: Delete a list, all the tasks in the list will be cascade deleted too
 *   tags: [Lists]
 *   parameters:
 *    - in: path
 *      name: id
 *      required : true
 *      description: The list id
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: The list was successfully deleted
 *    400:
 *     description: Bad request, the input was invalid
 *    404:
 *     description: The list was not found
 *    500:
 *     description: Some server error
 */

/**
 * UPDATE A LIST ORDER
 * @swagger
 * /api/v1/lists/{id}/order:
 *  put:
 *   summary: Update a list order, all the other lists with their order greater or equal to the new order will be updated too
 *   tags: [Lists]
 *   parameters:
 *    - in: path
 *      name: id
 *      required : true
 *      description: The list id
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
 *         description: The list order (starting from 1)
 *         example: 1
 *   responses:
 *    200:
 *     description: The list order was successfully updated
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/List'
 *    400:
 *     description: Bad request, the input was invalid
 *    404:
 *     description: The list was not found
 *    500:
 *     description: Some server error
 */
