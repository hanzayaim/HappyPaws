const generateId = require("../config/generate_id");
const { insertAnimalData } = require("../models/animal_models");

const insertNewAnimal = async (
  id_shelter,
  animal_name,
  animal_img,
  animal_gender,
  animal_type,
  animal_age,
  rescue_location,
  date,
  note,
  created_by
) => {
  try {
    const id_animal = "ANIMAL-" + generateId();

    const result = await insertAnimalData(
      id_shelter,
      id_animal,
      animal_name,
      animal_img,
      animal_gender,
      animal_type,
      animal_age,
      rescue_location,
      date,
      note,
      created_by
    );
    return result;
  } catch (error) {
    return {
      error: true,
      message: "Failed to insert new Animal.",
      result: null,
    };
  }
};

module.exports = {
  insertNewAnimal,
};
