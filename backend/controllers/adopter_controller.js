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
    let cleanBase64String = null;
    if (
      profile_img === null ||
      profile_img === undefined ||
      profile_img === ""
    ) {
      profile_img = null;
    } else {
      cleanBase64String = profile_img.replace(
        /^data:image\/[a-zA-Z]+;base64,/,
        ""
      );
    }
    const profileImgBuffer = cleanBase64String
      ? Buffer.from(cleanBase64String, "base64")
      : null;

    const result = await insertAdopterData(
      id_shelter,
      id_adopter,
      adopter_name,
      profileImgBuffer,
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
