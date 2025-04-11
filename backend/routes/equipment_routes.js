const express = require("express");
const router = express.Router();
const { 
    getEquipmentData,
    getEquipmentDataById,
    insertEquipmentData,
    updateEquipmentData,
    deleteEquipmentData
} = require("../models/equipment_models")

router.get("/getEquipmentData/:id_shelter", async (req, res) => {
    const { id_shelter } = req.params;

    try {
        const result = await getEquipmentData(id_shelter);

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

router.get("/getEquipmentDataById/:id_shelter/:id_equipment", async (req, res) => {
    const { id_shelter, id_equipment } = req.params;

    try {
        const result = await getEquipmentDataById(id_shelter, id_equipment);

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

router.post("/insertEquipmentData", async (req, res) => {
    const {
        id_equipment,
        name,
        type,
        date,
        cost,
        note,
        created_by,
        id_shelter
    } = req.body;

    if (
        id_equipment == null ||
        name == null ||
        type == null ||
        date == null ||
        cost == null ||
        note == null ||
        created_by == null ||
        id_shelter == null
    ) {
        return res.status(400).send({
            error: true,
            message: "Please provide all required data."
        });
    }

    try {
        const result = await insertEquipmentData(
            id_equipment,
            name,
            type,
            date,
            cost,
            note,
            created_by,
            id_shelter
        );

        if (result.error) {
            return res.status(400).json(result);
        }

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Failed to insert data."
        });
    }
});

router.post("/updateEquipmentData", async (req, res) => {
    const {
        name,
        type,
        date,
        cost,
        note,
        updated_by,
        id_shelter,
        id_equipment
    } = req.body;

    if (
        name == null ||
        type == null ||
        date == null ||
        cost == null ||
        note == null ||
        updated_by == null ||
        id_shelter == null ||
        id_equipment == null
    ) {
        return res.status(400).send({
            error: true,
            message: "Please provide all required data."
        });
    }

    try {
        const result = await updateEquipmentData(
            name,
            type,
            date,
            cost,
            note,
            updated_by,
            id_shelter,
            id_equipment
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

router.post("/deleteEquipmentData", async (req, res) => {
    const { id_shelter, id_equipment } = req.body;

    if (id_shelter == null || id_equipment == null) {
        return res.status(400).send({
            error: true,
            message: "Please provide all required data."
        });
    }

    try {
        const result = await deleteEquipmentData(id_shelter, id_equipment);

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