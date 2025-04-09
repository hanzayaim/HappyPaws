const pool = require("../config/db.js");

// get data
async function getEmployeeDataById(id_shelter, id_employee) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM employee_shelter where id_shelter = $1 and id_employee = $2",
      [id_shelter, id_employee]
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

async function getEmployeeData(id_shelter) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM employee_shelter where id_shelter = $1",
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

// insert data
async function insertEmployeeData(
  id_shelter,
  id_employee,
  name,
  email,
  password,
  role,
  gender,
  shelter_name,
  phone_number,
  address,
  status
) {
  try {
    const query = `
    INSERT INTO employee_shelter (
        id_shelter,
        id_employee,
        name,
        email,
        password,
        role,
        gender,
        shelter_name,
        phone_number,
        address,
        status
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
      )
    `;

    return {
      error: false,
      message: "employee shelter created successfully",
      employee: result.rows[0],
    };
  } catch (error) {
    return {
      error: true,
      message: "error creating employeeshelter",
      data: null,
    };
  }
}

async function updateEmployeeStatus(status, id_shelter, id_employee) {
  try {
    const result = await pool.query(
      "UPDATE employee_shelter SET status= $1 WHERE id_shelter = $2 and id_employee = $3",
      [status, id_shelter, id_employee]
    );
    return {
      error: false,
      message: "employee shelter status updated successfully",
      employee: result.rows[0],
    };
  } catch (error) {
    return {
      error: true,
      message: "error updating employee shelter status",
      data: null,
    };
  }
}

async function deleteEmployeeData(id_shelter, id_employee) {
  try {
    const result = await pool.query(
      "DELETE FROM employee_shelter WHERE id_shelter = $1 and id_employee = $2",
      [id_shelter, id_employee]
    );
    return {
      error: false,
      message: "employee shelter deleted successfully",
      employee: result.rows[0],
    };
  } catch (error) {
    return {
      error: true,
      message: "error deleting employee shelter",
      data: null,
    };
  }
}

module.exports = {
  getEmployeeDataById,
  getEmployeeData,
  insertEmployeeData,
  updateEmployeeStatus,
  deleteEmployeeData,
};
