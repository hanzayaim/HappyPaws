const express = require("express");
const app = express();
const session = require("express-session");
const routes = require("./routes");
const port = process.env.PORT || 3000;

require("dotenv").config();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "lax",
    },
  })
);

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
