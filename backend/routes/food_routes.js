const express = require("express");
const router = express.Router();
const {
  getFoodData,
  getFoodDataById,
  updateFoodData,
  getFoodDataConvert,
} = require("../models/food_models");
const {
  insertFood,
  deleteFood,
  updateFood,
} = require("../controllers/food_controller");

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
      data: null,
    });
  }
});

router.get("/getFoodDataById/:id_shelter/:id_food", async (req, res) => {
  const { id_shelter, id_food } = req.params;

  try {
    const result = await getFoodDataById(id_shelter, id_food);

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

router.post("/getFoodDataConvert", async (req, res) => {
  const { id_shelter, month, year } = req.body;
  if (id_shelter == null) {
    return res.status(400).send({
      error: true,
      message: "Please provide all required data.",
    });
  }

  try {
    const result = await getFoodDataConvert(id_shelter, month, year);
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

router.post("/insertFoodData", async (req, res) => {
  const {
    name,
    quantity,
    category,
    type,
    exp_date,
    cost,
    date,
    note,
    created_by,
    id_shelter,
  } = req.body;

  if (
    name == null ||
    quantity == null ||
    category == null ||
    type == null ||
    exp_date == null ||
    cost == null ||
    date == null ||
    created_by == null ||
    id_shelter == null
  ) {
    return res.status(400).send({
      error: true,
      message: "Please provide all required data.",
    });
  }

  try {
    const result = await insertFood(
      name,
      quantity,
      category,
      type,
      exp_date,
      cost,
      date,
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
      message: "Failed to insert data.",
    });
  }
});

router.post("/updateFoodData", async (req, res) => {
  const {
    name,
    quantity,
    category,
    type,
    exp_date,
    cost,
    date,
    note,
    updated_by,
    id_shelter,
    id_food,
  } = req.body;

  if (
    name == null ||
    quantity == null ||
    category == null ||
    type == null ||
    exp_date == null ||
    cost == null ||
    date == null ||
    updated_by == null ||
    id_shelter == null ||
    id_food == null
  ) {
    return res.status(400).send({
      error: true,
      message: "Please provide all required data.",
    });
  }

  try {
    const result = await updateFood(
      name,
      quantity,
      category,
      type,
      exp_date,
      cost,
      date,
      note,
      updated_by,
      id_shelter,
      id_food
    );

    if (result.error) {
      return res.status(400).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Failed to update data",
    });
  }
});

router.post("/deleteFoodData", async (req, res) => {
  const { id_shelter, id_food } = req.body;

  if (id_shelter == null || id_food == null) {
    return res.status(400).send({
      error: true,
      message: "Please provide all required data.",
    });
  }

  try {
    const result = await deleteFood(id_shelter, id_food);

    if (result.error) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Failed to delete data.",
    });
  }
});

module.exports = router;
