const { insertIncomeData, deleteIncomeData, getIncomeById, updateIncomeData } = require("../models/income_models.js");
const { getFinance, increaseBalance,decreaseBalance, updateBalance } = require("../models/finance_models.js");
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
    const finance = await getFinance(id_shelter);
    const newBalance = await increaseBalance(
      finance.data[0].id_finance,
      id_shelter,
      amount
    );
    
    await updateBalance(
      newBalance,
      finance.data[0].id_finance,
      id_shelter,
    );
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
      const income = await getIncomeById(id_shelter,id_income);
      const finance = await getFinance(id_shelter);
      const newBalance = await decreaseBalance(
        finance.data[0].id_finance,
        id_shelter,
        income.data.amount
      );
      await updateBalance(
        newBalance,
        finance.data[0].id_finance,
        id_shelter,
      );
      const result = await deleteIncomeData(
        id_shelter,id_income
      );
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
    const incomedata = await getIncomeById(id_shelter,id_income);
    const currentAmount = incomedata.data.amount
    if (currentAmount != amount) {
      const finance = await getFinance(id_shelter);
      const currentBalance = finance.data[0].total_balance;
      const newBalance = (currentBalance - currentAmount) + amount;
      await updateBalance(
        newBalance,
        finance.data[0].id_finance,
        id_shelter,
      );
    }
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
    return result;
  } catch (error) {
    console.error(error)
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
