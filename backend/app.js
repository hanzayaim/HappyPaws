const express = require("express");
const cors = require("cors");
const medicalRoutes = require("./medical/medical_routes");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api", medicalRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
