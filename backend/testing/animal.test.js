const { insertNewAnimal } = require("../controllers/animal_controller");
const { insertAnimalData } = require("../models/animal_models");

jest.mock("../models/animal_models", () => ({
  insertAnimalData: jest.fn(),
}));

test("insert animal fails when id_shelter is empty", async () => {
  insertAnimalData.mockImplementation(() => {
    throw new Error("id_shelter cannot be empty");
  });

  const animal = {
    id_shelter: "",
    animal_name: "test",
    animal_img: "",
    animal_gender: "test",
    animal_type: "test",
    animal_age: 2,
    rescue_location: "test",
    date: "01-25-2024",
    note: "test",
    created_by: "test",
  };

  await expect(
    insertNewAnimal(
      animal.id_shelter,
      animal.animal_name,
      animal.animal_img,
      animal.animal_gender,
      animal.animal_type,
      animal.animal_age,
      animal.rescue_location,
      animal.date,
      animal.note,
      animal.created_by
    )
  ).rejects.toThrow("id_shelter cannot be empty");
});

test("insert animal success", async () => {
  insertAnimalData.mockResolvedValueOnce({ success: true });

  const animal = {
    id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
    animal_name: "test",
    animal_img: "",
    animal_gender: "test",
    animal_type: "test",
    animal_age: 2,
    rescue_location: "test",
    date: "01-25-2024",
    note: "test",
    created_by: "test",
  };

  const result = await insertNewAnimal(
    animal.id_shelter,
    animal.animal_name,
    animal.animal_img,
    animal.animal_gender,
    animal.animal_type,
    animal.animal_age,
    animal.rescue_location,
    animal.date,
    animal.note,
    animal.created_by
  );

  expect(result).toEqual({ success: true });
});
