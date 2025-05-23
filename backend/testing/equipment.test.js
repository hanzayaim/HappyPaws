const {
  insertEquipment,
  deleteEquipment,
  updateEquipment,
} = require("../controllers/equipment_controller");
const {
  insertEquipmentData,
  deleteEquipmentData,
  updateEquipmentData,
} = require("../models/equipment_models");

jest.mock("../models/equipment_models", () => ({
  insertEquipmentData: jest.fn(),
  deleteEquipmentData: jest.fn(),
  updateEquipmentData: jest.fn(),
}));

const {
  insertExpensesData,
  getExpenses,
} = require("../models/expenses_models");
jest.mock("../models/expenses_models", () => ({
  insertExpensesData: jest.fn(),
  getExpenses: jest.fn(),
}));

describe("Insert Equipment", () => {
  test("insert Equipment data successfully", async () => {
    insertEquipmentData.mockResolvedValueOnce({ success: true });
    insertExpensesData.mockResolvedValueOnce({ success: true });
    const result = await insertEquipment(
      "Cleaning Tools",
      "Beli",
      "01-22-2025",
      150000,
      "Disinfektan dan sapu",
      "admin",
      "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc"
    );
    expect(result).toEqual({ success: true });
  });

  test("insert Equipment with missing name", async () => {
    insertEquipmentData.mockImplementation(() => {
      throw new Error("name cannot be empty");
    });

    await expect(
      insertEquipment(
        null, // name
        "Beli", // type
        "2025-05-21", // date
        150000, // cost
        "note", // note
        "admin", // created_by
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc" // id_shelter
      )
    ).rejects.toThrow("name cannot be empty");
  });

  test("insert Equipment with missing type", async () => {
    insertEquipmentData.mockImplementation(() => {
      throw new Error("type cannot be empty");
    });

    await expect(
      insertEquipment(
        "Cleaning Tools",
        null,
        "2025-05-21",
        150000,
        "note",
        "admin",
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc"
      )
    ).rejects.toThrow("type cannot be empty");
  });

  test("insert Equipment with missing date", async () => {
    insertEquipmentData.mockImplementation(() => {
      throw new Error("date cannot be empty");
    });

    await expect(
      insertEquipment(
        "Cleaning Tools",
        "Beli",
        null,
        150000,
        "note",
        "admin",
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc"
      )
    ).rejects.toThrow("date cannot be empty");
  });

  test("insert Equipment with missing cost", async () => {
    insertEquipmentData.mockImplementation(() => {
      throw new Error("cost cannot be empty");
    });

    await expect(
      insertEquipment(
        "Cleaning Tools",
        "Beli",
        "2025-05-21",
        null,
        "note",
        "admin",
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc"
      )
    ).rejects.toThrow("cost cannot be empty");
  });

  test("insert Equipment with missing note", async () => {
    insertEquipmentData.mockImplementation(() => {
      throw new Error("note cannot be empty");
    });

    await expect(
      insertEquipment(
        "Cleaning Tools",
        "Beli",
        "2025-05-21",
        150000,
        null,
        "admin",
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc"
      )
    ).rejects.toThrow("note cannot be empty");
  });

  test("insert Equipment with missing created_by", async () => {
    insertEquipmentData.mockImplementation(() => {
      throw new Error("created_by cannot be empty");
    });

    await expect(
      insertEquipment(
        "Cleaning Tools",
        "Beli",
        "2025-05-21",
        150000,
        "note",
        null,
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc"
      )
    ).rejects.toThrow("created_by cannot be empty");
  });

  test("insert Equipment with missing id_shelter", async () => {
    insertEquipmentData.mockImplementation(() => {
      throw new Error("id_shelter cannot be empty");
    });

    await expect(
      insertEquipment(
        "Cleaning Tools",
        "Beli",
        "2025-05-21",
        150000,
        "note",
        "admin",
        null
      )
    ).rejects.toThrow("id_shelter cannot be empty");
  });
});

describe("Update Equipment", () => {
  test("Update Equipment data successfully", async () => {
    updateEquipmentData.mockResolvedValueOnce({ success: true });
    const result = await updateEquipment(
      "Alat kebersihan",
      "Beli",
      "01-22-2025",
      150000,
      "Disinfektan dan sapu",
      "admin",
      "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      "EQUIPMENT-ba1e8963-ba43-4211-85dd-bd23cb143175"
    );
    expect(result).toEqual({ success: true });
  });

  test("Update Equipment with missing name", async () => {
    updateEquipmentData.mockImplementation(() => {
      throw new Error("name cannot be empty");
    });

    await expect(
      updateEquipment(
        null,
        "Beli",
        "2025-01-22",
        150000,
        "Disinfektan dan sapu",
        "admin",
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
        "EQUIPMENT-ba1e8963-ba43-4211-85dd-bd23cb143175"
      )
    ).rejects.toThrow("name cannot be empty");
  });

  test("Update Equipment with missing type", async () => {
    updateEquipmentData.mockImplementation(() => {
      throw new Error("type cannot be empty");
    });

    await expect(
      updateEquipment(
        "Alat kebersihan",
        null,
        "2025-01-22",
        150000,
        "Disinfektan dan sapu",
        "admin",
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
        "EQUIPMENT-ba1e8963-ba43-4211-85dd-bd23cb143175"
      )
    ).rejects.toThrow("type cannot be empty");
  });

  test("Update Equipment with missing date", async () => {
    updateEquipmentData.mockImplementation(() => {
      throw new Error("date cannot be empty");
    });

    await expect(
      updateEquipment(
        "Alat kebersihan",
        "Beli",
        null,
        150000,
        "Disinfektan dan sapu",
        "admin",
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
        "EQUIPMENT-ba1e8963-ba43-4211-85dd-bd23cb143175"
      )
    ).rejects.toThrow("date cannot be empty");
  });

  test("Update Equipment with missing cost", async () => {
    updateEquipmentData.mockImplementation(() => {
      throw new Error("cost cannot be empty");
    });

    await expect(
      updateEquipment(
        "Alat kebersihan",
        "Beli",
        "2025-01-22",
        null,
        "Disinfektan dan sapu",
        "admin",
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
        "EQUIPMENT-ba1e8963-ba43-4211-85dd-bd23cb143175"
      )
    ).rejects.toThrow("cost cannot be empty");
  });

  test("Update Equipment with missing note", async () => {
    updateEquipmentData.mockImplementation(() => {
      throw new Error("note cannot be empty");
    });

    await expect(
      updateEquipment(
        "Alat kebersihan",
        "Beli",
        "2025-01-22",
        150000,
        null,
        "admin",
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
        "EQUIPMENT-ba1e8963-ba43-4211-85dd-bd23cb143175"
      )
    ).rejects.toThrow("note cannot be empty");
  });

  test("Update Equipment with missing created_by", async () => {
    updateEquipmentData.mockImplementation(() => {
      throw new Error("created_by cannot be empty");
    });

    await expect(
      updateEquipment(
        "Alat kebersihan",
        "Beli",
        "2025-01-22",
        150000,
        "Disinfektan dan sapu",
        null,
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
        "EQUIPMENT-ba1e8963-ba43-4211-85dd-bd23cb143175"
      )
    ).rejects.toThrow("created_by cannot be empty");
  });

  test("Update Equipment with missing id_shelter", async () => {
    updateEquipmentData.mockImplementation(() => {
      throw new Error("id_shelter cannot be empty");
    });

    await expect(
      updateEquipment(
        "Alat kebersihan",
        "Beli",
        "2025-01-22",
        150000,
        "Disinfektan dan sapu",
        "admin",
        null,
        "EQUIPMENT-ba1e8963-ba43-4211-85dd-bd23cb143175"
      )
    ).rejects.toThrow("id_shelter cannot be empty");
  });

  test("Update Equipment with missing id_equipment", async () => {
    updateEquipmentData.mockImplementation(() => {
      throw new Error("id_equipment cannot be empty");
    });

    await expect(
      updateEquipment(
        "Alat kebersihan",
        "Beli",
        "2025-01-22",
        150000,
        "Disinfektan dan sapu",
        "admin",
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
        null
      )
    ).rejects.toThrow("id_equipment cannot be empty");
  });
});

describe("Delete Equipment", () => {
  test("Delete Equipment data successfully", async () => {
    deleteEquipmentData.mockResolvedValueOnce({ success: true });
    getExpenses.mockResolvedValueOnce({ success: true });
    const result = await deleteEquipment(
      "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      "EQUIPMENT-ba1e8963-ba43-4211-85dd-bd23cb143175"
    );
    expect(result).toEqual({ success: true });
  });
  test("Delete Equipment with missing id_shelter", async () => {
    deleteEquipmentData.mockImplementation(() => {
      getExpenses.mockResolvedValueOnce({ success: true });
      throw new Error("id_shelter cannot be empty");
    });

    await expect(
      deleteEquipment(null, "EQUIPMENT-ba1e8963-ba43-4211-85dd-bd23cb143175")
    ).rejects.toThrow("id_shelter cannot be empty");
  });

  test("Delete Equipment with missing id_equipment", async () => {
    deleteEquipmentData.mockImplementation(() => {
      getExpenses.mockResolvedValueOnce({ success: true });
      throw new Error("id_equipment cannot be empty");
    });

    await expect(
      deleteEquipment("SHELTER-7612f623-6386-4016-9966-9c0ca1debacc", null)
    ).rejects.toThrow("id_equipment cannot be empty");
  });
});
