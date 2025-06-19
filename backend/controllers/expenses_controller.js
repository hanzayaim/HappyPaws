const {
  insertExpensesData,
  deleteExpensesData,
  getExpenses,
} = require("../models/expenses_models");
const generateId = require("../config/generate_id");
const { updateTotalBalance } = require("./finance_controller.js");

const insertExpenses = async (
  id_shelter,
  id_food,
  id_medical,
  id_equipment,
  id_salary,
  created_by
) => {
  const id_expenses = "EXPENSES-" + generateId();
  if (id_food) {
    id_medical = null;
    id_equipment = null;
    id_salary = null;
  }
  if (id_medical) {
    id_food = null;
    id_equipment = null;
    id_salary = null;
  }
  if (id_equipment) {
    id_food = null;
    id_medical = null;
    id_salary = null;
  }
  if (id_salary) {
    id_food = null;
    id_medical = null;
    id_equipment = null;
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

    updateTotalBalance(id_shelter);
    return result;
  } catch (error) {
    return {
      error: true,
      message: "Failed to insert expenses data.",
      result: null,
    };
  }
};

const deleteExpenses = async (id_shelter, id_expenses) => {
  try {
    const result = await deleteExpensesData(id_shelter, id_expenses);
    return result;
  } catch (error) {
    return {
      error: true,
      message: "Failed to delete Expenses data.",
      result: null,
    };
  }
};

const deleteExpensesById = async (id_shelter, table_id) => {
  try {
    const expenses = await getExpenses(id_shelter);
    const findExpense = expenses.data.find(
      (expense) =>
        expense.id_food === table_id ||
        expense.id_medical === table_id ||
        expense.id_equipment === table_id ||
        expense.id_salary === table_id
    );
    let result;
    if (findExpense) {
      result = await deleteExpensesData(id_shelter, findExpense.id_expenses);
    }
    return result;
  } catch (error) {
    return {
      error: true,
      message: "Failed to delete Expenses data.",
      result: null,
    };
  }
};

module.exports = {
  insertExpenses,
  deleteExpenses,
  deleteExpensesById,
};
