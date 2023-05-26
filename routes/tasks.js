const express = require("express");
const { getTask, createTask } = require("../controllers/tasks");

const router = express.Router();

router.route("/").post(createTask);

router.route("/:id").get(getTask);

module.exports = router;
