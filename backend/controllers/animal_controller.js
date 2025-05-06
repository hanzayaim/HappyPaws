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

    const cleanBase64String = animal_img.replace(
      /^data:image\/[a-zA-Z]+;base64,/,
      ""
    );

    const animalImgBuffer = cleanBase64String
      ? Buffer.from(cleanBase64String, "base64")
      : null;

    const result = await insertAnimalData(
      id_shelter,
      id_animal,
      animal_name,
      animalImgBuffer,
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
    throw error;
  }
};

module.exports = {
  insertNewAnimal,
};
