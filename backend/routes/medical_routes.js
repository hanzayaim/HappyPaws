const express = require("express");
const router = express.Router();
const { 
    getMedicalData,
    getMedicalDataById,
    insertMedicalData,
    updateMedicalData,
    deleteMedicalData
} = require("../models/medical_models");

router.get("/getMedicalData/:id_shelter", async (req, res) =>  {
    const { id_shelter } = req.params;

    try {
        const result = await getMedicalData(id_shelter);

        if (result.error) {
            return res.status(400).json(result);
        }

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Failed to get data.",
            data: null
        });
    }
});

router.get("/getMedicalDataById/:id_shelter/:id_animal/:id_medical", async (req, res) =>  {
    const { 
        id_shelter,
        id_animal,
        id_medical
    } = req.params;

    try {
        const result = await getMedicalDataById(id_shelter, id_animal, id_medical);

        if (result.error) {
            return res.status(400).json(result);
        }

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Failed to get data.",
        });
    }
});

router.post("/insertMedicalData", async (req, res) =>  {
    const { 
        id_medical,
        medical_process,
        medical_status,
        vaccin_status,
        medical_date_in,
        medical_date_out,
        medical_cost,
        note,
        created_by,
        id_shelter,
        id_animal
    } = req.body;

    if (
        id_medical == null ||
        medical_process == null ||
        medical_status == null ||
        vaccin_status == null ||
        medical_date_in == null ||
        medical_date_out == null ||
        medical_cost == null ||
        note == null ||
        created_by == null ||
        id_shelter == null ||
        id_animal == null
    ) {
        return res.status(400).send({
            error: true,
            message: "Please provide all required data."
        });
    }

    try {
        const result = await insertMedicalData(
            id_medical,
            medical_process,
            medical_status,
            vaccin_status,
            medical_date_in,
            medical_date_out,
            medical_cost,
            note,
            created_by,
            id_shelter,
            id_animal
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

router.post("/updateMedicalData", async (req, res) => {
    const {
        medical_process,
        medical_status,
        vaccin_status,
        medical_date_in,
        medical_date_out,
        medical_cost,
        note,
        updated_by,
        id_shelter,
        id_animal,
        id_medical
    } = req.body;

    if (
        medical_process == null ||
        medical_status == null ||
        vaccin_status == null ||
        medical_date_in == null ||
        medical_date_out == null ||
        medical_cost == null ||
        note == null ||
        updated_by == null ||
        id_shelter == null ||
        id_animal == null ||
        id_medical == null
    ) {
        return res.status(400).send({
            error: true,
            message: "Please provide all required data."
        });
    }

    try {
        const result = await updateMedicalData(
            medical_process,
            medical_status,
            vaccin_status,
            medical_date_in,
            medical_date_out,
            medical_cost,
            note,
            updated_by,
            id_shelter,
            id_animal,
            id_medical
        );

        if (result.error) {
            return res.status(400).json(result);
        }

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Failed to update data."
        });
    }
});

router.post("/deleteMedicalData", async (req, res) => {
    const { id_shelter, id_medical } = req.body;

    if (id_shelter == null || id_medical == null) {
        return res.status(400).send({
            error: true,
            message: "Please provide all required data."
        });
    }

    try {
        const result = await deleteMedicalData(id_shelter, id_medical);

        if (result.error) {
            return res.status(400).json(result);
        }

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Failed to delete data."
        });
    }
});

module.exports = router;