const List = require("../models/List");

//@desc     Get a list
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
};
