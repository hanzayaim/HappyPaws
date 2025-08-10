const {
  insertIncomeData,
  deleteIncomeData,
  updateIncomeData,
} = require("../models/income_models.js");
const {
  updateTotalBalance,
  updateProfit,
} = require("../controllers/finance_controller.js");
const generateId = require("../config/generate_id");

const insertIncome = async (
  id_shelter,
  name,
  amount,
  date,
  type,
  note,
  created_by
) => {
  const id_income = "INCOME-" + generateId();
  try {
    const result = await insertIncomeData(
      id_income,
      id_shelter,
      name,
      amount,
      date,
      type,
      note,
      created_by
    );
    await updateTotalBalance(id_shelter);
    return result;
  } catch (error) {
    throw error;
  }
};

const deleteIncome = async (id_shelter, id_income) => {
  try {
    const result = await deleteIncomeData(id_shelter, id_income);
    await updateTotalBalance(id_shelter);
    return result;
  } catch (error) {
    throw error;
  }
};

const updateIncome = async (
  id_income,
  id_shelter,
  name,
  amount,
  date,
  type,
  note,
  update_by
) => {
  try {
    const result = await updateIncomeData(
      id_income,
      id_shelter,
      name,
      amount,
      date,
      type,
      note,
      update_by
    );
    updateTotalBalance(id_shelter);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  insertIncome,
  deleteIncome,
  updateIncome,
};
