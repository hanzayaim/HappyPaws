const bcrypt = require("bcrypt");
const { getShelterPassByEmail } = require("../models/shelter_models");
const { getEmployeePassByEmail } = require("../models/employee_models");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    let result = await getShelterPassByEmail(email);
    let userType = "shelter";

    if (result.error || !result.data) {
      result = await getEmployeePassByEmail(email);
      userType = "employee";
    }

    if (result.error || !result.data) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordHash = result.data.password;

    bcrypt.compare(password, passwordHash, (err, result) => {
      if (err) throw err;

      if (result) {
        req.session.user = { email };
        res.json({ message: "Login successfully.", email });
      } else {
        res.status(401).json({ message: "Wrong password." });
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

exports.profile = (req, res) => {
  if (req.session.user) {
    res.json({
      message: `Hello ${req.session.user.email}, you already login.`,
    });
  } else {
    res.status(401).json({ message: "You are not logged in." });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Failed to logout." });
    res.json({ message: "Logout successfully." });
  });
};
