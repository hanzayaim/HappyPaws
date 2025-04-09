const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");
const port = process.env.PORT || 3000;

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
