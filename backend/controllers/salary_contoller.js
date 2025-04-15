const { insertSalaryData, deleteSalaryData, getSalaryById }= require("../models/salary_models.js");
const { insertExpenses, deleteExpenses }= require("../controllers/expenses_controller.js");

const generateId = require("../config/generate_id");
const { getExpenses } = require("../models/expenses_models.js");
const { getFinance, increaseBalance, updateBalance } = require("../models/finance_models.js");


const insertSalary = async (
    id_shelter, 
    id_employee, 
    name, 
    cost, 
    date, 
    note, 
    created_by
  ) => {
    const id_salary = "SALARY-" + generateId();
    try {
        await insertSalaryData(
            id_salary,
            id_shelter,
            id_employee,
            name,
            cost,
            date,
            note,
            created_by
        );
        const result = await insertExpenses(
            id_shelter,
            id_food = null,
            id_medical = null,
            id_equipment = null,
            id_salary,
            created_by
        );
        
        return {
            error: false,
            message: "Salary data created successfully",
            data: result
          };
        } catch (error) {
            
            return {
                error: true,
                message: "Failed create Salary Data",
                data: null
            };
        }    
    };

const deleteSalary = async (
    id_shelter,
    id_salary
  ) => {
    try {
        const expenses = await getExpenses(id_shelter);
        const dataExpenses = expenses.data.find(expense => expense.id_salary === id_salary);
        await deleteExpenses(id_shelter, dataExpenses.id_expenses);
        const amount = await getSalaryById(id_shelter,id_salary);
        const finance = await getFinance(id_shelter);
        const newBalance = await increaseBalance(
            finance.data[0].id_finance,
            id_shelter,
            amount.data[0].cost
        );

        await updateBalance(
            newBalance,
            finance.data[0].id_finance,
            id_shelter,
        );
        const result = await deleteSalaryData(
            id_shelter,
            id_salary
        );
        return {
            error: false,
            message: "Delete Salary data successfully",
            data: result
          };
        } catch (error) {
            console.error(error)
            return {
                error: true,
                message: "Failed delete Data",
                data: null
            };
        }    
    };


  module.exports = {
    insertSalary,deleteSalary
  };