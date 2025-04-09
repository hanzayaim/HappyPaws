const pool = require("../config/db");

async function getEquipmentData(id_shelter) {
    try {
        const { rows } = await pool.query(
            `select * 
            from equipment e 
            where e.id_shelter = ?
            order by e.created_at desc`,
            [id_shelter]
        );
        if (rows.length > 0) {
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

async function getEquipmentDataById(id_shelter, id_equipment) {
    try {
        const { rows } = await pool.query(
            `select * 
            from equipment e 
            where e.id_shelter = ?
            and e.id_equipment = ?
            order by e.created_at desc`,
            [id_shelter, id_equipment]
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

async function insertEquipmentData(
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
            name 
            , type 
            , date 
            , cost 
            , note 
            , created_by 
            , id_shelter 
            )
            values (?,?,?,?,?,?,?)`,
            [
                name,
                type,
                date,
                cost,
                note,
                created_at,
                created_by,
                updated_at,
                updated_by,
                id_shelter
            ]
        );
        return {
            error: false,
            message: "Equipment created successfully.",
            equipment: result.rows[0]
        }
    } catch (error) {
        return {
            error: true,
            message: "Error creating equipment.",
            data: null
        }
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
            set (
                name = ?
                , type = ?
                , date = ?
                , cost = ?
                , note = ?
                , updated_at = ?
                , updated_by = ?
            )
            where id_shelter = ? 
            and id_equipment = ?`,
            [
                name,
                type,
                date,
                cost,
                note,
                updated_at,
                updated_by,
                id_shelter,
                id_equipment
            ]
        );
        return {
            error: false,
            message: "Equipment updated successfully.",
            equipment: result.rows[0]
        }
    } catch (error) {
        return {
            error: true,
            message: "Failed updating equipment.",
            data: null
        }
    }
}

async function deleteEquipmentData(id_shelter, id_equipment) {
    try {
        const result = await pool.query(
            `delete from equipment 
            where id_shelter = ? 
            and id_equipment = ?`,
            [id_shelter, id_equipment]
        );
        return {
            error: false,
            message: "Equipment deleted successfully.",
            equipment: result.rows[0]
        }
    } catch (error) {
        return {
            error: true,
            message: "Error updating equipment.",
            data: null
        }
    }
}

module.exports = {
    getEquipmentData,
    getEquipmentDataById,
    insertEquipmentData,
    updateEquipmentData,
    deleteEquipmentData
}