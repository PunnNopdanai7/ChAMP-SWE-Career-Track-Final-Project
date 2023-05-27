const List = require("../models/List");
const Task = require("../models/Task");

//@desc     Get all lists
//@route    Get /api/v1/lists/
//@access   Public
exports.getLists = async (_req, res) => {
  try {
    const list = await List.find();
    return res.status(200).json({ success: true, data: list });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//@desc     Get a list by ID
//@route    Get /api/v1/lists/:id
//@access   Public
exports.getList = async (req, res) => {
  try {
    const { id } = req.params ?? {};
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "id is required" });
    }

    const list = await List.findById(id);
    if (!list) {
      return res.status(404).json({
        success: false,
        message: `No list with the id of ${req.params.id}`,
      });
    }
    return res.status(200).json({ success: true, data: list });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//@desc     Create a list
//@route    Post /api/v1/lists/
//@access   Public
exports.createList = async (req, res) => {
  try {
    const { title, order } = req.body ?? {};
    if (!title || !order) {
      return res
        .status(400)
        .json({ success: false, message: "title and order are required" });
    }

    // Check if order is a number with value >= 1
    if (!Number.isInteger(Number(order)) || Number(order) < 1) {
      return res
        .status(400)
        .json({ success: false, message: "order is invalid" });
    }

    const foundList = await List.findOne({ order });
    if (foundList) {
      return res.status(400).json({
        success: false,
        message: `List with order ${order} already exists`,
      });
    }

    const list = await List.create(req.body);
    return res.status(201).json({ success: true, data: list });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//@desc     Update a list
//@route    Put /api/v1/lists/:id
//@access   Public
exports.updateList = async (req, res) => {
  try {
    const { id } = req.params ?? {};
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "id is required" });
    }

    const body = { ...req.body }; // Copy req.body to new object
    delete body.id; // Remove id from object
    delete body.createdAt; // Remove createdAt from object
    delete body.order; // Remove order from object

    const updatedList = await List.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedList) {
      return res.status(404).json({
        success: false,
        message: `No list with the id of ${req.params.id}`,
      });
    }

    return res.status(200).json({ success: true, data: updatedList });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//@desc     Update a list order
//@route    Put /api/v1/lists/:id/order
//@access   Public
exports.updateListOrder = async (req, res) => {
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
        .json({ success: false, message: "order is required" });
    }

    // Check if order is a number with value >= 1
    if (!Number.isInteger(Number(order)) || Number(order) < 1) {
      return res
        .status(400)
        .json({ success: false, message: "order is invalid" });
    }

    const foundList = await List.find({
      order: order,
    });

    // if foundList is not empty and the id of the found list is not the same as the id in the params
    if (foundList.length > 0 && foundList[0].id != id) {
      // increment order of all lists with order >= order
      await List.updateMany({ order: { $gte: order } }, { $inc: { order: 1 } });
    }

    const updatedList = await List.findByIdAndUpdate(
      id,
      {
        order,
      },
      { new: true, runValidators: true }
    );

    if (!updatedList) {
      return res.status(404).json({
        success: false,
        message: `No list with the id of ${req.params.id}`,
      });
    }

    return res.status(200).json({ success: true, data: updatedList });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//@desc     Delete a list
//@route    Delete /api/v1/lists/:id
//@access   Public
exports.deleteList = async (req, res) => {
  try {
    const { id } = req.params ?? {};
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "id is required" });
    }

    const list = await List.findByIdAndRemove({ _id: id });
    if (!list) {
      return res.status(404).json({
        success: false,
        message: `No list with the id of ${req.params.id}`,
      });
    }

    // Delete all tasks associated with the list
    await Task.deleteMany({ list: id });

    return res.status(200).json({ success: true, data: {} });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
