const pool = require("../config/db.js")

async function getMedicalData(id_shelter) {
    try {
        const { rows } = await pool.query(
            `select *
            from medical m 
            left join animal a ON a.id_animal = m.id_animal 
            where m.id_shelter = $1
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
            where m.id_shelter = $1
            and a.id_animal = $2
            and m.id_medical = $3
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
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
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
            `UPDATE medical
            SET 
                medical_process = $1,
                medical_status = $2,
                vaccin_status = $3,
                medical_date_in = $4,
                medical_date_out = $5,
                medical_cost = $6,
                note = $7,
                updated_at = $8,
                updated_by = $9
            WHERE 
                id_shelter = $10 AND 
                id_animal = $11 AND 
                id_medical = $12
            `,
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

async function deleteMedicalData(id_shelter, id_medical) {
    try {
        const result = await pool.query(
            `delete from medical
            where id_shelter = $1
            and id_medical = $2`,
            [
                id_shelter, id_medical
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