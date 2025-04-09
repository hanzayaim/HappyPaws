const express = require("express");
const router = express.Router();
const {
    getFoodData,
    getFoodDataById,
    insertFoodData,
    updateFoodData,
    deleteFoodData
} = require("../models/food_model");

router.get("/getFoodData/:id_shelter", async (req, res) => {
    const { id_shelter } = req.params;
    
    try {
        const result = await getFoodData(id_shelter);

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

router.get("/getFoodDataById/:id_shelter/id_food", async (req, res) => {
    const { id_shelter, id_food } = req.params;

    try {
        const result = await getFoodDataById(id_shelter, id_food);

        if(result.error) {
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

router.post("/insertFoodData", async (req, res) => {
    const {
        name 
        , quantity 
        , category 
        , type 
        , exp_date 
        , cost 
        , date 
        , note 
        , created_at 
        , created_by
    } = req.body;

    if (
        name == null ||
        quantity == null ||
        category == null ||
        type == null ||
        exp_date == null ||
        cost == null ||
        date == null ||
        note == null ||
        created_at == null ||
        created_by == null
    ) {
        return res.status(400).send({
            error: true,
            message: "Please provide all required data."
        })
    }

    try {
        const result = await insertFoodData(
            name 
            , quantity 
            , category 
            , type 
            , exp_date 
            , cost 
            , date 
            , note 
            , created_at 
            , created_by
        );

        if (result.error) {
            return res.status(400).json(result);
        }

        return res.status(200).json();
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Failed to insert data."
        });
    }
});

router.post("/updateFoodData", async (req, res) => {
    const {
        name
        , quantity
        , category
        , type
        , exp_date
        , cost
        , date
        , note
        , created_at
        , created_by
    } = req.body;

    if (
        name == null ||
        quantity == null ||
        category == null ||
        type == null ||
        exp_date == null ||
        cost == null ||
        date == null ||
        note == null ||
        created_at == null ||
        created_by == null
    ) {
        return res.status(400).send({
            error: true,
            message: "Please provide all required data."
        });
    }

    try {
        const result = await updateFoodData(
            name
            , quantity
            , category
            , type
            , exp_date
            , cost
            , date
            , note
            , created_at
            , created_by
        );

        if (result.error) {
            return res.status(400).json(result);
        }

        return result.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Failed to update data"
        });
    }
});

router.post("/deleteEquipmentData", async (req, res) => {
    const { id_shelter, id_food } = req.body;

    if (id_shelter == null || id_food == null) {
        return res.status(400).send({
            error: true,
            message: "Please provide all required data."
        });
    }

    try {
        const result = await deleteFoodData(id_shelter, id_food);

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