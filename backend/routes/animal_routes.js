const express = require("express");
const router = express.Router();
const {
  getAnimalDataById,
  getAnimalData,
  insertAnimalData,
  updateAnimalMedicalId,
  updateAnimalData,
  deleteAnimalData,
} = require("../models/animal_models");

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
    id_animal,
    animal_name,
    animal_img,
    animal_gender,
    animal_type,
    animal_age,
    animal_status,
    rescue_location,
    date,
    note,
    created_by,
  } = req.body;
  if (
    id_shelter == null ||
    id_animal == null ||
    animal_name == null ||
    animal_gender == null ||
    animal_status == null ||
    date == null ||
    created_by == null
  ) {
    return res.status(400).send({
      error: true,
      message: "Please provide all required data.",
    });
  }
  try {
    const result = await insertAnimalData(
      id_shelter,
      id_animal,
      animal_name,
      animal_img,
      animal_gender,
      animal_type,
      animal_age,
      animal_status,
      rescue_location,
      date,
      note,
      created_by
    );
    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: true, message: "failed to insert data" });
  }
});

router.post("/updateAnimalData", async (req, res) => {
  const {
    id_adopter,
    animal_name,
    animal_img,
    animal_gender,
    animal_type,
    animal_age,
    animal_status,
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
    animal_status == null ||
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
      id_adopter,
      animal_name,
      animal_img,
      animal_gender,
      animal_type,
      animal_age,
      animal_status,
      rescue_location,
      date,
      note,
      updated_by,
      id_shelter,
      id_animal
    );
    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: true, message: "failed to update data" });
  }
});

router.post("/updateAnimalMedicalId", async (req, res) => {
  const { id_medical, animal_status, id_shelter, id_animal } = req.body;
  if (
    id_medical == null ||
    animal_status == null ||
    id_shelter == null ||
    id_animal == null
  ) {
    return res.status(400).send({
      error: true,
      message: "Please provide all required data.",
    });
  }
  try {
    const result = await updateAnimalMedicalId(
      id_medical,
      animal_status,
      id_shelter,
      id_animal
    );
    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: true, message: "failed to update data" });
  }
});

router.post("/deleteAnimalData", async (req, res) => {
  const { id_shelter, id_animal } = req.body;
  try {
    const result = await deleteAnimalData(id_shelter, id_animal);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: true, message: "failed to delete data" });
  }
});

module.exports = router;
