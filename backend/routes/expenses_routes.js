const express = require("express");
const router = express.Router();
const {
  getExpenses,
  getExpensesById,
  getExpensesDataConvert,
} = require("../models/expenses_models.js");
const {
  insertExpenses,
  deleteExpenses,
} = require("../controllers/expenses_controller");
router.get("/getExpenses/:id_shelter", async (req, res) => {
  const { id_shelter } = req.params;
  try {
    const result = await getExpenses(id_shelter);
    if (result.error) {
      return res.status(400).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Failed to get data.",
      data: null,
    });
  }
});
router.get("/getExpenses/:id_shelter/:id_expenses", async (req, res) => {
  const { id_shelter, id_expenses } = req.params;
  try {
    const result = await getExpensesById(id_shelter, id_expenses);

    if (result.error) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Failed to get data.",
      data: null,
    });
  }
});

router.post("/getExpensesDataConvert", async (req, res) => {
  const { id_shelter, month, year } = req.body;
  if (id_shelter == null) {
    return res.status(400).send({
      error: true,
      message: "Please provide all required data.",
    });
  }

  try {
    const result = await getExpensesDataConvert(id_shelter, month, year);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: "Failed to get data.",
      data: null,
    });
  }
});

router.post("/insertExpensesData", async (req, res) => {
  const {
    id_shelter,
    id_food,
    id_medical,
    id_equipment,
    id_salary,
    created_by,
  } = req.body;

  if (created_by == null || id_shelter == null) {
    return res.status(400).send({
      error: true,
      message: "Please provide all required data.",
    });
  }
  try {
    const result = await insertExpenses(
      id_shelter,
      id_food,
      id_medical,
      id_equipment,
      id_salary,
      created_by
    );

    if (result.error) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Failed to insert data.",
    });
  }
});

module.exports = router;
