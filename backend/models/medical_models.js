const pool = require("../config/db.js");

async function getMedicalData(id_shelter) {
    try {
        const { rows } = await pool.query(
            `select m.*, a.animal_name
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
                data: rows
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

async function getMedicalDataById(id_shelter, id_medical) {
    try {
        const { rows } = await pool.query(
            `select m.*, a.animal_name
            from medical m
            left join animal a on a.id_animal = m.id_animal
            where m.id_shelter = $1
            and m.id_medical = $2
            order by m.created_at desc`,
            [id_shelter, id_medical]
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
    id_medical,
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
            id_medical
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
            returning *`,
            [
                id_medical,
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
        console.error(error);
        return {
            error: true,
            message: "Error creating medical.",
            data: null
        }
    }
}

async function updateMedicalData(
    medical_status,
    vaccin_status,
    medical_date_in,
    medical_date_out,
    medical_cost,
    note,
    updated_by,
    id_shelter,
    id_animal,
    id_medical
) {
    try {
        const result = await pool.query(
            `update medical
            set medical_status = $1
                , vaccin_status = $2
                , medical_date_in = $3
                , medical_date_out = $4
                , medical_cost = $5
                , note = $6
                , updated_by = $7
            where id_shelter = $8 
            and id_animal = $9
            and id_medical = $10
            returning *`,
            [
                medical_status,
                vaccin_status,
                medical_date_in,
                medical_date_out,
                medical_cost,
                note,
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
        console.error(error);
        return {
            error: true,
            message: "Error updating medical.",
            data: null
        }
    }
}

async function deleteMedicalData(id_shelter, id_medical, id_animal) {
    try {
        const result = await pool.query(
            `delete from medical
            where id_shelter = $1
            and id_medical = $2
            and id_animal = $3
            returning *`,
            [
                id_shelter, id_medical, id_animal
            ]
        );
        return {
            error: false,
            message: "Delete medical successfully.",
            medical: result.rows[0]
        }
    } catch (error) {
        console.error(error);
        return {
            error: true,
            message: "Error deleting medical.",
            medical: null
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