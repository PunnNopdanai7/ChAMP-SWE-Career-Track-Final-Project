const express = require("express");
const { getList, createList } = require("../controllers/lists");

const router = express.Router();

router.route("/").post(createList);

router.route("/:id").get(getList);

module.exports = router;
