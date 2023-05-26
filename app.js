const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//Route files
const tasks = require("./routes/tasks");
const lists = require("./routes/lists");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

app.use("/api/v1/tasks", tasks);
app.use("/api/v1/lists", lists);

module.exports = app;
