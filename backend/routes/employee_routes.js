const express = require("express");
const router = express.Router();
const pool = require("../config/db.js");
const bcrypt = require("bcrypt");

const {
  getEmployeeDataById,
  getEmployeeData,
  updateEmployeeStatus,
  deleteEmployeeData,
  getShelterIdByEmployee,
  getEmployeePassByEmail,
} = require("../models/employee_models");

const {
  sendApprovalEmail,
  sendRejectionEmail,
  sendActivationEmail,
  sendDeactivationEmail,
} = require("../routes/send_email");

const { insertNewEmployee } = require("../controllers/employee_controller");

const STATUS = {
  NEW: "New",
  ACTIVE: "Active",
  INACTIVE: "Inactive",
};

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
  const { status, id_shelter, id_employee, email } = req.body;
  if (
    id_shelter == null ||
    status == null ||
    id_employee == null ||
    email == null
  ) {
    return res.status(400).send({
      error: true,
      message: "Please provide all required data.",
    });
  }

  try {
    currentEmployee = await getEmployeeDataById(id_shelter, id_employee);

    if (!currentEmployee || !currentEmployee.data) {
      return res.status(404).json({
        error: true,
        message: "Employee not found",
      });
    }

    const currentStatus = currentEmployee.data.status;

    let validTransition = true;
    let errorMessage = "";

    if (status === STATUS.ACTIVE) {
      if (currentStatus === STATUS.NEW || currentStatus === STATUS.INACTIVE) {
        isValidTransition = true;
      } else {
        errorMessage = "Only 'New' or 'Inactive' employees can be activated";
      }
    } else if (status === STATUS.INACTIVE) {
      if (currentStatus === STATUS.NEW || currentStatus === STATUS.ACTIVE) {
        isValidTransition = true;
      } else {
        errorMessage =
          "Only 'New' or 'Active' employees can be deactivated/rejected";
      }
    } else {
      errorMessage = "Invalid status value";
    }

    if (!validTransition) {
      return res.status(400).json({
        error: true,
        message: errorMessage,
      });
    }

    const result = await updateEmployeeStatus(status, id_shelter, id_employee);

    try {
      if (status === STATUS.ACTIVE) {
        if (currentStatus === STATUS.NEW) {
          await sendApprovalEmail(email);
        } else if (currentStatus === STATUS.INACTIVE) {
          await sendActivationEmail(email);
        }
      } else if (status === STATUS.INACTIVE) {
        if (currentStatus === STATUS.NEW) {
          await sendRejectionEmail(email);
        } else if (currentStatus === STATUS.ACTIVE) {
          await sendDeactivationEmail(email);
        }
      }
    } catch (emailError) {
      console.error("Error sending email:", emailError);
    }

    res.status(200).json(result);
  } catch {
    console.error("Error updating shelter status:", error);
    res.status(500).json({ error: true, message: "Failed to update status" });
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

router.post("/updatePassword", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const { rows } = await pool.query(
      "UPDATE employee_shelter SET password = $1 WHERE email = $2 RETURNING *",
      [hashedPassword, email]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ error: true, message: "Employee not found" });
    }

    res.status(200).json({
      error: false,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: true, message: "Failed to update password" });
  }
});

module.exports = router;
