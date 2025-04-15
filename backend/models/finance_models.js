const pool = require("../config/db.js");

  async function getFinance(id_shelter) {
    try {
      const {rows} = await pool.query(
        ` 
        SELECT *
        FROM finance 
        WHERE id_shelter = $1
        ORDER BY created_at DESC;
        `,
        [id_shelter]
      );
      if (rows.length > 0) {
        return {
          error: false,
          message: "data fetched successfully",
          data: rows,
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
  async function insertFinanceData(
    id_finance, 
    id_shelter,
    id_income,
    id_expenses,
    total_balance,
    note,
    created_by
  ) {
    try {
      const result = await pool.query(
        "INSERT INTO finance (id_finance, id_shelter, id_income, id_expenses, total_balance, note, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [
          id_finance,
          id_shelter,
          id_income,
          id_expenses,
          total_balance,
          note,
          created_by,
        ]
      );
      return {
        error: false,
        message: "finance data created successfully",
        data: result.rows[0],
      };
    } catch (error) {
      return {
        error: true,
        message: "error creating finance data",
        data: null,
      };
    }
  }
  async function deleteFinanceData(id_shelter, id_finance) {
    try {
      const result = await pool.query(
        "DELETE FROM finance WHERE id_finance = $1 AND id_shelter = $2 RETURNING *",
        [id_finance, id_shelter]
      );

      if (result.rowCount == 0) {
        return {
          error: true,
          message: "Finance data not found",
          data: null,
        };
      }
  
      return {
        error: false,
        message: "Finance deleted successfully",
        data: result.rows[0],
      };
    } catch (error) {
      console.error("Error deleting finance:", error);
      return {
        error: true,
        message: "Error deleting finance",
        data: null,
      };
    }
  }
  async function updateFinanceBalanceExpensesData(
    id_finance,
    id_shelter,
    id_expenses,
    amount,
    updated_by
  ) {
    try {
      const res = await pool.query(
        `SELECT total_balance FROM finance WHERE id_shelter = $1 AND id_finance = $2`,
        [id_shelter,id_finance]
      );
      const lastBalance = res.rows[0]?.total_balance??0;
      const parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount)) {
        throw new Error("Amount is not a valid number");
      }
      const newBalance = lastBalance - parseFloat(amount);
      const updated_at = new Date();
      const result = await pool.query(
        "UPDATE finance SET id_expenses = $1, total_balance = $2, updated_at = $3 , updated_by = $4 WHERE id_finance = $5 AND id_shelter = $6 RETURNING *",
        [
          id_expenses,
          newBalance,
          updated_at,
          updated_by,
          id_finance,
          id_shelter
        ]
      );
      return {
        error: false,
        message: "Finance data updated successfully",
        data: result.rows[0],
      };
    } catch (error) {
      return {
        error: true,
        message: "Error updating finance data",
        data: null,
      };
    }
  }
  async function updateFinanceBalanceIncomeData(
    id_finance,
    id_shelter,
    id_income,
    amount,
    updated_by
  ) {
    try {
      const res = await pool.query(
        `SELECT total_balance FROM finance WHERE id_shelter = $1 AND id_finance = $2`,
        [id_shelter,id_finance]
      );
      const lastBalance = res.rows[0]?.total_balance??0;
      const parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount)) {
        throw new Error("Amount is not a valid number");
      }
      const newBalance = lastBalance + parseFloat(amount);
      const updated_at = new Date();
      const result = await pool.query(
        "UPDATE finance SET id_income = $1, total_balance = $2, updated_at = $3 , updated_by = $4 WHERE id_finance = $5 AND id_shelter = $6 RETURNING *",
        [
          id_income,
          newBalance,
          updated_at,
          updated_by,
          id_finance,
          id_shelter
        ]
      );
      return {
        error: false,
        message: "Finance data updated successfully",
        data: result.rows[0],
      };
    } catch (error) {
      return {
        error: true,
        message: "Error updating finance data",
        data: null,
      };
    }
  }

  module.exports = {getFinance, updateFinanceBalanceExpensesData,updateFinanceBalanceIncomeData, insertFinanceData, deleteFinanceData };