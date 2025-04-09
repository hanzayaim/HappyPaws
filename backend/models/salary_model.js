const pool = require("../config/db.js");
async function getSalary(id_shelter) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM salary WHERE id_shelter = ?",
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

  async function insertSalary(
    id_salary,
    id_shelter,
    id_employee,
    name,
    cost,
    date,
    note,
    created_by,
    updated_by
  ) {
    try {
      const result = await pool.query(
        "INSERT INTO salary (id_salary, id_shelter, id_employee, name, cost, date,  note, created_by, updated_by) VALUES (?,?,?,?,?,?,?,?,?)",
        [
            id_salary,
            id_shelter,
            id_employee,
            name,
            cost,
            date,
            note,
            created_by,
            updated_by
        ]
      );
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

  async function deleteSalary(id_shelter,id_salary){
    try {
        const result = await pool.query(
          "DELETE FROM salary WHERE id_salary = ? AND id_shelter = ?", 
          [id_salary,id_shelter]
        );
      
        if (result.rowCount === 0) {
          return {
            error: true,
            message: "Salary not found",
            data: null,
          };
        }
        return {
          error: false,
          message: "Salary deleted successfully",
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

  module.exports = { deleteSalary, insertSalary, getSalary };