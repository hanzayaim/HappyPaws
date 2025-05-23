const {
  insertExpenses,
  deleteExpensesById,
} = require("../controllers/expenses_controller");

const {
  insertExpensesData,
  deleteExpensesData,
  getExpenses,
} = require("../models/expenses_models");
jest.mock("../models/expenses_models", () => ({
  insertExpensesData: jest.fn(),
  deleteExpensesData: jest.fn(),
  getExpenses: jest.fn(),
}));

describe("Insert Expenses", () => {
  test("insert Expenses data Medical successfully", async () => {
    insertExpensesData.mockResolvedValueOnce({ success: true });
    const result = await insertExpenses(
      "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      null,
      "MEDICAL-f1833369-2c3a-401c-9d94-e93d93a208dd",
      null,
      null,
      "admin"
    );
    expect(result).toEqual({ success: true });
  });
  test("insert Expenses data Food successfully", async () => {
    insertExpensesData.mockResolvedValueOnce({ success: true });
    const result = await insertExpenses(
      "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      "FOOD-e650d5db-7c84-400a-bdf5-204ba7dcc329",
      null,
      null,
      null,
      "admin"
    );
    expect(result).toEqual({ success: true });
  });
  test("insert Expenses data Equipment successfully", async () => {
    insertExpensesData.mockResolvedValueOnce({ success: true });
    const result = await insertExpenses(
      "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      null,
      null,
      "EQUIPMENT-743a2cba-4bf9-4e78-a43f-74fb7608c2fd",
      null,
      "admin"
    );
    expect(result).toEqual({ success: true });
  });
  test("insert Expenses data Salary successfully", async () => {
    insertExpensesData.mockResolvedValueOnce({ success: true });
    const result = await insertExpenses(
      "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      null,
      null,
      null,
      "SALARY-4e676bd0-196c-42c0-a412-e70a8beb5b4f",
      "admin"
    );
    expect(result).toEqual({ success: true });
  });
  test("insert Expenses with missing id", async () => {
    insertExpensesData.mockImplementation(() => {
      throw new Error({
        error: true,
        message: "Failed to insert expenses data.",
        result: null,
      });
    });

    await expect(
      insertExpenses(
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
        null,
        null,
        null,
        null
      )
    ).resolves.toEqual({
      error: true,
      message: "Failed to insert expenses data.",
      result: null,
    });
  });
});

describe("Delete Expenses", () => {
  test("Delete Expenses data successfully", async () => {
    const mockExpense = {
      id_expenses: "EXPENSES-abc123",
      id_food: null,
      id_medical: "MEDICAL-f1833369-2c3a-401c-9d94-e93d93a208dd",
      id_equipment: null,
      id_salary: null,
    };

    getExpenses.mockResolvedValueOnce({ data: [mockExpense] });
    deleteExpensesData.mockResolvedValueOnce({ success: true });

    const result = await deleteExpensesById(
      "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      "MEDICAL-f1833369-2c3a-401c-9d94-e93d93a208dd"
    );

    expect(result).toEqual({ success: true });
  });

  test("Delete Expenses data with missing id_shelter", async () => {
    deleteExpensesData.mockImplementation(async () => {
      throw new Error("id_shelter is missing");
    });
    const result = await deleteExpensesById(
      "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      null
    );
    expect(result).toEqual({
      error: true,
      message: "Failed to delete Expenses data.",
      result: null,
    });
  });

  test("Delete Expenses data with table_id", async () => {
    deleteExpensesData.mockImplementation(async () => {
      throw new Error("table_id is missing");
    });
    const result = await deleteExpensesById(
      "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      null
    );
    expect(result).toEqual({
      error: true,
      message: "Failed to delete Expenses data.",
      result: null,
    });
  });
});
