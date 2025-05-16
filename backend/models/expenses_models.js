const pool = require("../config/db.js");

async function getExpenses(id_shelter) {
  try {
    const { rows } = await pool.query(
      `SELECT * from expenses WHERE id_shelter = $1`,
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
async function getExpensesById(id_shelter, id_expenses) {
  try {
    const { rows } = await pool.query(
      `SELECT * from expenses WHERE id_shelter = $1 AND id_expenses = $2`,
      [id_shelter, id_expenses]
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

async function getExpensesDataConvert(id_shelter, month, year) {
  try {
    const { rows } = await pool.query(
      `SELECT 
  COALESCE(f.name, s.name, eq.name, am.animal_name) AS expenses_name,
  COALESCE(f.cost, s.cost, eq.cost, md.medical_cost) AS expenses_cost,
  e.created_at,
  e.created_by
FROM expenses e
LEFT JOIN food f ON f.id_food = e.id_food
LEFT JOIN salary s ON s.id_salary = e.id_salary
LEFT JOIN equipment eq ON eq.id_equipment = e.id_equipment
LEFT JOIN medical md ON md.id_medical = e.id_medical
LEFT JOIN animal am ON am.id_animal = md.id_animal
WHERE e.id_shelter = $1
  AND ($2::int IS NULL OR EXTRACT(MONTH FROM e.created_at) = $2::int)
  AND ($3::int IS NULL OR EXTRACT(YEAR FROM e.created_at) = $3::int)
  AND COALESCE(f.cost, s.cost, eq.cost, md.medical_cost) != 0
ORDER BY e.created_at DESC;`,
      [id_shelter, month, year]
    );

    return {
      error: false,
      message:
        rows.length > 0 ? "Data fetched successfully." : "No data found.",
      data: rows,
    };
  } catch (error) {
    console.error("Database error in getExpensesDataConvert:", error);
    return {
      error: true,
      message: "Error fetching data.",
      data: [],
    };
  }
}

async function insertExpensesData(
  id_expenses,
  id_shelter,
  id_food = null,
  id_medical = null,
  id_equipment = null,
  id_salary = null,
  created_by
) {
  try {
    const { rows } = await pool.query(
      "INSERT INTO expenses (id_expenses, id_shelter, id_food, id_medical, id_equipment,id_salary,created_by) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
      [
        id_expenses,
        id_shelter,
        id_food,
        id_medical,
        id_equipment,
        id_salary,
        created_by,
      ]
    );
    return {
      error: false,
      message: "Expanses data created successfully",
      data: rows,
    };
  } catch (error) {
    return {
      error: true,
      message: "error creating Expenses data",
      data: null,
    };
  }
}
async function deleteExpensesData(id_shelter, id_expenses) {
  try {
    const result = await pool.query(
      "DELETE FROM expenses WHERE id_expenses = $1 AND id_shelter = $2",
      [id_expenses, id_shelter]
    );

    if (result.rowCount == 0) {
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
    return {
      error: true,
      message: "Error deleting Expenses",
      data: null,
    };
  }
}

module.exports = {
  deleteExpensesData,
  insertExpensesData,
  getExpenses,
  getExpensesById,
  getExpensesDataConvert,
};
