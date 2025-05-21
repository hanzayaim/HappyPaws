const {
  insertFood,
  deleteFood,
  updateFood,
} = require("../controllers/food_controller");
const {
  insertFoodData,
  updateFoodData,
  deleteFoodData,
} = require("../models/food_models");

jest.mock("../models/food_models", () => ({
  insertFoodData: jest.fn(),
  updateFoodData: jest.fn(),
  deleteFoodData: jest.fn(),
}));
describe("Insert Food", () => {
  test("insert food data successfully", async () => {
    insertFoodData.mockResolvedValueOnce({ success: true });
    const foodData = {
      name: "Dog Kibble",
      quantity: 10,
      category: "Dry Food",
      type: "Beli",
      exp_date: "01-23-2025",
      cost: 50000,
      date: "2025-05-21",
      note: "High protein content",
      created_by: "admin",
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
    };

    const result = await insertFood(
      foodData.name,
      foodData.quantity,
      foodData.category,
      foodData.type,
      foodData.exp_date,
      foodData.cost,
      foodData.date,
      foodData.note,
      foodData.created_by,
      foodData.id_shelter
    );
    expect(result).toEqual({ success: true });
  });

  test("Insert food with invalid data requirement", async () => {
    insertFoodData.mockImplementation(() => {
      throw new Error("id_shelter cannot be empty");
    });
    const foodData = {
      name: "Dog Kibble",
      quantity: 10,
      category: "Dry Food",
      type: "Beli",
      exp_date: "01-23-2025",
      cost: 50000,
      date: "2025-05-21",
      note: "High protein content",
      created_by: "admin",
      id_shelter: "",
    };
    await expect(
      insertFood(
        foodData.name,
        foodData.quantity,
        foodData.category,
        foodData.type,
        foodData.exp_date,
        foodData.cost,
        foodData.date,
        foodData.note,
        foodData.created_by,
        foodData.id_shelter
      )
    ).rejects.toThrow("id_shelter cannot be empty");
  });

  test("Insert food with null name", async () => {
    insertFoodData.mockImplementation(() => {
      throw new Error("name cannot be empty");
    });

    await expect(
      insertFood(
        null,
        10,
        "Dry Food",
        "Beli",
        "01-23-2025",
        50000,
        "2025-05-21",
        "note",
        "admin",
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc"
      )
    ).rejects.toThrow("name cannot be empty");
  });

  test("Insert food with null quantity", async () => {
    insertFoodData.mockImplementation(() => {
      throw new Error("quantity cannot be empty");
    });

    await expect(
      insertFood(
        "Dog Food",
        null,
        "Dry Food",
        "Beli",
        "01-23-2025",
        50000,
        "2025-05-21",
        "note",
        "admin",
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc"
      )
    ).rejects.toThrow("quantity cannot be empty");
  });

  test("Insert food with null category", async () => {
    insertFoodData.mockImplementation(() => {
      throw new Error("category cannot be empty");
    });

    await expect(
      insertFood(
        "Dog Food",
        10,
        null,
        "Beli",
        "01-23-2025",
        50000,
        "2025-05-21",
        "note",
        "admin",
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc"
      )
    ).rejects.toThrow("category cannot be empty");
  });

  test("Insert food with null type", async () => {
    insertFoodData.mockImplementation(() => {
      throw new Error("type cannot be empty");
    });

    await expect(
      insertFood(
        "Dog Food",
        10,
        "Dry Food",
        null,
        "01-23-2025",
        50000,
        "2025-05-21",
        "note",
        "admin",
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc"
      )
    ).rejects.toThrow("type cannot be empty");
  });

  test("Insert food with null exp_date", async () => {
    insertFoodData.mockImplementation(() => {
      throw new Error("exp_date cannot be empty");
    });

    await expect(
      insertFood(
        "Dog Food",
        10,
        "Dry Food",
        "Beli",
        null,
        50000,
        "2025-05-21",
        "note",
        "admin",
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc"
      )
    ).rejects.toThrow("exp_date cannot be empty");
  });

  test("Insert food with null cost", async () => {
    insertFoodData.mockImplementation(() => {
      throw new Error("cost cannot be empty");
    });

    await expect(
      insertFood(
        "Dog Food",
        10,
        "Dry Food",
        "Beli",
        "01-23-2025",
        null,
        "2025-05-21",
        "note",
        "admin",
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc"
      )
    ).rejects.toThrow("cost cannot be empty");
  });

  test("Insert food with null date", async () => {
    insertFoodData.mockImplementation(() => {
      throw new Error("date cannot be empty");
    });

    await expect(
      insertFood(
        "Dog Food",
        10,
        "Dry Food",
        "Beli",
        "01-23-2025",
        50000,
        null,
        "note",
        "admin",
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc"
      )
    ).rejects.toThrow("date cannot be empty");
  });

  test("Insert food with null created_by", async () => {
    insertFoodData.mockImplementation(() => {
      throw new Error("created_by cannot be empty");
    });

    await expect(
      insertFood(
        "Dog Food",
        10,
        "Dry Food",
        "Beli",
        "01-23-2025",
        50000,
        "2025-05-21",
        "note",
        null,
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc"
      )
    ).rejects.toThrow("created_by cannot be empty");
  });
});

describe("Update Food", () => {
  test("Update food successfully", async () => {
    updateFoodData.mockResolvedValueOnce({ success: true });
    const result = await updateFood(
      "Cat Food",
      10,
      "Dry Food",
      "Beli",
      "01-23-2025",
      50000,
      "2025-05-21",
      "note",
      "admin",
      "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      "FOOD-3aae9ac2-c43b-481a-ab2d-fc64576b6879"
    );
    await expect(result).toEqual({ success: true });
  });

  test("Update food with invalid id_shelter", async () => {
    updateFoodData.mockImplementation(() => {
      throw new Error("id_shelter cannot be empty");
    });
    await expect(
      updateFood(
        "Cat Food",
        10,
        "Dry Food",
        "Beli",
        "01-23-2025",
        50000,
        "2025-05-21",
        "note",
        "admin",
        "",
        "FOOD-3aae9ac2-c43b-481a-ab2d-fc64576b6879"
      )
    ).rejects.toThrow("id_shelter cannot be empty");
  });

  test("Update food with invalid id_food", async () => {
    updateFoodData.mockImplementation(() => {
      throw new Error("id_food cannot be empty");
    });
    await expect(
      updateFood(
        "Cat Food",
        10,
        "Dry Food",
        "Beli",
        "01-23-2025",
        50000,
        "2025-05-21",
        "note",
        "admin",
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
        ""
      )
    ).rejects.toThrow("id_food cannot be empty");
  });

  test("Update food with null name", async () => {
    updateFoodData.mockImplementation(() => {
      throw new Error("name cannot be empty");
    });

    await expect(
      updateFood(
        null,
        10,
        "Dry Food",
        "Beli",
        "01-23-2025",
        50000,
        "2025-05-21",
        "note",
        "admin",
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
        "FOOD-3aae9ac2-c43b-481a-ab2d-fc64576b6879"
      )
    ).rejects.toThrow("name cannot be empty");
  });

  test("Update food with null quantity", async () => {
    updateFoodData.mockImplementation(() => {
      throw new Error("quantity cannot be empty");
    });

    await expect(
      updateFood(
        "Cat Food",
        null,
        "Dry Food",
        "Beli",
        "01-23-2025",
        50000,
        "2025-05-21",
        "note",
        "admin",
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
        "FOOD-3aae9ac2-c43b-481a-ab2d-fc64576b6879"
      )
    ).rejects.toThrow("quantity cannot be empty");
  });

  test("Update food with null category", async () => {
    updateFoodData.mockImplementation(() => {
      throw new Error("category cannot be empty");
    });

    await expect(
      updateFood(
        "Cat Food",
        10,
        null,
        "Beli",
        "01-23-2025",
        50000,
        "2025-05-21",
        "note",
        "admin",
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
        "FOOD-3aae9ac2-c43b-481a-ab2d-fc64576b6879"
      )
    ).rejects.toThrow("category cannot be empty");
  });

  test("Update food with null type", async () => {
    updateFoodData.mockImplementation(() => {
      throw new Error("type cannot be empty");
    });

    await expect(
      updateFood(
        "Cat Food",
        10,
        "Dry Food",
        null,
        "01-23-2025",
        50000,
        "2025-05-21",
        "note",
        "admin",
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
        "FOOD-3aae9ac2-c43b-481a-ab2d-fc64576b6879"
      )
    ).rejects.toThrow("type cannot be empty");
  });

  test("Update food with null exp_date", async () => {
    updateFoodData.mockImplementation(() => {
      throw new Error("exp_date cannot be empty");
    });

    await expect(
      updateFood(
        "Cat Food",
        10,
        "Dry Food",
        "Beli",
        null,
        50000,
        "2025-05-21",
        "note",
        "admin",
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
        "FOOD-3aae9ac2-c43b-481a-ab2d-fc64576b6879"
      )
    ).rejects.toThrow("exp_date cannot be empty");
  });

  test("Update food with null cost", async () => {
    updateFoodData.mockImplementation(() => {
      throw new Error("cost cannot be empty");
    });

    await expect(
      updateFood(
        "Cat Food",
        10,
        "Dry Food",
        "Beli",
        "01-23-2025",
        null,
        "2025-05-21",
        "note",
        "admin",
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
        "FOOD-3aae9ac2-c43b-481a-ab2d-fc64576b6879"
      )
    ).rejects.toThrow("cost cannot be empty");
  });

  test("Update food with null date", async () => {
    updateFoodData.mockImplementation(() => {
      throw new Error("date cannot be empty");
    });

    await expect(
      updateFood(
        "Cat Food",
        10,
        "Dry Food",
        "Beli",
        "01-23-2025",
        50000,
        null,
        "note",
        "admin",
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
        "FOOD-3aae9ac2-c43b-481a-ab2d-fc64576b6879"
      )
    ).rejects.toThrow("date cannot be empty");
  });

  test("Update food with null created_by", async () => {
    updateFoodData.mockImplementation(() => {
      throw new Error("created_by cannot be empty");
    });

    await expect(
      updateFood(
        "Cat Food",
        10,
        "Dry Food",
        "Beli",
        "01-23-2025",
        50000,
        "2025-05-21",
        "note",
        null,
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
        "FOOD-3aae9ac2-c43b-481a-ab2d-fc64576b6879"
      )
    ).rejects.toThrow("created_by cannot be empty");
  });
});

describe("Delete Food", () => {
  test("Delete food successfully", async () => {
    deleteFoodData.mockResolvedValueOnce({ success: true });
    const result = await deleteFood(
      "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      "FOOD-3aae9ac2-c43b-481a-ab2d-fc64576b6879"
    );
    await expect(result).toEqual({ success: true });
  });

  test("Delete food with invalid id_shelter", async () => {
    deleteFoodData.mockImplementation(() => {
      throw new Error("id_shelter cannot be empty");
    });

    await expect(
      deleteFood("", "FOOD-3aae9ac2-c43b-481a-ab2d-fc64576b6879")
    ).rejects.toThrow("id_shelter cannot be empty");
  });

  test("Delete food with invalid id_food", async () => {
    deleteFoodData.mockImplementation(() => {
      throw new Error("id_food cannot be empty");
    });
    await expect(
      deleteFood("SHELTER-7612f623-6386-4016-9966-9c0ca1debacc", "")
    ).rejects.toThrow("id_food cannot be empty");
  });
});
