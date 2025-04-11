const express = require("express");
const router = express.Router();
const {
  getFinance, 
  updateFinanceBalanceExpensesData,
  updateFinanceBalanceIncomeData, 
  insertFinanceData, 
  deleteFinanceData
} = require("../models/finance_models.js");

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
        id_shelter,
        id_income,
        id_expenses,
        total_balance,
        note,
        created_by,
      } = req.body;
  
      if (!id_finance || !created_by || !id_shelter) {
        return res.status(400).json({ error: true, message: "Please provide all required data." });
      }
      const result = await insertFinanceData(
        id_finance,
        id_shelter,
        id_income,
        id_expenses,
        total_balance,
        note,
        created_by,
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
    const { id_shelter, id_finance } = req.body;
    if (!id_finance) {
      return res.status(400).json({ error: true, message: "Please provide all required data." });
    }
    try {
      const result = await deleteFinanceData(id_shelter, id_finance);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: true, message: "Failed to delete finance data" });
    }
});

router.post("/UpdateTotalBalanceExpenses", async (req, res) =>{
    const {
      id_finance,
      id_shelter,
      id_expenses,
      amount,
      updated_by
    } = req.body;

    if (
      id_finance == null||
      id_shelter == null||
      id_expenses == null||
      amount == null||
      updated_by == null
    ) {
        return res.status(400).send({
            error: true,
            message: "Please provide all required data."
        });
    }

    try {
        const result = await updateFinanceBalanceExpensesData(
          id_finance,
          id_shelter,
          id_expenses,
          amount,
          updated_by
        );
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Failed to update data"
        });
    }
});

router.post("/UpdateTotalBalanceIncome", async (req, res) =>{
    const {
      id_finance,
      id_shelter,
      id_income,
      amount,
      updated_by
    } = req.body;

    if (
      id_finance == null||
      id_shelter == null||
      id_income == null||
      amount == null||
      updated_by == null
    ) {
        return res.status(400).send({
            error: true,
            message: "Please provide all required data."
        });
    }

    try {
        const result = await updateFinanceBalanceIncomeData(
          id_finance,
          id_shelter,
          id_income,
          amount,
          updated_by
        );
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Failed to update data"
        });
    }
});

module.exports = router;