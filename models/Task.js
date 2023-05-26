const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  order: {
    type: Number,
    required: [true, "Please add a task order"],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, "Description can not be more than 500 characters"],
    default: "",
  },
  dueDate: {
    type: Date,
    default: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  list: {
    type: mongoose.Schema.ObjectId,
    ref: "List",
    required: true,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
