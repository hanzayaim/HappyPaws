const {
  insertIncome,
  deleteIncome,
  updateIncome,
} = require("../controllers/income_controller");
const {
  insertIncomeData,
  deleteIncomeData,
  updateIncomeData,
} = require("../models/income_models");

jest.mock("../models/income_models", () => ({
  insertIncomeData: jest.fn(),
  deleteIncomeData: jest.fn(),
  updateIncomeData: jest.fn(),
}));
describe("Insert Income", () => {
  test("insert Income data successfully", async () => {
    insertIncomeData.mockResolvedValueOnce({ success: true });
    const result = await insertIncome(
      "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      "Donasi Komunitas",
      500000,
      "2025-05-21",
      "Donasi",
      "Bantuan dari komunitas pecinta hewan",
      "admin"
    );
    expect(result).toEqual({ success: true });
  });

  test("insert Income with missing id_shelter", async () => {
    insertIncomeData.mockImplementation(() => {
      throw new Error("id_shelter cannot be empty");
    });

    await expect(
      insertIncome(
        "",
        "Donasi Komunitas",
        500000,
        "2025-05-21",
        "Donasi",
        "Bantuan dari komunitas pecinta hewan",
        "admin"
      )
    ).rejects.toThrow("id_shelter cannot be empty");
  });

  test("insert Income with null name", async () => {
    insertIncomeData.mockImplementation(() => {
      throw new Error("name cannot be empty");
    });

    await expect(
      insertIncome(
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
        null,
        500000,
        "2025-05-21",
        "Donasi",
        "Bantuan dari komunitas pecinta hewan",
        "admin"
      )
    ).rejects.toThrow("name cannot be empty");
  });

  test("insert Income with null amount", async () => {
    insertIncomeData.mockImplementation(() => {
      throw new Error("amount cannot be empty");
    });

    await expect(
      insertIncome(
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
        "Donasi Komunitas",
        null,
        "2025-05-21",
        "Donasi",
        "Bantuan dari komunitas pecinta hewan",
        "admin"
      )
    ).rejects.toThrow("amount cannot be empty");
  });

  test("insert Income with null date", async () => {
    insertIncomeData.mockImplementation(() => {
      throw new Error("date cannot be empty");
    });

    await expect(
      insertIncome(
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
        "Donasi Komunitas",
        500000,
        null,
        "Donasi",
        "Bantuan dari komunitas pecinta hewan",
        "admin"
      )
    ).rejects.toThrow("date cannot be empty");
  });

  test("insert Income with null type", async () => {
    insertIncomeData.mockImplementation(() => {
      throw new Error("type cannot be empty");
    });

    await expect(
      insertIncome(
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
        "Donasi Komunitas",
        500000,
        "2025-05-21",
        null,
        "Bantuan dari komunitas pecinta hewan",
        "admin"
      )
    ).rejects.toThrow("type cannot be empty");
  });

  test("insert Income with null created_by", async () => {
    insertIncomeData.mockImplementation(() => {
      throw new Error("created_by cannot be empty");
    });

    await expect(
      insertIncome(
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
        "Donasi Komunitas",
        500000,
        "2025-05-21",
        "Donasi",
        "Bantuan dari komunitas pecinta hewan",
        null
      )
    ).rejects.toThrow("created_by cannot be empty");
  });
});

describe("Update Income", () => {
  test("Update Income data successfully", async () => {
    updateIncomeData.mockResolvedValueOnce({ success: true });
    const result = await updateIncome(
      "INCOME-d10a53a6-d756-4754-bd42-de3b4e367c20",
      "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      "Donasi Komunitas",
      500000,
      "2025-05-21",
      "Donasi",
      "Bantuan dari komunitas pecinta hewan",
      "admin"
    );
    expect(result).toEqual({ success: true });
  });

  test("Update Income with null id_income", async () => {
    updateIncomeData.mockImplementation(() => {
      throw new Error("id_income cannot be empty");
    });

    await expect(
      updateIncome(
        null,
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
        "Donasi Komunitas",
        500000,
        "2025-05-21",
        "Donasi",
        "Bantuan dari komunitas pecinta hewan",
        "admin"
      )
    ).rejects.toThrow("id_income cannot be empty");
  });

  test("Update Income with null id_shelter", async () => {
    updateIncomeData.mockImplementation(() => {
      throw new Error("id_shelter cannot be empty");
    });

    await expect(
      updateIncome(
        "INCOME-d10a53a6-d756-4754-bd42-de3b4e367c20",
        null,
        "Donasi Komunitas",
        500000,
        "2025-05-21",
        "Donasi",
        "Bantuan dari komunitas pecinta hewan",
        "admin"
      )
    ).rejects.toThrow("id_shelter cannot be empty");
  });

  test("Update Income with null name", async () => {
    updateIncomeData.mockImplementation(() => {
      throw new Error("name cannot be empty");
    });

    await expect(
      updateIncome(
        "INCOME-d10a53a6-d756-4754-bd42-de3b4e367c20",
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
        null,
        500000,
        "2025-05-21",
        "Donasi",
        "Bantuan dari komunitas pecinta hewan",
        "admin"
      )
    ).rejects.toThrow("name cannot be empty");
  });

  test("Update Income with null amount", async () => {
    updateIncomeData.mockImplementation(() => {
      throw new Error("amount cannot be empty");
    });

    await expect(
      updateIncome(
        "INCOME-d10a53a6-d756-4754-bd42-de3b4e367c20",
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
        "Donasi Komunitas",
        null,
        "2025-05-21",
        "Donasi",
        "Bantuan dari komunitas pecinta hewan",
        "admin"
      )
    ).rejects.toThrow("amount cannot be empty");
  });

  test("Update Income with null date", async () => {
    updateIncomeData.mockImplementation(() => {
      throw new Error("date cannot be empty");
    });

    await expect(
      updateIncome(
        "INCOME-d10a53a6-d756-4754-bd42-de3b4e367c20",
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
        "Donasi Komunitas",
        500000,
        null,
        "Donasi",
        "Bantuan dari komunitas pecinta hewan",
        "admin"
      )
    ).rejects.toThrow("date cannot be empty");
  });

  test("Update Income with null type", async () => {
    updateIncomeData.mockImplementation(() => {
      throw new Error("type cannot be empty");
    });

    await expect(
      updateIncome(
        "INCOME-d10a53a6-d756-4754-bd42-de3b4e367c20",
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
        "Donasi Komunitas",
        500000,
        "2025-05-21",
        null,
        "Bantuan dari komunitas pecinta hewan",
        "admin"
      )
    ).rejects.toThrow("type cannot be empty");
  });

  test("Update Income with null created_by", async () => {
    updateIncomeData.mockImplementation(() => {
      throw new Error("created_by cannot be empty");
    });

    await expect(
      updateIncome(
        "INCOME-d10a53a6-d756-4754-bd42-de3b4e367c20",
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
        "Donasi Komunitas",
        500000,
        "2025-05-21",
        "Donasi",
        "Bantuan dari komunitas pecinta hewan",
        null
      )
    ).rejects.toThrow("created_by cannot be empty");
  });
});

describe("Delete Income", () => {
  test("Delete Income data successfully", async () => {
    deleteIncomeData.mockResolvedValueOnce({ success: true });
    const result = await deleteIncome(
      "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      "INCOME-d10a53a6-d756-4754-bd42-de3b4e367c20"
    );
    expect(result).toEqual({ success: true });
  });

  test("Delete Income with null id_shelter", async () => {
    deleteIncomeData.mockImplementation(() => {
      throw new Error("id_shelter cannot be empty");
    });
    await expect(
      deleteIncome(null, "INCOME-d10a53a6-d756-4754-bd42-de3b4e367c20")
    ).rejects.toThrow("id_shelter cannot be empty");
  });

  test("Delete Income with null id_income", async () => {
    deleteIncomeData.mockImplementation(() => {
      throw new Error("id_income cannot be empty");
    });
    await expect(
      deleteIncome("SHELTER-7612f623-6386-4016-9966-9c0ca1debacc", null)
    ).rejects.toThrow("id_income cannot be empty");
  });
});
