const pool = require("../config/db.js");

async function getShelterDataById(id_shelter) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM shelter where id_shelter = $1",
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

async function getShelterIdByEmail(email) {
  try {
    const { rows } = await pool.query(
      "SELECT id_shelter FROM shelter where email = $1",
      [email]
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

async function getShelterPassByEmail(email) {
  try {
    const { rows } = await pool.query(
      "SELECT password FROM shelter where email = $1",
      [email]
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
    const { rows } = await pool.query("SELECT * FROM shelter");
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
    const { rows } = await pool.query(
      "INSERT INTO shelter (id_shelter, owner_name, email, password, shelter_name, phone_number, address, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning *",
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
      shelter: rows[0],
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateShelterStatus(status, id_shelter) {
  try {
    const { rows } = await pool.query(
      "UPDATE shelter SET status= $1 WHERE id_shelter = $2 returning *",
      [status, id_shelter]
    );
    if (rows.length === 0) {
      return {
        error: true,
        message: "no data found",
        data: null,
      };
    }
    return {
      error: false,
      message: "shelter status updated successfully",
      shelter: rows[0],
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
    const { rows } = await pool.query(
      "DELETE FROM shelter WHERE id_shelter = $1 RETURNING *",
      [id_shelter]
    );
    if (rows.length === 0)
      return {
        error: true,
        message: "no data found",
        data: null,
      };
    return {
      error: false,
      message: "shelter deleted successfully",
      shelter: rows[0],
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
  getShelterIdByEmail,
  getShelterPassByEmail,
  insertShelterData,
  updateShelterStatus,
  deleteShelterData,
};
