const express = require("express");
const { convertCSV } = require("../controllers/csv_controller");
const router = express.Router();

router.post("/export-csv", async (req, res) => {
  const { id_shelter, month, year, triggerValue } = req.body;

  if (!id_shelter || !month || !year || !triggerValue) {
    return res.status(400).send("Please provide all required data.");
  }

  try {
    await convertCSV(id_shelter, month, year, triggerValue, res);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error exporting data");
  }
});

module.exports = router;
