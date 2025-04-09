const express = require("express");
const router = express.Router();

const adopterRoutes = require("./adopter_routes");
const animalRoutes = require("./animal_routes");
const employeeRoutes = require("./employee_routes");
const foodRoutes = require("./food_routes");
const equipmentRoutes = require("./equipment_routes");
const medicalRoutes = require("./medical_routes");
const shelterRoutes = require("./shelter_routes");

router.use("/adopters", adopterRoutes);
router.use("/animals", animalRoutes);
router.use("/employees", employeeRoutes);
router.use("/food", foodRoutes);
router.use("/equipment", equipmentRoutes);
router.use("/medical", medicalRoutes);
router.use("/shelters", shelterRoutes);

module.exports = router;
