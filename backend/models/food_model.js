const pool = require("../config/db");

async function getFoodData(id_shelter) {
    try {
        const { rows } = pool.query(
            `select * 
            from food f 
            where f.id_shelter = ?
            order by f.created_at desc`
        );
        if (rows.length > 0) {
            return {
                error: false,
                message: "Data fetched successfully",
                data: rows[0]
            }
        } else {
            return {
                error: true,
                message: "No data found.",
                data: null
            }
        }
    } catch (error) {
        return {
            error: true,
            message: "Error fetching data.",
            data: null
        }
    }
}

async function getFoodDataById(id_shelter, id_food) {
    try {
        const { rows } = await pool.query(
            `select * 
            from food f 
            where f.id_shelter = ?
            and f.id_food = ?
            order by f.created_at desc`
        );
        if (rows > 0) {
            return {
                error: false,
                message: "Data fetched successfully.",
                data: rows[0]
            }
        } else {
            return {
                error: true,
                message: "No data found.",
                data: null
            }
        }
    } catch (error) {
        return {
            error: true,
            message: "Error fetching data.",
            data: null
        }
    }
}

async function insertFoodData(
    name 
	, quantity 
	, category 
	, type 
	, exp_date 
	, cost 
	, date 
	, note 
	, created_at 
	, created_by
) {
    try {
        const result = await pool.query(
            `insert into food (
            name 
            , quantity 
            , category 
            , type 
            , exp_date 
            , cost 
            , date 
            , note 
            , created_at 
            , created_by 
        )
        values (
            ?,?,?,?,?,?,?,?,?,?
        )`,
        [
            name 
            , quantity 
            , category 
            , type 
            , exp_date 
            , cost 
            , date 
            , note 
            , created_at 
            , created_by
        ]
        );
        return {
            error: false,
            message: "Food created successfully.",
            food: result.rows[0]
        }
    } catch (error) {
        return {
            error: true,
            message: "Error creating food.",
            data: null
        }
    }
}

async function updateFoodData(
    name
	, quantity
	, category
	, type
	, exp_date
	, cost
	, date
	, note
	, created_at
	, created_by
) {
    try {
        const result = await pool.query(
            `update food 
            set (
                name = ?
                , quantity = ?
                , category = ?
                , type = ?
                , exp_date = ?
                , cost = ?
                , date = ?
                , note = ?
                , updated_at = ?
                , updated_by = ?
            )
            where id_equipment = ?
            and id_shelter = ?`,
            [
            name
            , quantity
            , category
            , type
            , exp_date
            , cost
            , date
            , note
            , created_at
            , created_by
            ]
        );
        return {
            error: true,
            message: "Food updated successfully.",
            food: result.rows[0]
        }
    } catch (error) {
        return {
            error: true,
            message: "Failed updating successfully.",
            data: null
        }
    }
}

async function deleteFoodData(id_shelter, id_food) {
    try {
        const result = await pool.query(
            `delete from food 
            where id_shelter = ?
            and id_food = ?`,
            [id_shelter, id_food]
        );
        return {
            error: false,
            message: "Food updated successfully.",
            food: result.rows[0]
        }
    } catch (error) {
        return {
            error: true,
            message: "Error updating food.",
            data: null
        }
    }
}

module.exports = {
    getFoodData,
    getFoodDataById,
    insertFoodData,
    updateFoodData,
    deleteFoodData
}