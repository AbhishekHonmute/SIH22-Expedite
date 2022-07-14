const router = require("express").Router();
const Cell = require("../models/Cell");

router.route("/add_cell").post(async (req, res) => {
  try {
    const { cell_id, name } = req.body;
    console.log(cell_id, name);

    const cell = await Cell.findOne({ cell_id });
    if (cell) {
      res.status(403).json({
        result: "Cell ID already exists. Enter a different Cell ID",
      });
    } else {
      try {
        const new_cell = new Cell({
          cell_id,
          name,
        });
        console.log("Here: ");
        console.log(new_cell);
        new_cell.save();
      } catch (error) {
        console.log(error.message);
      }
      res.status(200).json({
        result: "Cell Registered",
      });
    }
  } catch (error) {
    res.status(400).json({
      result: "Cannot Register Cell",
    });
  }
});

router.route("/get_cell/:cell_id").get(async (req, res) => {
  try {
    const cell_id = req.params.cell_id;
    console.log(cell_id);
    const cell = await Cell.findOne({ cell_id });
    res.status(200).json({
      result: cell === null ? {} : cell,
    });
  } catch (error) {
    res.status(400).json({
      result: "Failed to fetch cell data !",
    });
  }
});

module.exports = router;