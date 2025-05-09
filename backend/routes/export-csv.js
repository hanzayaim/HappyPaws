const express = require("express");
const router = express.Router();
const { format } = require("@fast-csv/format");
const { getMedicalDataConvert } = require("../models/medical_models");
const { getAnimalDataConvert } = require("../models/animal_models");
const { getSalaryDataConvert } = require("../models/salary_models");
const { getExpensesDataConvert } = require("../models/expenses_models");
const { getIncomeDataConvert } = require("../models/income_models");
const { getEquipmentDataConvert } = require("../models/equipment_models");
const { getFoodDataConvert } = require("../models/food_models");

router.post("/export-csv", async (req, res) => {
  const { id_shelter, month, year, triggerValue } = req.body;

  let safeMonth = month === "all" ? null : parseInt(month);
  let safeYear = year === "all" ? null : parseInt(year);

  try {
    let result = null;

    if (triggerValue === "medical") {
      result = await getMedicalDataConvert(id_shelter, safeMonth, safeYear);
    } else if (triggerValue === "animal") {
      result = await getAnimalDataConvert(id_shelter, safeMonth, safeYear);
    } else if (triggerValue === "salary") {
      result = await getSalaryDataConvert(id_shelter, safeMonth, safeYear);
    } else if (triggerValue === "expenses") {
      result = await getExpensesDataConvert(id_shelter, safeMonth, safeYear);
    } else if (triggerValue === "income") {
      result = await getIncomeDataConvert(id_shelter, safeMonth, safeYear);
    } else if (triggerValue === "equipment") {
      result = await getEquipmentDataConvert(id_shelter, safeMonth, safeYear);
    } else if (triggerValue === "food") {
      result = await getFoodDataConvert(id_shelter, safeMonth, safeYear);
    }

    if (result.error || !result.data || result.data.length === 0) {
      return res.status(400).send("No data available or error occurred.");
    }

    res.setHeader("Content-disposition", `attachment;`);
    res.setHeader("Content-Type", "text/csv");

    const csvStream = format({ headers: true, delimiter: ";" });
    csvStream.pipe(res);
    result.data.forEach((row) => csvStream.write(row));
    csvStream.end();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error exporting data");
  }
});

module.exports = router;
