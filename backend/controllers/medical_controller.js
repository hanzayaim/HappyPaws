const generateId = require("../config/generate_id");
const {
  insertMedicalData,
  deleteMedicalData,
  updateMedicalData,
} = require("../models/medical_models");
const {
  insertExpenses,
  deleteExpensesById,
} = require("../controllers/expenses_controller");
const { updateTotalBalance } = require("./finance_controller");

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

    await insertExpenses(
      id_shelter,
      (id_food = null),
      id_medical,
      (id_equipment = null),
      (id_salary = null),
      created_by
    );

    return resultMedical;
  } catch (error) {
    throw error;
  }
};

const updateMedical = async (
  medical_status,
  vaccin_status,
  medical_date_in,
  medical_date_out,
  medical_cost,
  note,
  updated_by,
  id_shelter,
  id_animal,
  id_medical
) => {
  try {
    const updated_at = new Date();
    const resultMedical = await updateMedicalData(
      medical_status,
      vaccin_status,
      medical_date_in,
      medical_date_out,
      medical_cost,
      note,
      updated_by,
      updated_at,
      id_shelter,
      id_animal,
      id_medical
    );

    updateTotalBalance(id_shelter);

    return resultMedical;
  } catch (error) {
    throw error;
  }
};

const deleteMedical = async (id_shelter, id_medical, id_animal) => {
  try {
    await deleteExpensesById(id_shelter, id_medical);
    const resultMedical = await deleteMedicalData(
      id_shelter,
      id_medical,
      id_animal
    );

    updateTotalBalance(id_shelter);

    return resultMedical;
  } catch (error) {
    throw error;
  }
};

module.exports = { insertMedical, updateMedical, deleteMedical };
