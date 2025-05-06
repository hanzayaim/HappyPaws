const express = require("express");
const router = express.Router();
const pool = require("../config/db");

const {
  getAnimalDataById,
  getAnimalData,
  updateAnimalData,
  deleteAnimalData,
  insertAdopterData,
} = require("../models/animal_models");
const { insertNewAnimal } = require("../controllers/animal_controller");

router.get("/getAnimalData/:id_shelter", async (req, res) => {
  const { id_shelter } = req.params;
  try {
    const result = await getAnimalData(id_shelter);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: true, message: "failed to get data" });
  }
});

router.get("/getAnimalDataById/:id_shelter/:id_animal", async (req, res) => {
  const { id_shelter, id_animal } = req.params;
  try {
    const result = await getAnimalDataById(id_shelter, id_animal);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: true, message: "failed to get data" });
  }
});

router.post("/insertAnimalData", async (req, res) => {
  const {
    id_shelter,
    animal_name,
    animal_img,
    animal_gender,
    animal_type,
    animal_age,
    rescue_location,
    date,
    note,
    created_by,
  } = req.body;
  if (
    id_shelter == null ||
    animal_name == null ||
    animal_gender == null ||
    date == null ||
    created_by == null
  ) {
    return res.status(400).send({
      error: true,
      message: "Please provide all required data.",
    });
  }
  try {
    const result = await insertNewAnimal(
      id_shelter,
      animal_name,
      animal_img,
      animal_gender,
      animal_type,
      animal_age,
      rescue_location,
      date,
      note,
      created_by
    );
    res.status(200).json(result);
  } catch (error) {
    if (error.code === "23505") {
      const constraint = error.constraint;

      if (error.code === "23505") {
        if (constraint === "animal_animal_name_key") {
          return res
            .status(400)
            .json({ error: true, message: "animal name already exists" });
        }
      }

      return res.status(400).json({ error: true, message: "duplicate key" });
    }

    res.status(500).json({ error: true, message: "Internal server error" });
  }
});

router.post("/updateAnimalData", async (req, res) => {
  const {
    animal_name,
    animal_img,
    animal_gender,
    animal_type,
    animal_age,
    rescue_location,
    date,
    note,
    updated_by,
    id_shelter,
    id_animal,
  } = req.body;
  if (
    id_shelter == null ||
    id_shelter == null ||
    id_animal == null ||
    animal_name == null ||
    animal_gender == null ||
    date == null ||
    updated_by == null
  ) {
    return res.status(400).send({
      error: true,
      message: "Please provide all required data.",
    });
  }
  try {
    const result = await updateAnimalData(
      animal_name,
      animal_img,
      animal_gender,
      animal_type,
      animal_age,
      rescue_location,
      date,
      note,
      updated_by,
      id_shelter,
      id_animal
    );
    res.status(200).json(result);
  } catch (error) {
    if (error.code === "23505") {
      const constraint = error.constraint;

      if (error.code === "23505") {
        if (constraint === "animal_animal_name_key") {
          return res
            .status(400)
            .json({ error: true, message: "animal name already exists" });
        }
      }

      return res.status(400).json({ error: true, message: "duplicate key" });
    }

    res.status(500).json({ error: true, message: "Internal server error" });
  }
});

router.post("/insertAdopterAnimalData", async (req, res) => {
  const { id_adopter, updated_by, id_shelter, id_animal } = req.body;
  if (
    id_shelter == null ||
    id_animal == null ||
    id_adopter == null ||
    updated_by == null
  ) {
    return res.status(400).send({
      error: true,
      message: "Please provide all required data.",
    });
  }
  try {
    const result = await insertAdopterData(
      id_adopter,
      updated_by,
      id_shelter,
      id_animal
    );
    res.status(200).json(result);
  } catch {
    res
      .status(500)
      .json({ error: true, message: "failed to insert adopter animal data" });
  }
});

router.post("/deleteAnimalData", async (req, res) => {
  const { id_shelter, id_animal } = req.body;
  try {
    await pool.query(
      `DELETE FROM medical WHERE id_animal = $1 AND id_shelter = $2`,
      [id_animal, id_shelter]
    );
    const result = await deleteAnimalData(id_shelter, id_animal);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "failed to delete data" });
  }
});

module.exports = router;
