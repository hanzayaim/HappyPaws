const bcrypt = require("bcrypt");
const { getShelterPassByEmail } = require("../models/shelter_models");
const { getEmployeePassByEmail } = require("../models/employee_models");

const MESSAGES = {
  MISSING_CREDENTIALS: "Email and password are required",
  INVALID_CREDENTIALS: "Invalid email or password",
  WRONG_PASSWORD: "Wrong password.",
  LOGIN_SUCCESS: "Login successfully.",
  INTERNAL_ERROR: "Internal server error.",
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: MESSAGES.MISSING_CREDENTIALS });
  }

  try {
    let result = await getShelterPassByEmail(email);
    let userType = null;

    if (result.data) {
      userType = "shelter";
    } else {
      result = await getEmployeePassByEmail(email);
      if (result.data) {
        userType = "employee";
      }
    }

    if (!userType || result.error || !result.data) {
      return res.status(401).json({ message: MESSAGES.INVALID_CREDENTIALS });
    }

    const passwordHash = result.data.password;

    bcrypt.compare(password, passwordHash, (err, isMatch) => {
      if (err) throw err;

      if (isMatch) {
        req.session.user = { email, userType };
        res.json({ message: MESSAGES.LOGIN_SUCCESS, email });
      } else {
        res.status(401).json({ message: MESSAGES.WRONG_PASSWORD });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: MESSAGES.INTERNAL_ERROR });
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
