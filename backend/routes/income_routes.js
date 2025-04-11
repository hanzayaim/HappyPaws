const express = require("express");
const router = express.Router();
const { deleteIncomeData, insertIncomeData, updateIncomeData, getIncome, getIncomeById } = require("../models/income_models.js");

router.get("/getIncome/:id_shelter", async (req, res) =>  {
    const { id_shelter } = req.params;
    const result = await getIncome(id_shelter);
    if (result.error) {
        return res.status(404).json(result);
    }
    res.json(result);
});
router.get("/getIncomebyId/:id_shelter/:id_income", async (req, res) =>  {
    const { id_shelter,id_income } = req.params;
    const result = await getIncomeById(id_shelter,id_income);
    if (result.error) {
        return res.status(404).json(result);
    }
    res.json(result);
});

router.post("/insertIncomeData", async (req, res) => {
    try {
        const { 
            id_income,
            id_shelter,
            name,
            amount,
            date,
            type,
            note,
            created_by,
            update_by } = req.body;

        if (!id_income || !id_shelter || !name || !amount || !date || !type) {
            return res.status(400).json({ error: true, message: "Please provide all required data." });
        }
        const result = await insertIncomeData(
            id_income,
            id_shelter,
            name,
            amount,
            date,
            type,
            note,
            created_by,
            update_by     
        );
        if (result.error) {
            return res.status(500).json(result); 
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: true, message: "failed to insert data" });
    }
});

router.post("/deleteIncomeData", async (req, res) => { 
    const { id_shelter,id_income } = req.body;
    try {
        const result = await deleteIncomeData(id_shelter,id_income );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: true, message: "Failed to delete data" });
    }
});

router.post("/updateIncomeData", async (req, res) => {
    
        const { 
            id_income,
            id_shelter,
            name,
            amount,
            date,
            type,
            note,
            update_by 
        } = req.body;

        if (!id_income || !id_shelter || !name || !amount || !date || !type || !update_by) {
            return res.status(400).json({ error: true, message: "Please provide all required data." });
        }
    try {
        const result = await updateIncomeData(
            id_income,
            id_shelter,
            name,
            amount,
            date,
            type,
            note,
            update_by
        );

        if (result.error) {
            return res.status(404).json(result); 
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: true, message: "Failed to update data" });
    }
});

module.exports = router;
