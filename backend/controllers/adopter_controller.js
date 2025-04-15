const generateId = require("../config/generate_id");
const { insertAdopterData } = require("../models/adopter_models");

const insertNewAdopter = async (
  id_shelter,
  adopter_name,
  profile_img,
  gender,
  phone_number,
  address,
  createdby
) => {
  try {
    const id_adopter = "Adopter-" + generateId();

    const result = await insertAdopterData(
      id_shelter,
      id_adopter,
      adopter_name,
      profile_img,
      gender,
      phone_number,
      address,
      createdby
    );
    return result;
  } catch (error) {
    return {
      error: true,
      message: "Failed to insert new adopter.",
      result: null,
    };
  }
};

module.exports = {
  insertNewAdopter,
};
