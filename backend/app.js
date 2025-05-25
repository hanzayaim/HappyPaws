const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const routes = require("./routes");
const port = process.env.PORT || 3000;
require("dotenv").config();

// const isProduction = true;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(
  cors({
    origin: [
      "https://happypawsshelter.netlify.app",
      "https://www.happypawsshelter.netlify.app",
    ],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);

app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
      domain: ".happypawsshelter.netlify.app",
    },
  })
);

app.use("/api", routes);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Private-Network', 'true');
  res.header('Cache-Control', 'no-store');
  next();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
