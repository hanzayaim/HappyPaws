const pgsql = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new pgsql.Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function getAdopterData(shelter_id) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM adopter_profile where id_shelter = ?",
      [shelter_id]
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
