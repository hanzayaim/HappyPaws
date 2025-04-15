const express = require("express");
const router = express.Router();
const { getSalary, getSalaryById } = require("../models/salary_models.js");
const { deleteSalary, insertSalary} = require("../controllers/salary_contoller.js");

router.get("/getSalary/:id_shelter", async (req, res) =>  {
    const { id_shelter } = req.params;
    const result = await getSalary(id_shelter);
    if (result.error) {
        return res.status(404).json(result);
    }
    res.json(result);
});
router.get("/getSalaryById/:id_shelter/:id_salary", async (req, res) =>  {
    const { id_shelter } = req.params;
    const result = await getSalaryById(id_shelter,id_salary);
    if (result.error) {
        return res.status(404).json(result);
    }
    res.json(result);
});
router.post("/insertSalaryData", async (req, res) => {
    try {
        const { 
            id_shelter, 
            id_employee, 
            name, 
            cost, 
            date, 
            note, 
            created_by
        } = req.body;

        if (!id_shelter || !name || !cost || !date || !created_by) {
            return res.status(400).json({ error: true, message: "Please provide all required data." });
        }
        const result = await insertSalary(
            id_shelter, 
            id_employee, 
            name, 
            cost, 
            date, 
            note, 
            created_by
        );
        if (result.error) {
            return res.status(500).json(result); 
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: true, message: "failed to insert data" });
    }
});
router.post("/deleteSalaryData", async (req, res) => { 
    const { id_shelter,id_salary } = req.body;
    if (!id_salary||!id_shelter) {
        return res.status(400).json({ error: true, message: "Please provide all required data." });
    }
    try {
        const result = await deleteSalary(id_shelter,id_salary );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: true, message: "failed to delete data" });
    }
});


module.exports = router;