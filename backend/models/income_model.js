const pool = require("../config/db.js");
const {
insertFinanceData
} = require("../models/finance_model.js");

async function getIncome(id_shelter) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM income WHERE id_shelter = $1",
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

  async function insertIncomeData(
    id_income,
    id_shelter,
    name,
    amount,
    date,
    type,
    note,
    created_by,
  ) {
    try {
        const result = await pool.query(
        "INSERT INTO income (id_income, id_shelter, name, amount, date, type,  note, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
        [
            id_income,
            id_shelter,
            name,
            amount,
            date,
            type,
            note,
            created_by,
        ]
      );

      //insert to finance
      // const id_finance = uuid()
      await insertFinanceData({
        id_finance,
        id_shelter,
        id_income,
        amount,
        note,
        created_by,
      }); 
      
      return {
        error: false,
        message: "adopter created successfully",
        data: result.rows[0],
      };
    } catch (error) {
      return {
        error: true,
        message: "error creating adopter",
        data: null,
      };
    }
  }
  async function deleteIncomeData(id_shelter,id_income){
    try {
        const result = await pool.query(
          "DELETE FROM income WHERE id_income = $1 AND id_shelter = $2", 
          [id_income,id_shelter]
        );
      
        if (result.rowCount === 0) {
          return {
            error: true,
            message: "Income data not found",
            data: null,
          };
        }
        return {
          error: false,
          message: "Income deleted successfully",
          data: result.rows[0],
        };
      } catch (error) {
        console.error("Error deleting salary:", error);
        return {
          error: true,
          message: "Error deleting salary",
          data: null,
        };
      }
  }
  async function updateIncomeData(
    id_income,
    id_shelter,
    name,
    amount,
    date,
    type,
    note,
    update_by
  ) {
    try {
      const updated_at = new Date();
      const result = await pool.query(
        "UPDATE income SET name=$1, amount=$2, date=$3, type=$4, note=$5, updated_at=$6, update_by=$7 WHERE id_shelter=$8 AND id_income=$9",
        [
            name,
            amount,
            date,
            type,
            note,
            updated_at,
            update_by,
            id_shelter,
            id_income,
        ]
      );
      return {
        error: false,
        message: "adopter updated successfully",
        adopter: result.rows[0],
      };
    } catch (error) {
      return {
        error: true,
        message: "error updating adopter",
        data: null,
      };
    }
  }
  module.exports = { deleteIncomeData, insertIncomeData, updateIncomeData, getIncome };