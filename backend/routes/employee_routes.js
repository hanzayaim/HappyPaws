const express = require("express");
const router = express.Router();
const {
  getEmployeeDataById,
  getEmployeeData,
  updateEmployeeStatus,
  deleteEmployeeData,
  getShelterIdByEmployee,
  getEmployeePassByEmail,
} = require("../models/employee_models");
const { insertNewEmployee } = require("../controllers/employee_controller");

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

router.post("/getShelterIdByEmployee", async (req, res) => {
  const { email } = req.body;
  try {
    const result = await getShelterIdByEmployee(email);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: true, message: "failed to get data" });
  }
});

router.post("/getEmployeePassByEmail", async (req, res) => {
  const { email } = req.body;
  try {
    const result = await getEmployeePassByEmail(email);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: true, message: "failed to get data" });
  }
});

router.post("/insertEmployee", async (req, res) => {
  const {
    id_shelter,
    name,
    email,
    password,
    role,
    gender,
    shelter_name,
    phone_number,
    address,
  } = req.body;
  if (
    id_shelter == null ||
    name == null ||
    email == null ||
    password == null ||
    role == null ||
    gender == null ||
    shelter_name == null ||
    phone_number == null ||
    address == null
  ) {
    return res.status(400).send({
      error: true,
      message: "Please provide all required data.",
    });
  }
  try {
    const result = await insertNewEmployee(
      id_shelter,
      name,
      email,
      password,
      role,
      gender,
      shelter_name,
      phone_number,
      address
    );
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    if (error.code === "23505") {
      const constraint = error.constraint;

      if (constraint === "employee_shelter_email_key") {
        return res
          .status(400)
          .json({ error: true, message: "email already exists" });
      }

      if (constraint === "employee_shelter_phone_number_key") {
        return res
          .status(400)
          .json({ error: true, message: "phone_number already exists" });
      }

      return res.status(400).json({ error: true, message: "duplicate key" });
    }

    res.status(500).json({ error: true, message: "Internal server error" });
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
    const result = await updateEmployeeStatus(status, id_shelter, id_employee);
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
