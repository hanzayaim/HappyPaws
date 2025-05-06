const bcrypt = require("bcrypt");
const {
  getShelterPassByEmail,
  getShelterIdByEmail,
  getShelterDataById,
} = require("../models/shelter_models");
const {
  getEmployeePassByEmail,
  getEmployeeDataById,
  getShelterIdByEmployee,
} = require("../models/employee_models");

const superuser = {
  email: "superuser@gmail.com",
  password: "H4ppyP4ws2025B1nu5Un1V3Rs1tY",
  name: "Superuser HappyPaws",
  userType: "superuser",
  role: "Superuser",
  id_shelter: null,
  status: "Active",
};

const MESSAGES = {
  MISSING_CREDENTIALS: "Email and password are required",
  INVALID_CREDENTIALS: "Invalid email or password",
  WRONG_PASSWORD: "Wrong password.",
  LOGIN_SUCCESS: "Login successfully.",
  INTERNAL_ERROR: "Internal server error.",
  PROFILE_NOT_FOUND: "Profile not found.",
  ACCOUNT_NEW:
    "Your account is pending activation. Please wait for administrator approval or contact the administrator for assistance.",
  ACCOUNT_INACTIVE:
    "Your account is inactive. Please contact the administrator for assistance.",
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: MESSAGES.MISSING_CREDENTIALS });
  }

  if (email === superuser.email) {
    if (password === superuser.password) {
      req.session.user = {
        email: superuser.email,
        userType: "superuser",
        role: superuser.role,
      };

      const { password, ...safeUserData } = superuser;

      return res.json({
        message: MESSAGES.LOGIN_SUCCESS,
        userType: "superuser",
        userData: safeUserData,
      });
    } else {
      return res.status(401).json({ message: MESSAGES.WRONG_PASSWORD });
    }
  }

  try {
    let result = await getShelterPassByEmail(email);
    let userType = null;
    let userData = null;

    if (result.data) {
      userType = "shelter";
      const shelterIdResult = await getShelterIdByEmail(email);

      if (shelterIdResult.data) {
        const shelterId = shelterIdResult.data.id_shelter;
        const shelterData = await getShelterDataById(shelterId);

        if (shelterData.data) {
          userData = shelterData.data;
          userData.role = userData.role || "Owner";
        }
      }
    } else {
      result = await getEmployeePassByEmail(email);
      if (result.data) {
        userType = "employee";
        const shelterIdResult = await getShelterIdByEmployee(email);

        if (shelterIdResult.data) {
          const shelterId = shelterIdResult.data.id_shelter;
          const { rows } = await require("../config/db").query(
            "SELECT id_employee FROM employee_shelter WHERE email = $1 AND id_shelter = $2",
            [email, shelterId]
          );

          if (rows.length > 0) {
            const employeeId = rows[0].id_employee;
            const employeeData = await getEmployeeDataById(
              shelterId,
              employeeId
            );

            if (employeeData.data) {
              userData = employeeData.data;
            }
          }
        }
      }
    }

    if (!userType || !userData || result.error || !result.data) {
      return res.status(401).json({ message: MESSAGES.INVALID_CREDENTIALS });
    }

    if (userData.status == "New") {
      return res.status(403).json({
        message: MESSAGES.ACCOUNT_NEW,
        status: "New",
      });
    }

    if (userData.status == "Inactive") {
      return res.status(403).json({
        message: MESSAGES.ACCOUNT_INACTIVE,
        status: "Inactive",
      });
    }

    const passwordHash = result.data.password;

    bcrypt.compare(password, passwordHash, (err, isMatch) => {
      if (err) throw err;

      if (isMatch) {
        req.session.user = {
          email,
          userType,
          id_shelter: userData.id_shelter,
          ...(userType === "employee" && { id_employee: userData.id_employee }),
        };

        const { password, ...safeUserData } = userData;

        res.json({
          message: MESSAGES.LOGIN_SUCCESS,
          userType,
          userData: safeUserData,
        });
      } else {
        res.status(401).json({ message: MESSAGES.WRONG_PASSWORD });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: MESSAGES.INTERNAL_ERROR });
  }
};

exports.profile = async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "You are not logged in." });
  }

  const { email, userType, id_shelter, id_employee } = req.session.user;

  try {
    if (userType === "superuser") {
      const { password, ...safeUserData } = superuser;
      return res.json({
        message: "Profile retrieved successfully.",
        userType,
        profile: safeUserData,
      });
    } else if (userType === "shelter") {
      const result = await getShelterDataById(id_shelter);
      if (result.error || !result.data) {
        return res.status(404).json({ message: MESSAGES.PROFILE_NOT_FOUND });
      }
      const { password, ...safeProfileData } = result.data;
      return res.json({
        message: "Profile retrieved successfully.",
        userType,
        profile: safeProfileData,
      });
    } else if (userType === "employee") {
      let employeeId = id_employee;

      if (!employeeId) {
        const { rows } = await require("../config/db").query(
          "SELECT id_employee FROM employee_shelter WHERE email = $1 AND id_shelter = $2",
          [email, id_shelter]
        );

        if (rows.length === 0) {
          return res.status(404).json({ message: MESSAGES.PROFILE_NOT_FOUND });
        }

        employeeId = rows[0].id_employee;
        req.session.user.id_employee = employeeId;
      }

      const result = await getEmployeeDataById(id_shelter, employeeId);

      if (result.error || !result.data) {
        return res.status(404).json({ message: MESSAGES.PROFILE_NOT_FOUND });
      }

      const { password, ...safeProfileData } = result.data;
      return res.json({
        message: "Profile retrieved successfully.",
        userType,
        profile: safeProfileData,
      });
    } else {
      return res.status(400).json({ message: "Invalid user type." });
    }
  } catch (error) {
    console.error("Profile error:", error);
    return res.status(500).json({ message: MESSAGES.INTERNAL_ERROR });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Failed to logout." });
    res.json({ message: "Logout successfully." });
  });
};
