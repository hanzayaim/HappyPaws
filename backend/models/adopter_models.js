const pool = require("../config/db.js");

// get data
async function getAdopterDataById(id_shelter, id_adopter) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM adopter_profile where id_shelter = $1 and id_adopter = $2",
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
    const { rows } = await pool.query(
      "SELECT * FROM adopter_profile where id_shelter = $1 order by created_at desc",
      [id_shelter]
    );
    if (rows.length > 0) {
      rows.forEach((row) => {
        if (row.profile_img) {
          row.profile_img = row.profile_img.toString("base64");
        }
      });

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
  createdby
) {
  try {
    const { rows } = await pool.query(
      "INSERT INTO adopter_profile (id_shelter, id_adopter, name, profile_img, gender, phone_number, address, created_by) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
      [
        id_shelter,
        id_adopter,
        adopter_name,
        profile_img,
        gender,
        phone_number,
        address,
        createdby,
      ]
    );
    return {
      error: false,
      message: "adopter created successfully",
      adopter: rows[0],
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
  id_shelter,
  id_adopter
) {
  try {
    const cleanBase64String = profile_img.replace(
      /^data:image\/[a-zA-Z]+;base64,/,
      ""
    );
    const profileImgBuffer = cleanBase64String
      ? Buffer.from(cleanBase64String, "base64")
      : null;
    const { rows } = await pool.query(
      "UPDATE adopter_profile SET name=$1, profile_img=$2, gender=$3, phone_number=$4, address=$5, updated_by=$6, updated_at=CURRENT_TIMESTAMP WHERE id_shelter = $7 and id_adopter = $8 RETURNING *",
      [
        adopter_name,
        profileImgBuffer,
        gender,
        phone_number,
        address,
        updated_by,
        id_shelter,
        id_adopter,
      ]
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
      message: "adopter data updated successfully",
      adopter: rows[0],
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
    const { rows } = await pool.query(
      "DELETE FROM adopter_profile WHERE id_shelter = $1 and id_adopter = $2 RETURNING *",
      [id_shelter, id_adopter]
    );
    return {
      error: false,
      message: "adopter deleted successfully",
      adopter: rows[0],
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
