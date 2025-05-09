const pool = require("../config/db.js");
async function getSalary(id_shelter) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM salary WHERE id_shelter = $1",
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
async function getSalaryById(id_shelter, id_salary) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM salary WHERE id_shelter = $1 AND id_salary = $2",
      [id_shelter, id_salary]
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

async function getSalaryDataConvert(id_shelter, month, year) {
  try {
    const { rows } = await pool.query(
      `SELECT es.name, s.name as s_name, s.cost, s.date, s.note, s.created_at, s.created_by, s.updated_at, s.updated_by
      FROM salary s
      LEFT JOIN employee_shelter es ON es.id_employee = s.id_employee
      WHERE s.id_shelter = $1
      AND ($2::int IS NULL OR EXTRACT(MONTH FROM s.created_at) = $2::int)
      AND ($3::int IS NULL OR EXTRACT(YEAR FROM s.created_at) = $3::int)
      ORDER BY s.created_at DESC`,
      [id_shelter, month, year]
    );

    return {
      error: false,
      message:
        rows.length > 0 ? "Data fetched successfully." : "No data found.",
      data: rows,
    };
  } catch (error) {
    console.error("Database error in getSalaryDataConvert:", error);
    return {
      error: true,
      message: "Error fetching data.",
      data: [],
    };
  }
}

async function insertSalaryData(
  id_salary,
  id_shelter,
  id_employee,
  name,
  cost,
  date,
  note,
  created_by
) {
  try {
    const result = await pool.query(
      "INSERT INTO salary (id_salary, id_shelter, id_employee, name, cost, date, note, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [id_salary, id_shelter, id_employee, name, cost, date, note, created_by]
    );
    return {
      error: false,
      message: "Employee Salary created successfully",
      data: result.rows[0],
    };
  } catch (error) {
    return {
      error: true,
      message: "error creating Employee Salary",
      data: null,
    };
  }
}

async function deleteSalaryData(id_shelter, id_salary) {
  try {
    const result = await pool.query(
      "DELETE FROM salary WHERE id_salary = $1 AND id_shelter = $2 RETURNING * ",
      [id_salary, id_shelter]
    );

    if (result.rowCount == 0) {
      return {
        error: true,
        message: "Salary not found",
        data: null,
      };
    }
    return {
      error: false,
      message: "Salary deleted successfully",
      data: result,
    };
  } catch (error) {
    return {
      error: true,
      message: "Error deleting salary",
      data: null,
    };
  }
}

module.exports = {
  deleteSalaryData,
  insertSalaryData,
  getSalary,
  getSalaryById,
  getSalaryDataConvert,
};
