const express = require("express");
const router = express.Router();
const {
  getFinance,
  insertFinanceData,
  deleteFinanceData,
  updateFinanceData
} = require("../models/finance_model.js");

router.get("/getFinance/:id_shelter", async (req, res) =>  {
    const { id_shelter } = req.params;
    const result = await getFinance(id_shelter);
    if (result.error) {
        return res.status(404).json(result);
    }
    res.json(result);
});

router.post("/insertFinanceData", async (req, res) => {
    try {
      const {
        id_finance,
        id_income,
        id_expenses,
        total_balance,
        note,
        created_by,
        updated_by
      } = req.body;
  
      if (!id_finance || !created_by) {
        return res.status(400).json({ error: true, message: "Please provide all required data." });
      }
  
      const result = await insertFinanceData(
        id_finance,
        id_income,
        id_expenses,
        total_balance,
        note,
        created_by,
        updated_by
      );
  
      if (result.error) {
        return res.status(500).json(result);
      }
  
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: true, message: "Failed to insert finance data" });
    }
  });
  router.post("/deleteFinanceData", async (req, res) => {
    const { id_finance } = req.body;
    if (!id_finance) {
      return res.status(400).json({ error: true, message: "Please provide all required data." });
    }
    try {
      const result = await deleteFinanceData(id_finance);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: true, message: "Failed to delete finance data" });
    }
  });
  