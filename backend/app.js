const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const routes = require("./routes");
const port = process.env.PORT || 3000;
require("dotenv").config();

const isProduction = true;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

cors({
  origin: function (origin, callback) {
    const allowedOrigins = ["https://happypawsshelter.netlify.app"];
    if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ""))) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
});

app.set("trust proxy", 1);

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
  console.log(`Server is running on port ${port}`);
});
