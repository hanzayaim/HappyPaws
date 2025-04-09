const pool = require("../config/db.js")

async function getMedicalData(id_shelter) {
    try {
        const { rows } = await pool.query(
            `select *
            from medical m 
            left join animal a ON a.id_animal = m.id_animal 
            where m.id_shelter = ?
            order by m.created_at desc`, 
        [id_shelter]
        );
        
        if (rows.length > 0) {
            return {
                error: false,
                message: "Data fetched successfully.",
                data: rows[0]
            };
        } else {
            return {
                error: true,
                message: "No data found.",
                data: null
            };
        }
    } catch (error) {
        return {
            error: true,
            message: "Error fetching data.",
            data: null
        };
    }
}

async function getMedicalDataById(id_shelter, id_animal, id_medical) {
    try {
        const { rows } = await pool.query(
            `select *
            from medical m
            left join animal a on a.id_animal = m.id_animal
            where m.id_shelter = ?
            and a.id_animal = ?
            and m.id_medical = ?
            order by m.created_at desc`,
            [id_shelter, id_animal, id_medical]
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

async function insertMedicalData(
    medical_process,
    medical_status,
    vaccin_status,
    medical_date_in,
    medical_date_out,
    medical_cost,
    note,
    created_by,
    id_shelter,
    id_animal
) {
    try {
        const result = await pool.query(
            `insert into medical (
            medical_process
            , medical_status
            , vaccin_status
            , medical_date_in
            , medical_date_out
            , medical_cost
            , note 
            , created_by
            , id_shelter 
            , id_animal 
            )
            values (
                ?,?,?,?,?,?,?,?,?,?
            )
            `,
            [
                medical_process,
                medical_status,
                vaccin_status,
                medical_date_in,
                medical_date_out,
                medical_cost,
                note,
                created_by,
                id_shelter,
                id_animal
            ]
        );
        return {
            error: false,
            message: "Medical created successfully.",
            medical: result.rows[0]
        }

    } catch (error) {
        return {
            error: true,
            message: "Error creating medical.",
            data: null
        }
    }
}

async function updateMedicalData(
    medical_process,
    medical_status,
    vaccin_status,
    medical_date_in,
    medical_date_out,
    medical_cost,
    note,
    updated_at,
    updated_by,
    id_shelter,
    id_animal,
    id_medical
) {
    try {
        const result = await pool.query(
            `update medical
            set (
                medical_process = ?
                , medical_status = ?
                , vaccin_status = ?
                , medical_date_in = ?
                , medical_date_out = ?
                , medical_cost = ?
                , note = ?
                , updated_at = ?
                , updated_by = ?
            )
            where id_shelter = @id_shelter 
            and id_animal = @id_animal
            and id_medical = @id_medical`,
            [
                medical_process,
                medical_status,
                vaccin_status,
                medical_date_in,
                medical_date_out,
                medical_cost,
                note,
                updated_at,
                updated_by,
                id_shelter,
                id_animal,
                id_medical
            ]
        );
        return {
            error: false,
            message: "Medical updated successfully.",
            medical: result.rows[0]
        }
    } catch (error) {
        return {
            error: true,
            message: "Error updating medical.",
            data: null
        }
    }
}

async function deleteMedicalData(id_shelter, id_animal, id_medical) {
    try {
        const result = await pool.query(
            `delete from medical
            where id_shelter = ?
            and id_animal = ?
            and id_medical = ?`,
            [
                id_shelter, id_animal, id_medical
            ]
        );
        return {
            error: false,
            message: "Delete medical successfully.",
            medical: result.rows[0]
        }
    } catch (error) {
        return {
            error: true,
            message: "Error deleting medical.",
            medical: result.rows[0]
        }
    }
}

module.exports = { 
    getMedicalData,
    getMedicalDataById,
    insertMedicalData,
    updateMedicalData,
    deleteMedicalData
 };