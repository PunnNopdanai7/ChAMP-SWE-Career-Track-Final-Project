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
 *      default: Date.now()
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
 *      schema:
 *       type: string
 *      required : true
 *      description: The list id
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

module.exports = router;
