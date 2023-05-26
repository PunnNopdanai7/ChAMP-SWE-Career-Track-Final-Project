const Task = require("../models/Task");

//@desc     Get a task
//@route    Get /api/v1/tasks/:id
//@access   Public
exports.getTask = async (req, res) => {
  try {
    const { id } = req.params ?? {};
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "id is required" });
    }

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: `No task with the id of ${req.params.id}`,
      });
    }

    return res.status(200).json({ success: true, data: task });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//@desc     Create a task
//@route    Post /api/v1/tasks/
//@access   Public
exports.createTask = async (req, res) => {
  return res.status(200).json({ message: "test createTask" });
};
