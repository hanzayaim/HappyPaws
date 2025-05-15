const { insertShelterData } = require("../models/shelter_models");
const generateId = require("../config/generate_id");
const bcrypt = require("bcrypt");
const { insertFinance } = require("./finance_controller");

const insertNewShelter = async (
  owner_name,
  email,
  password,
  shelter_name,
  phone_number,
  address
) => {
  try {
    const id_shelter = "SHELTER-" + generateId();
    const status = "New";
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await insertShelterData(
      id_shelter,
      owner_name,
      email,
      hashedPassword,
      shelter_name,
      phone_number,
      address,
      status
    );

    insertFinance(id_shelter);

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  insertNewShelter,
};
