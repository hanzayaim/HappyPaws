const pool = require("../config/db.js");

// get data
async function getAdopterData(id_shelter, adopter_id) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM adopter_profile where id_shelter = ? and id_adopter = ?",
      [id_shelter, adopter_id]
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
    await pool.query(
      "INSERT INTO adopter_profile (id_shelter, name, profile_img, gender, phone_number, address, created_by) VALUES (?,?,?,?,?,?,?)",
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
      data: adopter.adopter,
    };
  } catch (error) {
    return {
      error: true,
      message: "error creating adopter",
      data: null,
    };
  }
}

module.exports = {
  getAdopterData,
};
