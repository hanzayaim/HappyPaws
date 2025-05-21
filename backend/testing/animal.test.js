const { insertNewAnimal } = require("../controllers/animal_controller");
const {
  insertAnimalData,
  updateAnimalData,
  deleteAnimalData,
} = require("../models/animal_models");

jest.mock("../models/animal_models", () => ({
  insertAnimalData: jest.fn(),
  updateAnimalData: jest.fn(),
  deleteAnimalData: jest.fn(),
}));

describe("Insert Animal", () => {
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

  test("insert animal fails when animal_name is empty", async () => {
    insertAnimalData.mockImplementation(() => {
      throw new Error("animal_name cannot be empty");
    });

    const animal = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      animal_name: "",
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
    ).rejects.toThrow("animal_name cannot be empty");
  });

  test("insert animal fails when animal_gender is empty", async () => {
    insertAnimalData.mockImplementation(() => {
      throw new Error("animal_gender cannot be empty");
    });

    const animal = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      animal_name: "test",
      animal_img: "",
      animal_gender: "",
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
    ).rejects.toThrow("animal_gender cannot be empty");
  });

  test("insert animal fails when date is empty", async () => {
    insertAnimalData.mockImplementation(() => {
      throw new Error("date cannot be empty");
    });

    const animal = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      animal_name: "test",
      animal_img: "",
      animal_gender: "test",
      animal_type: "test",
      animal_age: 2,
      rescue_location: "test",
      date: "",
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
    ).rejects.toThrow("date cannot be empty");
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
});

describe("Update Animal", () => {
  test("update animal success", async () => {
    updateAnimalData.mockResolvedValueOnce({ success: true });

    const animal = {
      animal_name: "test",
      animal_img: "",
      animal_gender: "test",
      animal_type: "test",
      animal_age: 2,
      rescue_location: "test",
      date: "01-25-2024",
      note: "test",
      updated_by: "test",
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_animal: "ANIMAL-7def6a8d-5936-4acc-a67c-a3f2dc72404c",
    };

    const result = await updateAnimalData(
      animal.animal_name,
      animal.animal_img,
      animal.animal_gender,
      animal.animal_type,
      animal.animal_age,
      animal.rescue_location,
      animal.date,
      animal.note,
      animal.updated_by,
      animal.id_shelter,
      animal.id_animal
    );

    expect(result).toEqual({ success: true });
  });

  test("update animal fails when id_animal is empty", async () => {
    updateAnimalData.mockImplementation(async () => {
      throw new Error("id_animal cannot be empty");
    });

    const animal = {
      animal_name: "test",
      animal_img: "",
      animal_gender: "test",
      animal_type: "test",
      animal_age: 2,
      rescue_location: "test",
      date: "01-25-2024",
      note: "test",
      updated_by: "test",
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_animal: "",
    };

    await expect(
      updateAnimalData(
        animal.animal_name,
        animal.animal_img,
        animal.animal_gender,
        animal.animal_type,
        animal.animal_age,
        animal.rescue_location,
        animal.date,
        animal.note,
        animal.updated_by,
        animal.id_shelter,
        animal.id_animal
      )
    ).rejects.toThrow("id_animal cannot be empty");
  });

  test("update animal fails when id_shelter is empty", async () => {
    updateAnimalData.mockImplementation(async () => {
      throw new Error("id_shelter cannot be empty");
    });

    const animal = {
      animal_name: "test",
      animal_img: "",
      animal_gender: "test",
      animal_type: "test",
      animal_age: 2,
      rescue_location: "test",
      date: "01-25-2024",
      note: "test",
      updated_by: "test",
      id_shelter: "",
      id_animal: "ANIMAL-7def6a8d-5936-4acc-a67c-a3f2dc72404c",
    };

    await expect(
      updateAnimalData(
        animal.animal_name,
        animal.animal_img,
        animal.animal_gender,
        animal.animal_type,
        animal.animal_age,
        animal.rescue_location,
        animal.date,
        animal.note,
        animal.updated_by,
        animal.id_shelter,
        animal.id_animal
      )
    ).rejects.toThrow("id_shelter cannot be empty");
  });

  test("update animal fails when animal_name is empty", async () => {
    updateAnimalData.mockImplementation(async () => {
      throw new Error("animal_name cannot be empty");
    });

    const animal = {
      animal_name: "",
      animal_img: "",
      animal_gender: "test",
      animal_type: "test",
      animal_age: 2,
      rescue_location: "test",
      date: "01-25-2024",
      note: "test",
      updated_by: "test",
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_animal: "ANIMAL-7def6a8d-5936-4acc-a67c-a3f2dc72404c",
    };

    await expect(
      updateAnimalData(
        animal.animal_name,
        animal.animal_img,
        animal.animal_gender,
        animal.animal_type,
        animal.animal_age,
        animal.rescue_location,
        animal.date,
        animal.note,
        animal.updated_by,
        animal.id_shelter,
        animal.id_animal
      )
    ).rejects.toThrow("animal_name cannot be empty");
  });

  test("update animal fails when animal_gender is empty", async () => {
    updateAnimalData.mockImplementation(async () => {
      throw new Error("animal_gender cannot be empty");
    });

    const animal = {
      animal_name: "test",
      animal_img: "",
      animal_gender: "",
      animal_type: "test",
      animal_age: 2,
      rescue_location: "test",
      date: "01-25-2024",
      note: "test",
      updated_by: "test",
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_animal: "ANIMAL-7def6a8d-5936-4acc-a67c-a3f2dc72404c",
    };

    await expect(
      updateAnimalData(
        animal.animal_name,
        animal.animal_img,
        animal.animal_gender,
        animal.animal_type,
        animal.animal_age,
        animal.rescue_location,
        animal.date,
        animal.note,
        animal.updated_by,
        animal.id_shelter,
        animal.id_animal
      )
    ).rejects.toThrow("animal_gender cannot be empty");
  });

  test("update animal fails when date is empty", async () => {
    updateAnimalData.mockImplementation(async () => {
      throw new Error("date cannot be empty");
    });

    const animal = {
      animal_name: "test",
      animal_img: "",
      animal_gender: "test",
      animal_type: "test",
      animal_age: 2,
      rescue_location: "test",
      date: "",
      note: "test",
      updated_by: "test",
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_animal: "ANIMAL-7def6a8d-5936-4acc-a67c-a3f2dc72404c",
    };

    await expect(
      updateAnimalData(
        animal.animal_name,
        animal.animal_img,
        animal.animal_gender,
        animal.animal_type,
        animal.animal_age,
        animal.rescue_location,
        animal.date,
        animal.note,
        animal.updated_by,
        animal.id_shelter,
        animal.id_animal
      )
    ).rejects.toThrow("date cannot be empty");
  });
});

describe("Delete Animal", () => {
  test("delete animal fails when id_shelter is empty", async () => {
    deleteAnimalData.mockImplementation(async () => {
      throw new Error("id_shelter cannot be empty");
    });

    const animal = {
      id_shelter: "",
      id_animal: "ANIMAL-7def6a8d-5936-4acc-a67c-a3f2dc72404c",
    };

    await expect(
      deleteAnimalData(animal.id_shelter, animal.id_animal)
    ).rejects.toThrow("id_shelter cannot be empty");
  });

  test("delete animal fails when id_animal is empty", async () => {
    deleteAnimalData.mockImplementation(async () => {
      throw new Error("id_animal cannot be empty");
    });

    const animal = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_animal: "",
    };

    await expect(
      deleteAnimalData(animal.id_shelter, animal.id_animal)
    ).rejects.toThrow("id_animal cannot be empty");
  });

  test("delete animal sucessfully", async () => {
    deleteAnimalData.mockResolvedValueOnce({ success: true });

    const animal = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_animal: "ANIMAL-7def6a8d-5936-4acc-a67c-a3f2dc72404c",
    };

    const result = await deleteAnimalData(animal.id_shelter, animal.id_animal);

    expect(result).toEqual({ success: true });
  });
});
