const pool = require("../config/db");

// get data
async function getAnimalDataById(id_shelter, id_animal) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM animal where id_shelter = $1 and id_animal = $2",
      [id_shelter, id_animal]
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

async function getAnimalData(id_shelter) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM animal where id_shelter = $1 order by created_at desc",
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
async function insertAnimalData(
  id_shelter,
  id_animal,
  animal_name,
  animal_img,
  animal_gender,
  animal_type,
  animal_age,
  animal_status,
  rescue_location,
  date,
  note,
  created_by
) {
  try {
    const { rows } = await pool.query(
      "INSERT INTO animal (id_shelter, id_animal, animal_name, animal_img, animal_gender, animal_type, animal_age, animal_status, rescue_location, date, note, created_by) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *",
      [
        id_shelter,
        id_animal,
        animal_name,
        animal_img,
        animal_gender,
        animal_type,
        animal_age,
        animal_status,
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
    return {
      error: true,
      message: "error creating animal",
      data: null,
    };
  }
}

async function updateAnimalData(
  id_adopter,
  animal_name,
  animal_img,
  animal_gender,
  animal_type,
  animal_age,
  animal_status,
  rescue_location,
  date,
  note,
  updated_by,
  id_shelter,
  id_animal
) {
  try {
    const { rows } = await pool.query(
      `UPDATE animal SET 
        id_adopter = $1,
        animal_name = $2,
        animal_img = $3,
        animal_gender = $4,
        animal_type = $5,
        animal_age = $6,
        animal_status = $7,
        rescue_location = $8,
        date = $9,
        note = $10,
        updated_by = $11,
        updated_at = CURRENT_TIMESTAMP
      WHERE id_shelter = $12 AND id_animal = $13 RETURNING *`,
      [
        id_adopter,
        animal_name,
        animal_img,
        animal_gender,
        animal_type,
        animal_age,
        animal_status,
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
    return {
      error: true,
      message: "error updating animal",
      data: null,
    };
  }
}

async function updateAnimalStatus(animal_status, updated_by, id_shelter, id_animal) {
  try {
    const { rows } = await pool.query(
      `update animal set animal_status = $1, updated_by = $2 where id_shelter = $3 and id_animal = $4 returning *`,
      [animal_status, updated_by, id_shelter, id_animal]
    );

    return {
      error: false,
      message: "Animal status updated successfully",
      animal: rows[0]
    }; 
  } catch (error) {
    return {
      error: true,
      message: "Error updating animal status.",
      data: null
    }
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
    return {
      error: true,
      message: "error deleting animal",
      data: null,
    };
  }
}

module.exports = {
  getAnimalDataById,
  getAnimalData,
  insertAnimalData,
  updateAnimalData,
  updateAnimalStatus,
  deleteAnimalData,
};
