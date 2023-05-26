const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a list title"],
      trim: true,
      maxlength: [50, "Title can not be more than 50 characters"],
    },
    order: {
      type: Number,
      required: [true, "Please add a task order"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("List", ListSchema);
