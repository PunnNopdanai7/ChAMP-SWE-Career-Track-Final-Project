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

/* Cascade delete tasks when a list is deleted */
ListSchema.pre("remove", async function (next) {
  console.log(`Tasks being removed from list ${this._id}`);
  await this.model("Task").deleteMany({ list: this._id });
  next();
});

module.exports = mongoose.model("List", ListSchema);
