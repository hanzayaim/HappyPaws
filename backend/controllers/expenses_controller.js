const { insertExpensesData, getExpensesById, deleteExpensesData, updateExpensesData } = require("../models/expenses_models");
const { getFinance, decreaseBalance, increaseBalance, updateBalance } = require("../models/finance_models.js");
const { getFoodDataById } = require("../models/food_models.js");
const { getMedicalDataById } = require("../models/medical_models.js");
const { getEquipmentDataById } = require("../models/equipment_models.js");
const { getSalary, getSalaryById } = require("../models/salary_models.js");
const { getAnimalData } = require("../models/animal_models.js");
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
  let amount = null;
  if (id_food) {
    id_medical= null;
    id_equipment= null;
    id_salary= null;
    const food = await getFoodDataById(id_shelter,id_food);
    amount = food.data[0].cost;
  }
  if (id_medical) {
    id_food= null;
    id_equipment= null;
    id_salary= null; 
    const medical = await getMedicalDataById(id_shelter,id_medical);
    amount = medical.data[0].medical_cost;
  }
  if (id_equipment) {
    id_food= null;
    id_medical= null;
    id_salary= null;
    const equipment = await getEquipmentDataById(id_shelter,id_equipment);
    amount = equipment.data[0].cost;
  }
  if (id_salary) {
    id_food= null;
    id_medical= null;
    id_equipment= null;
    const salary = await getSalaryById(id_shelter,id_salary);
    amount = salary.data[0].cost;
    console.log(amount);
  }
  try {

    const finance = await getFinance(id_shelter);
    const newBalance = await decreaseBalance(
      finance.data[0].id_finance,
      id_shelter,
      amount
    );
    await updateBalance(
      newBalance,
      finance.data[0].id_finance,
      id_shelter,
    );
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
    console.error(error)
    return {
      error: true,
      message: "Failed to insert expenses data.",
      result: null,
    };
  }
};

const deleteExpenses = async (
  id_shelter,id_expenses
) => {
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

module.exports = {
  insertExpenses,deleteExpenses
};
