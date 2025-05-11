const pool = require("../config/db");

async function getAnimalDataById(id_shelter, id_animal) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM animal where id_shelter = $1 and id_animal = $2",
      [id_shelter, id_animal]
    );
    if (rows.length > 0) {
      rows.forEach((row) => {
        if (row.animal_img) {
          row.animal_img = row.animal_img.toString("base64");
        }
      });
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

async function getAnimalData(id_shelter) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM animal where id_shelter = $1 order by created_at desc",
      [id_shelter]
    );
    if (rows.length > 0) {
      rows.forEach((row) => {
        if (row.animal_img) {
          row.animal_img = row.animal_img.toString("base64");
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

async function getAnimalDataConvert(id_shelter, month, year) {
  try {
    const { rows } = await pool.query(
      `SELECT a.animal_name, a.animal_gender, a.animal_type, a.rescue_location, 
             a.date, a.note, a.created_at, a.created_by
       FROM animal a
       WHERE a.id_shelter = $1
         AND ($2::int IS NULL OR EXTRACT(MONTH FROM a.created_at) = $2::int)
         AND ($3::int IS NULL OR EXTRACT(YEAR FROM a.created_at) = $3::int)
       ORDER BY a.created_at DESC`,
      [id_shelter, month, year]
    );

    return {
      error: false,
      message:
        rows.length > 0 ? "Data fetched successfully." : "No data found.",
      data: rows,
    };
  } catch (error) {
    console.error("Database error in getAnimalDataConvert:", error);
    return {
      error: true,
      message: "Error fetching data.",
      data: [],
    };
  }
}

async function insertAnimalData(
  id_shelter,
  id_animal,
  animal_name,
  animal_img,
  animal_gender,
  animal_type,
  animal_age,
  rescue_location,
  date,
  note,
  created_by
) {
  try {
    const { rows } = await pool.query(
      "INSERT INTO animal (id_shelter, id_animal, animal_name, animal_img, animal_gender, animal_type, animal_age, rescue_location, date, note, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
      [
        id_shelter,
        id_animal,
        animal_name,
        animal_img,
        animal_gender,
        animal_type,
        animal_age,
        rescue_location,
        date,
        note,
        created_by,
      ]
    );
    return {
      error: false,
      message: "animal created successfully",
      animal: rows[0],
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function updateAnimalData(
  animal_name,
  animal_img,
  animal_gender,
  animal_type,
  animal_age,
  rescue_location,
  date,
  note,
  updated_by,
  id_shelter,
  id_animal
) {
  try {
    let cleanBase64String = null;
    if (animal_img === null || animal_img === undefined || animal_img === "") {
      animal_img = null;
    } else {
      cleanBase64String = animal_img.replace(
        /^data:image\/[a-zA-Z]+;base64,/,
        ""
      );
    }
    const profileImgBuffer = cleanBase64String
      ? Buffer.from(cleanBase64String, "base64")
      : null;
    const { rows } = await pool.query(
      `UPDATE animal SET 
    animal_name = $1,
    animal_img = $2,
    animal_gender = $3,
    animal_type = $4,
    animal_age = $5,
    rescue_location = $6,
    date = $7,
    note = $8,
    updated_by = $9,
    updated_at = CURRENT_TIMESTAMP
  WHERE id_shelter = $10 AND id_animal = $11 RETURNING *`,
      [
        animal_name,
        profileImgBuffer,
        animal_gender,
        animal_type,
        animal_age,
        rescue_location,
        date,
        note,
        updated_by,
        id_shelter,
        id_animal,
      ]
    );
    return {
      error: false,
      message: "animal updated successfully",
      animal: rows[0],
    };
  } catch (error) {
    throw error;
  }
}

async function insertAdopterData(
  id_adopter,
  updated_by,
  id_shelter,
  id_animal
) {
  try {
    const { rows } = await pool.query(
      `UPDATE animal SET 
      id_adopter = $1,
    updated_by = $2,
    updated_at = CURRENT_TIMESTAMP
  WHERE id_shelter = $3 AND id_animal = $4 RETURNING *`,
      [id_adopter, updated_by, id_shelter, id_animal]
    );
    return {
      error: false,
      message: "animal adopter updated successfully",
      animal: rows[0],
    };
  } catch (error) {
    throw error;
  }
}

async function deleteAnimalData(id_shelter, id_animal) {
  try {
    const { rows } = await pool.query(
      "DELETE FROM animal WHERE id_shelter = $1 and id_animal = $2 RETURNING *",
      [id_shelter, id_animal]
    );
    return {
      error: false,
      message: "animal deleted successfully",
      animal: rows[0],
    };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAnimalDataById,
  getAnimalData,
  insertAnimalData,
  insertAdopterData,
  updateAnimalData,
  deleteAnimalData,
  getAnimalDataConvert,
};
