const { insertIncomeData, deleteIncomeData, getIncomeById, updateIncomeData } = require("../models/income_models.js");
const { getFinance, increaseBalance,decreaseBalance, updateBalance } = require("../models/finance_models.js");
const{  updateTotalBalance, updateProfit } = require("../controllers/finance_controller.js");
const generateId = require("../config/generate_id");

/**
 * Insert Table Income -> Update Id table Finance
 * Delete Table Income -> Update Id table Finance
 */
const insertIncome = async (
  id_shelter,
  name,
  amount,
  date,
  type,
  note,
  created_by,
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
    // update total balance
    await updateTotalBalance(id_shelter);
    return {
      error: false,
      message: "Income data created successfully",
      data: result
    };
    } catch (error) {
      return {
        error: true,
        message: "Failed to insert income data.",
        result: null,
      };
    }
  };
  
  const deleteIncome = async (
    id_shelter,id_income
  ) => {
    try {
      const result = await deleteIncomeData(
        id_shelter,id_income
      );
      await updateTotalBalance(id_shelter);
      return result
    } catch (error) {
      return {
        error: true,
        message: "Failed to delete income data.",
        result: null,
      };
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
) =>{
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
    return{
      error: true,
      message: "Failed to update income data.",
      result: null,
    };
  }
};

module.exports = {
  insertIncome,deleteIncome,updateIncome
};
