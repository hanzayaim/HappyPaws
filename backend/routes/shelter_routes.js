const express = require("express");
const router = express.Router();
const {
  getShelterDataById,
  getShelterData,
  insertShelterData,
  updateShelterStatus,
  deleteShelterData,
} = require("../models/shelter_models");

router.get("/getShelterData", async (req, res) => {
  try {
    const result = await getShelterData();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: true, message: "failed to get data" });
  }
});

router.get("/getShelterDataById/:id_shelter", async (req, res) => {
  const { id_shelter } = req.params;
  try {
    const result = await getShelterDataById(id_shelter);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: true, message: "failed to get data" });
  }
});

router.post("/insertShelterData", async (req, res) => {
  const {
    id_shelter,
    owner_name,
    email,
    password,
    shelter_name,
    phone_number,
    address,
    status,
  } = req.body;
  if (
    id_shelter == null ||
    owner_name == null ||
    email == null ||
    password == null ||
    shelter_name == null ||
    phone_number == null ||
    address == null ||
    status == null
  ) {
    return res.status(400).send({
      error: true,
      message: "Please provide all required data.",
    });
  }
  try {
    const result = await insertShelterData(
      id_shelter,
      owner_name,
      email,
      password,
      shelter_name,
      phone_number,
      address,
      status
    );
    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: true, message: "failed to insert data" });
  }
});

router.post("/updateShelterStatus", async (req, res) => {
  const { status, id_shelter } = req.body;
  if (id_shelter == null || status == null) {
    return res.status(400).send({
      error: true,
      message: "Please provide all required data.",
    });
  }
  try {
    const result = await updateShelterStatus(id_shelter, status);
    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: true, message: "failed to update data" });
  }
});

router.post("/deleteShelterData", async (req, res) => {
  const { id_shelter } = req.body;
  try {
    const result = await deleteShelterData(id_shelter);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: true, message: "failed to delete data" });
  }
});

module.exports = router;
