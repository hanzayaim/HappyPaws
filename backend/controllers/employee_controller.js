const { insertEmployeeData } = require("../models/employee_models");
const generateId = require("../config/generate_id");
const bcrypt = require("bcrypt");

const insertNewEmployee = async (
  id_shelter,
  name,
  email,
  password,
  role,
  gender,
  shelter_name,
  phone_number,
  address
) => {
  try {
    const id_employee = "EMPLOYEE-" + generateId();
    const status = "New";
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await insertEmployeeData(
      id_shelter,
      id_employee,
      name,
      email,
      hashedPassword,
      role,
      gender,
      shelter_name,
      phone_number,
      address,
      status
    );
    return result;
  } catch (error) {
    return {
      error: true,
      message: "Failed to insert new employee.",
      result: null,
    };
  }
};

module.exports = {
  insertNewEmployee,
};
