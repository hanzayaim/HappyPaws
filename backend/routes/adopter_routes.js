const express = require("express");
const router = express.Router();
const {
  getAdopterData,
  getAdopterDataById,
  updateAdopterData,
  deleteAdopterData,
} = require("../models/adopter_models");
const { insertNewAdopter } = require("../controllers/adopter_controller");

router.get("/getAdopterData/:id_shelter", async (req, res) => {
  const { id_shelter } = req.params;
  try {
    const result = await getAdopterData(id_shelter);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: true, message: "failed to get data" });
  }
});

router.get("/getAdopterDataById/:id_shelter/:id_adopter", async (req, res) => {
  const { id_shelter, id_adopter } = req.params;
  try {
    const result = await getAdopterDataById(id_shelter, id_adopter);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: true, message: "failed to get data" });
  }
});

router.post("/insertAdopterData", async (req, res) => {
  const {
    id_shelter,
    adopter_name,
    profile_img,
    gender,
    phone_number,
    address,
    createdby,
  } = req.body;
  if (
    id_shelter == null ||
    adopter_name == null ||
    gender == null ||
    phone_number == null ||
    address == null ||
    createdby == null
  ) {
    return res.status(400).send({
      error: true,
      message: "Please provide all required data.",
    });
  }
  try {
    const result = await insertNewAdopter(
      id_shelter,
      adopter_name,
      profile_img,
      gender,
      phone_number,
      address,
      createdby
    );
    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: true, message: "failed to insert data" });
  }
});

router.post("/updateAdopterData", async (req, res) => {
  const {
    adopter_name,
    profile_img,
    gender,
    phone_number,
    address,
    updated_by,
    id_shelter,
    id_adopter,
  } = req.body;
  if (
    adopter_name == null ||
    profile_img == null ||
    gender == null ||
    phone_number == null ||
    address == null ||
    updated_by == null ||
    id_shelter == null ||
    id_adopter == null
  ) {
    return res.status(400).send({
      error: true,
      message: "Please provide all required data.",
    });
  }
  try {
    const result = await updateAdopterData(
      adopter_name,
      profile_img,
      gender,
      phone_number,
      address,
      updated_by,
      id_shelter,
      id_adopter
    );
    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: true, message: "failed to update data" });
  }
});

router.post("/deleteAdopterData", async (req, res) => {
  const { id_shelter, id_adopter } = req.body;
  try {
    const result = await deleteAdopterData(id_shelter, id_adopter);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: true, message: "failed to delete data" });
  }
});

module.exports = router;
