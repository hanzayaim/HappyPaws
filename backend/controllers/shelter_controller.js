const { insertShelterData } = require("../models/shelter_models");
const generateId = require("../config/generate_id");
const bcrypt = require("bcrypt");

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
    return result;
  } catch (error) {
    console.log("masuk");
    return {
      error: true,
      message: "Failed to insert new shelter.",
      result: null,
    };
  }
};

module.exports = {
  insertNewShelter,
};
