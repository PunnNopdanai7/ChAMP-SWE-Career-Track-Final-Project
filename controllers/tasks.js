const Task = require("../models/Task");
const List = require("../models/List");

//@desc     Get all tasks
//@route    Get /api/v1/tasks/
//@access   Public
exports.getTasks = async (req, res) => {
  try {
    const { list } = req.query ?? {};

    const task = await Task.find({
      ...(list && { list }),
    });
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

    return res.status(201).json({ success: true, data: task });
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

    const body = { ...req.body };

    // This endpoint allows only other fields except id, list, order, createdAt to be updated
    delete body.id;
    delete body.list;
    delete body.order;
    delete body.createdAt;

    const updatedTask = await Task.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

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

//@desc     Move task to another list
//@route    Post /api/v1/tasks/:id/move
//@access   Public
exports.moveTask = async (req, res) => {
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

//@desc     Update a task order in the same list
//@route    Put /api/v1/tasks/:id/order
//@access   Public
exports.updateTaskOrder = async (req, res) => {
  try {
    const { id } = req.params ?? {};
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "id is required" });
    }

    const { order } = req.body ?? {};
    if (!order) {
      return res
        .status(400)
        .json({ success: false, message: "new order is required" });
    }

    // Check if order is a number with value >= 1
    if (!Number.isInteger(Number(order)) || Number(order) < 1) {
      return res
        .status(400)
        .json({ success: false, message: "order is invalid" });
    }

    const thisTask = await Task.findById(id);

    if (!thisTask) {
      return res.status(404).json({
        success: false,
        message: `No task with the id of ${req.params.id}`,
      });
    }

    const foundTask = await Task.find({
      order: order,
      list: thisTask.list,
    });

    // if foundTask is not empty, it means that there is already a task with the same order
    if (foundTask.length > 0 && foundTask[0]._id.toString() !== id) {
      // increment order of all tasks with order >= order, and list = thisTask.list
      await Task.updateMany(
        { order: { $gte: order }, list: thisTask.list },
        { $inc: { order: 1 } }
      );
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        order,
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
