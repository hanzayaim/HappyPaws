const pool = require("../config/db.js");

// get data
async function getShelterDataById(id_shelter) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM shelter where id_shelter = ?",
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

async function getShelterData() {
  try {
    const [rows] = await pool.query("SELECT * FROM shelter");
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
async function insertShelterData(
  id_shelter,
  owner_name,
  email,
  password,
  shelter_name,
  phone_number,
  address,
  status
) {
  try {
    const result = await pool.query(
      "INSERT INTO shelter (id_shelter, owner_name, email, password, shelter_name, phone_number, address, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        id_shelter,
        owner_name,
        email,
        password,
        shelter_name,
        phone_number,
        address,
        status,
      ]
    );
    return {
      error: false,
      message: "shelter created successfully",
      shelter: result.rows[0],
    };
  } catch (error) {
    return {
      error: true,
      message: "error creating shelter",
      data: null,
    };
  }
}

async function updateShelterStatus(status, id_shelter) {
  try {
    const result = await pool.query(
      "UPDATE shelter SET status= ? WHERE id_shelter = ?",
      [status, id_shelter]
    );
    return {
      error: false,
      message: "shelter status updated successfully",
      shelter: result.rows[0],
    };
  } catch (error) {
    return {
      error: true,
      message: "error updating shelter status",
      data: null,
    };
  }
}

async function deleteShelterData(id_shelter) {
  try {
    const result = await pool.query(
      "DELETE FROM shelter WHERE id_shelter = ?",
      [id_shelter]
    );
    return {
      error: false,
      message: "shelter deleted successfully",
      shelter: result.rows[0],
    };
  } catch (error) {
    return {
      error: true,
      message: "error deleting shelter",
      data: null,
    };
  }
}

module.exports = {
  getShelterDataById,
  getShelterData,
  insertShelterData,
  updateShelterStatus,
  deleteShelterData,
};
