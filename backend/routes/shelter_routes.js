const express = require("express");
const router = express.Router();
const app = express();
app.use(express.json());

const {
  getShelterDataById,
  getShelterData,
  getShelterIdByEmail,
  updateShelterStatus,
  deleteShelterData,
  getShelterPassByEmail,
} = require("../models/shelter_models");

const {
  sendShelterRegistrationNotificationEmail,
  sendApprovalEmail,
  sendRejectionEmail,
  sendActivationEmail,
  sendDeactivationEmail,
} = require("../routes/send_email");

const { insertNewShelter } = require("../controllers/shelter_controller");

const STATUS = {
  NEW: "New",
  ACTIVE: "Active",
  INACTIVE: "Inactive",
};

router.get("/getShelterData", async (req, res) => {
  try {
    const result = await getShelterData();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: true, message: "failed to get data" });
  }
});

router.post("/getShelterIdByEmail", async (req, res) => {
  const { email } = req.body;
  try {
    const result = await getShelterIdByEmail(email);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: true, message: "failed to get data" });
  }
});

router.post("/getShelterPassByEmail", async (req, res) => {
  const { email } = req.body;
  try {
    const result = await getShelterPassByEmail(email);
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

router.post("/insertShelter", async (req, res) => {
  const { owner_name, email, password, shelter_name, phone_number, address } =
    req.body;
  if (
    owner_name == null ||
    email == null ||
    password == null ||
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
    const result = await insertNewShelter(
      owner_name,
      email,
      password,
      shelter_name,
      phone_number,
      address
    );

    try {
      await sendShelterRegistrationNotificationEmail(email);
    } catch (emailError) {
      console.error(emailError);
    }

    res.status(200).json(result);
  } catch (error) {
    if (error.code === "23505") {
      const constraint = error.constraint;

      if (constraint === "shelter_email_key") {
        return res
          .status(400)
          .json({ error: true, message: "email already exists" });
      }

      if (constraint === "shelter_phone_number_key") {
        return res
          .status(400)
          .json({ error: true, message: "phone_number already exists" });
      }

      if (constraint === "shelter_shelter_name_key") {
        return res
          .status(400)
          .json({ error: true, message: "shelter_name already exists" });
      }

      return res.status(400).json({ error: true, message: "duplicate key" });
    }

    res.status(500).json({ error: true, message: "Internal server error" });
  }
});

router.post("/updateShelterStatus", async (req, res) => {
  const { status, id_shelter, email } = req.body;

  if (id_shelter == null || status == null || email == null) {
    return res.status(400).send({
      error: true,
      message: "Please provide all required data.",
    });
  }

  try {
    const currentShelter = await getShelterDataById(id_shelter);

    if (!currentShelter || !currentShelter.data) {
      return res.status(404).json({
        error: true,
        message: "Shelter not found",
      });
    }

    const currentStatus = currentShelter.data.status;

    let validTransition = true;
    let errorMessage = "";

    if (status === STATUS.ACTIVE) {
      if (currentStatus === STATUS.NEW || currentStatus === STATUS.INACTIVE) {
        isValidTransition = true;
      } else {
        errorMessage = "Only 'New' or 'Inactive' shelters can be activated";
      }
    } else if (status === STATUS.INACTIVE) {
      if (currentStatus === STATUS.NEW || currentStatus === STATUS.ACTIVE) {
        isValidTransition = true;
      } else {
        errorMessage =
          "Only 'New' or 'Active' shelters can be deactivated/rejected";
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

    const result = await updateShelterStatus(status, id_shelter);

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
  } catch (error) {
    console.error("Error updating shelter status:", error);
    res.status(500).json({ error: true, message: "Failed to update status" });
  }
});

router.post("/deleteShelterData", async (req, res) => {
  const { id_shelter } = req.body;
  if (!id_shelter) {
    return res
      .status(400)
      .json({ error: true, message: "id_shelter is required" });
  }
  try {
    const result = await deleteShelterData(id_shelter);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: true, message: "failed to delete data" });
  }
});

module.exports = router;
