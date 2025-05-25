const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const routes = require("./routes");
require("dotenv").config();

const port = process.env.PORT || 3000;
const isProduction = true;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(
  cors({
    origin: "https://happypawsshelter.netlify.app",
    credentials: true,
  })
);

app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
