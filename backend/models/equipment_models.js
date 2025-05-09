const pool = require("../config/db");

async function getEquipmentData(id_shelter) {
  try {
    const { rows } = await pool.query(
      `select * 
            from equipment e 
            where e.id_shelter = $1
            order by e.created_at desc`,
      [id_shelter]
    );
    if (rows.length > 0) {
      return {
        error: false,
        message: "Data fetched successfully.",
        data: rows,
      };
    } else {
      return {
        error: true,
        message: "No data found.",
        data: null,
      };
    }
  } catch (error) {
    return {
      error: true,
      message: "Error fetching data.",
      data: null,
    };
  }
}

async function getEquipmentDataById(id_shelter, id_equipment) {
  try {
    const { rows } = await pool.query(
      `select * 
            from equipment e 
            where e.id_shelter = $1
            and e.id_equipment = $2
            order by e.created_at desc`,
      [id_shelter, id_equipment]
    );
    if (rows.length > 0) {
      return {
        error: false,
        message: "Data fetched successfully",
        data: rows[0],
      };
    } else {
      return {
        error: true,
        message: "No data found.",
        data: null,
      };
    }
  } catch (error) {
    return {
      error: true,
      message: "Error fetching data.",
      data: null,
    };
  }
}

async function getEquipmentDataConvert(id_shelter, month, year) {
  try {
    const { rows } = await pool.query(
      `SELECT name, type, date as buying_date, cost, note, created_at, created_by, updated_at, updated_by
       FROM equipment 
       WHERE id_shelter = $1
         AND ($2::int IS NULL OR EXTRACT(MONTH FROM created_at) = $2::int)
         AND ($3::int IS NULL OR EXTRACT(YEAR FROM created_at) = $3::int)
       ORDER BY created_at DESC`,
      [id_shelter, month, year]
    );

    return {
      error: false,
      message:
        rows.length > 0 ? "Data fetched successfully." : "No data found.",
      data: rows,
    };
  } catch (error) {
    console.error("Database error in getEquipmentDataConvert:", error);
    return {
      error: true,
      message: "Error fetching data.",
      data: [],
    };
  }
}

async function insertEquipmentData(
  id_equipment,
  name,
  type,
  date,
  cost,
  note,
  created_by,
  id_shelter
) {
  try {
    const result = await pool.query(
      `insert into equipment (
            id_equipment
            , name 
            , type 
            , date 
            , cost 
            , note 
            , created_by 
            , id_shelter 
            )
            values ($1, $2, $3, $4, $5, $6, $7, $8)
            returning *`,
      [id_equipment, name, type, date, cost, note, created_by, id_shelter]
    );
    return {
      error: false,
      message: "Equipment created successfully.",
      equipment: result.rows[0],
    };
  } catch (error) {
    return {
      error: true,
      message: "Error creating equipment.",
      data: null,
    };
  }
}

async function updateEquipmentData(
  name,
  type,
  date,
  cost,
  note,
  updated_at,
  updated_by,
  id_shelter,
  id_equipment
) {
  try {
    const result = await pool.query(
      `update equipment 
            set name = $1
                , type = $2
                , date = $3
                , cost = $4
                , note = $5
                , updated_at = $6
                , updated_by = $7
            where id_shelter = $8 
            and id_equipment = $9
            returning *`,
      [
        name,
        type,
        date,
        cost,
        note,
        updated_at,
        updated_by,
        id_shelter,
        id_equipment,
      ]
    );
    return {
      error: false,
      message: "Equipment updated successfully.",
      equipment: result.rows[0],
    };
  } catch (error) {
    return {
      error: true,
      message: "Failed updating equipment.",
      data: null,
    };
  }
}

async function deleteEquipmentData(id_shelter, id_equipment) {
  try {
    const result = await pool.query(
      `delete from equipment 
            where id_shelter = $1 
            and id_equipment = $2
            returning *`,
      [id_shelter, id_equipment]
    );
    return {
      error: false,
      message: "Equipment deleted successfully.",
      equipment: result.rows[0],
    };
  } catch (error) {
    return {
      error: true,
      message: "Error updating equipment.",
      data: null,
    };
  }
}

module.exports = {
  getEquipmentData,
  getEquipmentDataById,
  insertEquipmentData,
  updateEquipmentData,
  deleteEquipmentData,
  getEquipmentDataConvert,
};
