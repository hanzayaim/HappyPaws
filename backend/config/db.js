const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on("connect", async (client) => {
  await client.query(`SET TIME ZONE 'Asia/Jakarta'`);
});

module.exports = pool;
