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
    status,
  } = req.body;
  if (
    id_shelter == null ||
    id_animal == null ||
    animal_name == null ||
    animal_gender == null ||
    animal_status == null ||
    date == null ||
    created_by == null ||
    status == null
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
      created_by,
      status
    );
    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: true, message: "failed to insert data" });
  }
});

router.post("/updateAnimalData", async (req, res) => {
  const {
    animal_name,
    animal_img,
    animal_gender,
    animal_type,
    animal_age,
    animal_status,
    rescue_location,
    id_adopter,
    date,
    note,
    updated_by,
    updated_at,
    status,
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
    updated_by == null ||
    updated_at == null ||
    status == null
  ) {
    return res.status(400).send({
      error: true,
      message: "Please provide all required data.",
    });
  }
  try {
    const result = await updateAnimalData(
      id_shelter,
      id_adopter,
      id_animal,
      animal_name,
      animal_img,
      animal_gender,
      animal_type,
      animal_age,
      animal_status,
      rescue_location,
      id_adopter,
      date,
      note,
      updated_by,
      updated_at,
      status,
      id_shelter,
      id_animal
    );
    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: true, message: "failed to update data" });
  }
});

router.post("/updateAnimalMedicalId", async (req, res) => {
  const { id_shelter, id_animal, id_medical_id } = req.body;
  if (id_shelter == null || id_animal == null || id_medical_id == null) {
    return res.status(400).send({
      error: true,
      message: "Please provide all required data.",
    });
  }
  try {
    const result = await updateAnimalMedicalId(
      id_shelter,
      id_animal,
      id_medical_id
    );
    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: true, message: "failed to update data" });
  }
});

router.post("/deleteAnimalData", async (req, res) => {
  const { id_shelter, id_adopter } = req.body;
  try {
    const result = await deleteAnimalData(id_shelter, id_adopter);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: true, message: "failed to delete data" });
  }
});

module.exports = router;
