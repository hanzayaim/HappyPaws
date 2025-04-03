const pgsql = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new pgsql.Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

async function getMedicalData(shelter_id) {
    try {
        const { rows } = await pool.query(
            `select *
            from medical m 
            left join animal a ON a.id_animal = m.id_animal 
            where m.id_shelter = $1`, 
        [shelter_id]
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
            message: "Error fetching data",
            data: null
        };
    }
}

module.exports = { getMedicalData };