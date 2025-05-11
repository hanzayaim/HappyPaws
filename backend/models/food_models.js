const pool = require("../config/db");

async function getFoodData(id_shelter) {
  try {
    const { rows } = await pool.query(
      `select * 
            from food f 
            where f.id_shelter = $1
            order by f.created_at desc`,
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

async function getFoodDataById(id_shelter, id_food) {
  try {
    const { rows } = await pool.query(
      `select * 
            from food f 
            where f.id_shelter = $1
            and f.id_food = $2
            order by f.created_at desc`,
      [id_shelter, id_food]
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

async function getFoodDataConvert(id_shelter, month, year) {
  try {
    const { rows } = await pool.query(
      `SELECT name, type, date as purchase_or_donation_date, exp_date as expired_date, cost, note, created_at, created_by, updated_at, updated_by
       FROM food
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
    console.error("Database error in getFoodDataConvert:", error);
    return {
      error: true,
      message: "Error fetching data.",
      data: [],
    };
  }
}

async function insertFoodData(
  id_food,
  name,
  quantity,
  category,
  type,
  exp_date,
  cost,
  date,
  note,
  created_by,
  id_shelter
) {
  try {
    const result = await pool.query(
      `insert into food (
            id_food
            , name 
            , quantity 
            , category 
            , type 
            , exp_date 
            , cost 
            , date 
            , note 
            , created_by 
            , id_shelter
        )
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        returning *`,
      [
        id_food,
        name,
        quantity,
        category,
        type,
        exp_date,
        cost,
        date,
        note,
        created_by,
        id_shelter,
      ]
    );
    return {
      error: false,
      message: "Food created successfully.",
      food: result.rows[0],
    };
  } catch (error) {
    return {
      error: true,
      message: "Error creating food.",
      data: null,
    };
  }
}
async function updateFoodData(
  name,
  quantity,
  category,
  type,
  exp_date,
  cost,
  date,
  note,
  updated_at,
  updated_by,
  id_shelter,
  id_food
) {
  try {
    const result = await pool.query(
      `update food 
            set name = $1
                , quantity = $2
                , category = $3
                , type = $4
                , exp_date = $5
                , cost = $6
                , date = $7
                , note = $8
                , updated_at= $9
                , updated_by = $10
            where id_shelter = $11
            and id_food = $12
            returning *`,
      [
        name,
        quantity,
        category,
        type,
        exp_date,
        cost,
        date,
        note,
        updated_at,
        updated_by,
        id_shelter,
        id_food,
      ]
    );
    return {
      error: false,
      message: "Food updated successfully.",
      food: result.rows[0],
    };
  } catch (error) {
    return {
      error: true,
      message: "Failed updating food.",
      data: null,
    };
  }
}
async function deleteFoodData(id_shelter, id_food) {
  try {
    const result = await pool.query(
      `delete from food 
            where id_shelter = $1
            and id_food = $2
            returning *`,
      [id_shelter, id_food]
    );
    return {
      error: false,
      message: "Food deleted successfully.",
      food: result.rows[0],
    };
  } catch (error) {
    return {
      error: true,
      message: "Error updating food.",
      data: null,
    };
  }
}

module.exports = {
  getFoodData,
  getFoodDataById,
  insertFoodData,
  updateFoodData,
  deleteFoodData,
  getFoodDataConvert,
};
