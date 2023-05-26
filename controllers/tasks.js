const Task = require("../models/Task");
const List = require("../models/List");

//@desc     Get all tasks
//@route    Get /api/v1/tasks/
//@access   Public
exports.getTasks = async (req, res) => {
  try {
    const task = await Task.find();
    return res.status(200).json({ success: true, data: task });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

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
  try {
    const { order, list } = req.body ?? {};

    if (!order || !Number.isInteger(Number(order)) || Number(order) < 1) {
      return res
        .status(400)
        .json({ success: false, message: "order is required" });
    }

    if (!list) {
      return res
        .status(400)
        .json({ success: false, message: "listId is required" });
    }

    // Check if list with the given ID exists
    const foundList = await List.findById(list);
    if (!foundList) {
      return res
        .status(404)
        .json({ success: false, message: "listId is invalid" });
    }

    // Check if order is already taken
    const foundTasksWithSameOrder = await Task.find({ order, list });
    if (foundTasksWithSameOrder.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "order is already taken" });
    }

    const task = await Task.create({ ...req.body });

    return res.status(200).json({ success: true, data: task });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//@desc     Update a task
//@route    Post /api/v1/tasks/:id
//@access   Public
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params ?? {};
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "id is required" });
    }

    const { order, list } = req.body ?? {};

    if (!order || !Number.isInteger(Number(order)) || Number(order) < 1) {
      return res
        .status(400)
        .json({ success: false, message: "order is required" });
    }

    if (!list) {
      return res
        .status(400)
        .json({ success: false, message: "listId is required" });
    }

    // Check if list with the given ID exists
    const foundList = await List.findById(list);
    if (!foundList) {
      return res
        .status(404)
        .json({ success: false, message: "listId is invalid" });
    }

    // Check if order is already taken
    const foundTasksWithSameOrder = await Task.find({ order, list });

    if (foundTasksWithSameOrder.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "order is already taken" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: `No task with the id of ${req.params.id}`,
      });
    }

    return res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//@desc     Delete a task
//@route    Delete /api/v1/tasks/:id
//@access   Public
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params ?? {};
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "id is required" });
    }

    const task = await Task.findByIdAndRemove(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: `No task with the id of ${req.params.id}`,
      });
    }

    return res.status(200).json({ success: true, data: {} });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
