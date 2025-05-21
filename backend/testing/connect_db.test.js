const pool = require("../config/db.js");

test("connect to database", async () => {
  const result = await pool.query("SELECT 1 AS column1");
  expect(result.rows[0].column1).toBe(1);
});
