const pool = require("../config/db.js");
const {
insertFinanceData
} = require("../models/finance_model.js");
const {
deleteFoodData
} = require("../models/food_model.js");
const {
deleteMedicalData
} = require("../models/medical_model.js");
const {
deleteEquipmentData
} = require("../models/equipment_model.js");
const {
deleteSalary
} = require("../models/salary_model.js");



/*
    id_expenses ,
	id_shelter,
	id_food,
	id_medical,
	id_equipment,
	id_salary,
	"name",
	"cost",
	"date",
	note,
	created_at ,
	created_by,
	updated_at,
	updated_by
*/

async function getExpenses(id_shelter) {
    try {
      const [rows] = await pool.query(
        `
        SELECT
        ex.id_expenses ,
        ex.id_shelter,
        ex.id_food,
        ex.id_medical,
        ex.id_equipment,
        ex.id_salary,
        CASE 
          WHEN ex.id_food IS NOT NULL THEN f.name
          WHEN ex.id_medical IS NOT NULL THEN 'Medical'
          WHEN ex.id_equipment IS NOT NULL THEN e.name
          WHEN ex.id_salary IS NOT NULL THEN s.name
          ELSE NULL
        END AS name,
        
        CASE 
          WHEN ex.id_food IS NOT NULL THEN f.cost
          WHEN ex.id_medical IS NOT NULL THEN m.medical_cost
          WHEN ex.id_equipment IS NOT NULL THEN e.cost
          WHEN ex.id_salary IS NOT NULL THEN s.cost
          ELSE NULL
        END AS cost,

        CASE 
          WHEN ex.id_food IS NOT NULL THEN f.date
          WHEN ex.id_medical IS NOT NULL THEN m.medical_date_out
          WHEN ex.id_equipment IS NOT NULL THEN e.date
          WHEN ex.id_salary IS NOT NULL THEN s.date
          ELSE NULL
        END AS date,

        CASE 
          WHEN ex.id_food IS NOT NULL THEN f.note
          WHEN ex.id_medical IS NOT NULL THEN m.note
          WHEN ex.id_equipment IS NOT NULL THEN e.note
          WHEN ex.id_salary IS NOT NULL THEN s.note
          ELSE NULL
        END AS note,
        FROM expenses ex
        WHERE ex.id_shelter = ?
        LEFT JOIN food f ON f.id_food = e.id_food
        LEFT JOIN medical m ON f.id_expenses = e.id_expenses
        LEFT JOIN equipment e ON f.id_expenses = e.id_expenses
        LEFT JOIN salary s ON f.id_expenses = e.id_expenses
        ORDER BY ex.created_at DESC;
        `,
        [id_shelter]
      );
      if (rows.length > 0) {
        return {
          error: false,
          message: "data fetched successfully",
          data: rows[0],
        };
      } else {
        return {
          error: true,
          message: "no data found",
          data: null,
        };
      }
    } catch (error) {
      return {
        error: true,
        message: "error fetching data",
        data: null,
      };
    }
}
async function insertExpensesData(
  id_expenses ,
	id_shelter,
	id_food  = null,
	id_medical  = null,
	id_equipment  = null,
	id_salary  = null,
  amount,
  created_by,
) {
    try {
      const result = await pool.query(
        "INSERT INTO expenses (id_expenses, id_shelter, id_food, id_medical, id_equipment,created_by) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
        [
            id_expenses ,
            id_shelter,
            id_food,
            id_medical,
            id_equipment,
            id_salary,
            created_by,
        ]
      );
        await insertFinanceData({
          id_finance,
          id_shelter,
          id_expenses,
          amount,
          note,
          created_by,
        }); 
      return {
        error: false,
        message: "Expenses data created successfully",
        data: result.rows[0],
      };
    } catch (error) {
      return {
        error: true,
        message: "error creating Expenses data",
        data: null,
      };
    }
}
async function deleteExpensesData(id_shelter,id_expenses){
    try {
      const ExpensesRes = await pool.query(
        `
        SELECT  
        id_food,
        id_medical,
        id_equipment,
        id_salary 
        FROM expenses WHERE id_expenses = ? AND id_shelter = ?
        `,
        [id_expenses,id_shelter]
      );
      const {
        id_food,
        id_medical,
        id_equipment,
        id_salary
      } = ExpensesRes.rows[0];

      if (id_food) {
        await deleteFoodData(id_shelter, id_food)
      }
      if (id_medical) {
        await deleteMedicalData(id_shelter, id_medical)
      }
      if (id_equipment) {
        await deleteEquipmentData(id_shelter, id_equipment)
      }
      if (id_salary) {
        await deleteSalary(id_shelter,id_salary)
      }
        const result = await pool.query(
          "DELETE FROM expenses WHERE id_expenses = ? AND id_shelter = ?", 
          [id_expenses,id_shelter]
        );
      
        if (result.rowCount === 0) {
          return {
            error: true,
            message: "Expenses data not found",
            data: null,
          };
        }
        return {
          error: false,
          message: "Expenses deleted successfully",
          data: result.rows[0],
        };
      } catch (error) {
        console.error("Error deleting Expenses:", error);
        return {
          error: true,
          message: "Error deleting Expenses",
          data: null,
        };
      }
}

  

  module.exports = { deleteExpensesData, insertExpensesData,getExpenses};