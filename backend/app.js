const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const routes = require("./routes");
const port = process.env.PORT || 3000;
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

const allowedOrigins = isProduction
  ? ["https://your-frontend-domain.com"]
  : ["http://localhost:5173"];

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
