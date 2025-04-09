const pool = require("../config/db.js");
const {deleteIncomeData, updateIncomeData} = require("../models/income_model.js");
const {deleteExpensesData} = require("../models/expenses_model.js");
async function getFinanceLog(id_shelter) {
    try {
      const [rows] = await pool.query(
        ` 
        SELECT
        f.id_finance,
        f.id_shelter,
        e.id_expenses,
        i.id_income,
        CASE 
            WHEN f.id_income IS NOT NULL THEN i.type    
            WHEN f.id_expenses IS NOT NULL THEN 'Pengeluaran'
            ELSE NULL
        END AS type,
        CASE 
          WHEN f.id_income IS NOT NULL THEN i.name
          WHEN f.id_expenses IS NOT NULL THEN 
          ELSE NULL
        END AS name,
        CASE 
          WHEN f.id_income IS NOT NULL THEN i.amount
          WHEN f.id_expenses IS NOT NULL THEN 
          ELSE NULL
        END AS amount,
        CASE 
          WHEN f.id_income IS NOT NULL THEN i.date
          WHEN f.id_expenses IS NOT NULL THEN 
          ELSE NULL
        END AS date
        f.updated_by,
        f.updated_at,
        f.total_balance AS current_balance,
        f.created_at AS last_updated
        FROM finance f
        WHERE f.id_shelter = $1
        LEFT JOIN income i ON f.id_income = i.id_income
        LEFT JOIN expenses e ON f.id_expenses = e.id_expenses
        ORDER BY f.created_at DESC;
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

  async function insertFinanceData(
    id_finance, 
    id_shelter,
    id_income = null,
    id_expenses = null,
    amount,
    note,
    created_by,
  ) {
    try {
      const res = await pool.query(
        `SELECT total_balance FROM finance WHERE id_shelter = $1 ORDER BY created_at DESC LIMIT 1`,
        [id_shelter]
      );
      const lastBalance = res.rows[0]?.total_balance || 0;
      const newBalance = id_income
        ? lastBalance + parseFloat(amount)
        : lastBalance - parseFloat(amount);

      
      const result = await pool.query(
        "INSERT INTO finance (id_finance, id_shelter, id_income, id_expenses, total_balance, note, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [
          id_finance,
          id_shelter,
          id_income,
          id_expenses,
          newBalance,
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
      const financeRes = await pool.query(
        'SELECT id_income, id_expenses FROM finance WHERE id_finance = ?',
        [id_finance]
      );
      
      const { id_income, id_expenses } = financeRes.rows[0];

      if (id_income) {
        const incomeDeleteResult = await deleteIncomeData(id_shelter, id_income);
        if (incomeDeleteResult.error) {
          await client.query('ROLLBACK');
          return incomeDeleteResult;
        }
      }
      if (id_expenses) {
        const expensesDeleteResult = await deleteExpensesData(id_shelter, id_expenses);
        if (expensesDeleteResult.error) {
          await client.query('ROLLBACK');
          return expensesDeleteResult;
        }
      }
      const result = await pool.query(
        "DELETE FROM finance WHERE id_finance = $1 AND id_shelter = $2",
        [id_finance, id_shelter]
      );

      if (result.rowCount === 0) {
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

  async function updateFinanceData(
    id_finance,
    id_shelter,
    name,
    amount,
    date,
    type,
    note,
    updated_by
  ) {
    try {
      const financeRes = await pool.query(
        'SELECT id_income, id_expenses FROM finance WHERE id_finance = $1',
        [id_finance]
      );
      const { id_income, id_expenses } = financeRes.rows[0];
      const oldAmount = null;
      if (id_income) {
        const incomeAmount = await pool.query(
          'SELECT amount FROM income WHERE id_income = ?',
          [id_income]
        );
        oldAmount = incomeAmount; 
        const incomeDeleteResult = await updateIncomeData(
          id_income,
          id_shelter,
          name,
          amount,
          date,
          type,
          note,
          update_by
        );
        if (incomeDeleteResult.error) {
          await client.query('ROLLBACK');
          return incomeDeleteResult;
        }
      }

      if (id_expenses) {
        //await pool.query('DELETE FROM expenses WHERE id_expenses = $1', [id_expenses]);
      }
      
      const res = await pool.query(
        `SELECT total_balance FROM finance WHERE id_shelter = $1 ORDER BY created_at DESC LIMIT 1`,
        [id_shelter]
      );
      const lastBalance = res.rows[0]?.total_balance || 0;
      const newBalance = id_income? lastBalance - parseFloat(oldAmount) + parseFloat(amount) : lastBalance + parseFloat(oldAmount) - parseFloat(amount) 
      const result = await pool.query(
        "UPDATE finance SET total_balance = $1, note = $2, updated_by = $3 WHERE id_finance = $4",
        [
          newBalance,
          note,
          updated_by,
          id_finance
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
    
  module.exports = {getFinanceLog, updateFinanceData, insertFinanceData, deleteFinanceData };