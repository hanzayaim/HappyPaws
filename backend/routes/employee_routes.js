const express = require("express");
const router = express.Router();
const {
  getEmployeeDataById,
  getEmployeeData,
  insertEmployeeData,
  updateEmployeeStatus,
  deleteEmployeeData,
} = require("../models/employee_models");

router.get("/getEmployeeData/:id_shelter", async (req, res) => {
  const { id_shelter } = req.params;
  try {
    const result = await getEmployeeData(id_shelter);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: true, message: "failed to get data" });
  }
});

router.get(
  "/getEmployeeDataById/:id_shelter/:id_employee",
  async (req, res) => {
    const { id_shelter, id_employee } = req.params;
    try {
      const result = await getEmployeeDataById(id_shelter, id_employee);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: true, message: "failed to get data" });
    }
  }
);

router.post("/insertEmployeeData", async (req, res) => {
  const {
    id_shelter,
    id_employee,
    name,
    email,
    password,
    role,
    gender,
    shelter_name,
    phone_number,
    address,
    status,
  } = req.body;
  if (
    id_shelter == null ||
    id_employee == null ||
    name == null ||
    email == null ||
    password == null ||
    role == null ||
    gender == null ||
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
    const result = await insertEmployeeData(
      id_shelter,
      id_employee,
      name,
      email,
      password,
      role,
      gender,
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

router.post("/updateEmployeeStatus", async (req, res) => {
  const { status, id_shelter, id_employee } = req.body;
  if (id_shelter == null || status == null || id_employee == null) {
    return res.status(400).send({
      error: true,
      message: "Please provide all required data.",
    });
  }
  try {
    const result = await updateEmployeeStatus(id_shelter, status, id_employee);
    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: true, message: "failed to update data" });
  }
});

router.post("/deleteEmployeeData", async (req, res) => {
  const { id_shelter, id_employee } = req.body;
  try {
    const result = await deleteEmployeeData(id_shelter, id_employee);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: true, message: "failed to delete data" });
  }
});

module.exports = router;
