const pool = require("../config/db.js");

// get data
async function getAdopterDataById(id_shelter, id_adopter) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM adopter_profile where id_shelter = ? and id_adopter = ?",
      [id_shelter, id_adopter]
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

async function getAdopterData(id_shelter) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM adopter_profile where id_shelter = ? order by created_at desc",
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
async function insertAdopterData(
  id_shelter,
  id_adopter,
  adopter_name,
  profile_img,
  gender,
  phone_number,
  address,
  created_by
) {
  try {
    const result = await pool.query(
      "INSERT INTO adopter_profile (id_shelter, id_adopter,name, profile_img, gender, phone_number, address, created_by) VALUES (?,?,?,?,?,?,?)",
      [
        id_shelter,
        id_adopter,
        adopter_name,
        profile_img,
        gender,
        phone_number,
        address,
        created_by,
      ]
    );
    return {
      error: false,
      message: "adopter created successfully",
      adopter: result.rows[0],
    };
  } catch (error) {
    return {
      error: true,
      message: "error creating adopter",
      data: null,
    };
  }
}

async function updateAdopterData(
  adopter_name,
  profile_img,
  gender,
  phone_number,
  address,
  updated_by,
  updated_at,
  id_shelter,
  id_adopter
) {
  try {
    const result = await pool.query(
      "UPDATE adopter_profile SET name=?, profile_img=?, gender=?, phone_number=?, address=?, updated_by=?, updated_at=? WHERE id_shelter = ? and id_adopter = ?",
      [
        adopter_name,
        profile_img,
        gender,
        phone_number,
        address,
        updated_by,
        updated_at,
        id_shelter,
        id_adopter,
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

async function deleteAdopterData(id_shelter, id_adopter) {
  try {
    const result = await pool.query(
      "DELETE FROM adopter_profile WHERE id_shelter = ? and id_adopter = ?",
      [id_shelter, id_adopter]
    );
    return {
      error: false,
      message: "adopter deleted successfully",
      adopter: result.rows[0],
    };
  } catch (error) {
    return {
      error: true,
      message: "error deleting adopter",
      data: null,
    };
  }
}

module.exports = {
  getAdopterData,
  insertAdopterData,
  getAdopterDataById,
  updateAdopterData,
  deleteAdopterData,
};
