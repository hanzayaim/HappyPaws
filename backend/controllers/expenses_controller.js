const { insertExpensesData } = require("../models/expenses_models");

const generateId = require("../config/generate_id");

const insertExpenses = async (
  id_shelter,
  id_food,
  id_medical,
  id_equipment,
  id_salary,
  created_by
) => {
  const id_expenses = "EXPENSES-" + generateId();

  if (!id_food) {
    id_food = null;
  }

  if (!id_medical) {
    id_medical = null;
  }

  if (!id_equipment) {
    id_equipment = null;
  }

  if (!id_salary) {
    id_salary = null;
  }

  try {
    const result = await insertExpensesData(
      id_expenses,
      id_shelter,
      id_food,
      id_medical,
      id_equipment,
      id_salary,
      created_by
    );
    return result;
  } catch (error) {
    return {
      error: true,
      message: "Failed to insert expenses data.",
      result: null,
    };
  }
};

module.exports = {
  insertExpenses,
};
