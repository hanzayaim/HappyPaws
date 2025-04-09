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
  created_by,
  status
) {
  try {
    const result = await pool.query(
      "INSERT INTO animal (id_shelter, id_animal, animal_name, animal_img, animal_gender, animal_type, animal_age, animal_status, rescue_location, date, note, created_by, status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
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
        status,
      ]
    );
    return {
      error: false,
      message: "animal created successfully",
      animal: result.rows[0],
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
  animal_name,
  animal_img,
  animal_gender,
  animal_type,
  animal_age,
  animal_status,
  rescue_location,
  id_adopter,
  date,
  note,
  updated_by,
  updated_at,
  status,
  id_shelter,
  id_animal
) {
  try {
    const result = await pool.query(
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
        updated_at = $12,
        status = $13
      WHERE id_shelter = $14 AND id_animal = $15`,
      [
        animal_name,
        animal_img,
        animal_gender,
        animal_type,
        animal_age,
        animal_status,
        rescue_location,
        id_adopter,
        date,
        note,
        updated_by,
        updated_at,
        status,
        id_shelter,
        id_animal,
      ]
    );
    return {
      error: false,
      message: "animal updated successfully",
      animal: result.rows[0],
    };
  } catch (error) {
    return {
      error: true,
      message: "error updating animal",
      data: null,
    };
  }
}

async function updateAnimalMedicalId(id_medical, id_shelter, id_animal) {
  try {
    const result = await pool.query(
      "UPDATE animal SET id_medical = $1 WHERE id_shelter = $2 and id_animal = $3",
      [id_medical, id_shelter, id_animal]
    );
    return {
      error: false,
      message: "animal medical updated successfully",
      animal: result.rows[0],
    };
  } catch (error) {
    return {
      error: true,
      message: "error updating animal medical",
      data: null,
    };
  }
}

async function deleteAnimalData(id_shelter, id_animal) {
  try {
    const result = await pool.query(
      "DELETE FROM animal WHERE id_shelter = $1 and id_animal = $2",
      [id_shelter, id_animal]
    );
    return {
      error: false,
      message: "animal deleted successfully",
      animal: result.rows[0],
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
  updateAnimalMedicalId,
  updateAnimalData,
  deleteAnimalData,
};
