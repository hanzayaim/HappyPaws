const { insertSalaryData, deleteSalaryData }= require("../models/salary_models.js");
const { insertExpenses, deleteExpensesById }= require("../controllers/expenses_controller.js");

const generateId = require("../config/generate_id");
const { updateTotalBalance } = require("./finance_controller.js");


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
        const result1 = await insertSalaryData(
            id_salary,
            id_shelter,
            id_employee,
            name,
            cost,
            date,
            note,
            created_by
        );
        const result2 = await insertExpenses(
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
            data: {result1,result2}
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
        await deleteExpensesById(id_shelter,id_salary)
        const result = await deleteSalaryData(
            id_shelter,
            id_salary
        );
        updateTotalBalance(id_shelter);
        return {
            error: false,
            message: "Delete Salary data successfully",
            data: result
          };
        } catch (error) {
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