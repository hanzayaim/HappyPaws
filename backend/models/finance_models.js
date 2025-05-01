const pool = require("../config/db.js");

async function getFinance(id_shelter) {
  try {
    const { rows } = await pool.query(
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
async function insertFinanceData(id_finance, id_shelter, total_balance) {
  try {
    const result = await pool.query(
      "INSERT INTO finance (id_finance, id_shelter, total_balance) VALUES ($1, $2, $3) RETURNING *",
      [id_finance, id_shelter, total_balance]
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
    return {
      error: true,
      message: "Error deleting finance",
      data: null,
    };
  }
}

async function updateBalance(total_balance, id_finance, id_shelter) {
  try {
    const result = await pool.query(
      "UPDATE finance SET total_balance = $1 WHERE id_finance = $2 AND id_shelter = $3 RETURNING *",
      [total_balance, id_finance, id_shelter]
    );
    return {
      error: false,
      message: "Finance data updated successfully",
      data: result,
    };
  } catch (error) {
    return {
      error: true,
      message: "Error updating finance data",
      data: null,
    };
  }
}

module.exports = {
  getFinance,
  updateBalance,
  insertFinanceData,
  deleteFinanceData,
};
