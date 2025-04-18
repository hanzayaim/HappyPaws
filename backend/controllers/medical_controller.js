const generateId = require("../config/generate_id");
const  { insertMedicalData, deleteMedicalData } = require("../models/medical_models");
const { updateAnimalStatus } = require("../models/animal_models");
const { insertExpenses } = require("../controllers/expenses_controller");

const insertMedical = async (
    medical_status,
    vaccin_status,
    medical_date_in,
    medical_date_out,
    medical_cost,
    note,
    created_by,
    id_shelter,
    id_animal
) => {
    const id_medical = "MEDICAL-" + generateId();

    try {
        const resultMedical = await insertMedicalData(
            id_medical,
            medical_status,
            vaccin_status,
            medical_date_in,
            medical_date_out,
            medical_cost,
            note,
            created_by,
            id_shelter,
            id_animal
        );

        const resultExpenses = await insertExpenses(
            id_shelter,
            id_food = null,
            id_medical,
            id_equipment = null,
            id_salary = null,
            created_by
        );

        const animal_status = (medical_status === "Healthy") ? "Available" : "Not Available";
        const resultAnimalStatus = await updateAnimalStatus(animal_status, created_by, id_shelter, id_animal);

        return { resultMedical, resultExpenses, resultAnimalStatus };
    } catch (error) {
        console.error(error);
        return {
            error: true,
            message: "Failed to insert medical.",
            result: null
        };
    }
};

const deleteMedical = async (
    id_shelter, id_medical, id_animal
  ) => {
    try {
      const result = await deleteMedicalData(id_shelter, id_medical, id_animal);
      return result;
    } catch (error) {
      return {
        error: true,
        message: "Failed to delete Expenses data.",
        result: null,
      };
    }
  };

module.exports = { insertMedical, deleteMedical }