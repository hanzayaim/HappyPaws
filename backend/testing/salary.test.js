const {
  deleteSalaryData,
  insertSalaryData,
} = require("../models/salary_models");
const {
  insertSalary,
  deleteSalary,
} = require("../controllers/salary_contoller");
const {
  insertExpenses,
  deleteExpensesById,
} = require("../controllers/expenses_controller");

jest.mock("../models/salary_models.js", () => ({
  insertSalaryData: jest.fn(),
  deleteSalaryData: jest.fn(),
}));

jest.mock("../models/expenses_models.js", () => ({
  insertExpensesData: jest.fn(),
}));

jest.mock("../controllers/expenses_controller.js", () => ({
  insertExpenses: jest.fn(),
  deleteExpensesById: jest.fn(),
}));

jest.mock("../controllers/finance_controller.js", () => ({
  updateTotalBalance: jest.fn(),
  updateBalance: jest.fn(),
}));

describe("Insert Salary Tests", () => {
  test("insert salary fails when id_salary is null", async () => {
    insertSalaryData.mockRejectedValueOnce(
      new Error("id_salary cannot be empty")
    );

    const salary = {
      id_salary: "",
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_employee: "EMPLOYEE-5d553b30-f4cc-401a-bd58-00e3e7c7b710",
      name: "Salary Month - Argenta Darmawan",
      cost: 50000,
      date: "2025-05-23",
      note: "Gaji bulanan",
      created_by: "Raihan Daffa Rizky",
    };

    const result = await insertSalary(
      salary.id_salary,
      salary.id_shelter,
      salary.id_employee,
      salary.name,
      salary.cost,
      salary.date,
      salary.note,
      salary.created_by
    );

    expect(result).toEqual({
      error: true,
      message: "Failed create Salary Data",
      data: null,
    });
  });

  test("insert salary fails when id_shelter is null", async () => {
    insertSalaryData.mockRejectedValueOnce(
      new Error("id_shelter cannot be empty")
    );

    const salary = {
      id_salary: "SALARY-4e676bd0-196c-42c0-a412-e70a8beb5b4f",
      id_shelter: "",
      id_employee: "EMPLOYEE-5d553b30-f4cc-401a-bd58-00e3e7c7b710",
      name: "Salary Month - Argenta Darmawan",
      cost: 50000,
      date: "2025-05-23",
      note: "Gaji bulanan",
      created_by: "Raihan Daffa Rizky",
    };

    const result = await insertSalary(
      salary.id_salary,
      salary.id_shelter,
      salary.id_employee,
      salary.name,
      salary.cost,
      salary.date,
      salary.note,
      salary.created_by
    );

    expect(result).toEqual({
      error: true,
      message: "Failed create Salary Data",
      data: null,
    });
  });

  test("insert salary fails when id_employee is null", async () => {
    insertSalaryData.mockRejectedValueOnce(
      new Error("id_employee cannot be empty")
    );

    const salary = {
      id_salary: "SALARY-4e676bd0-196c-42c0-a412-e70a8beb5b4f",
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_employee: "",
      name: "Salary Month - Argenta Darmawan",
      cost: 50000,
      date: "2025-05-23",
      note: "Gaji bulanan",
      created_by: "Raihan Daffa Rizky",
    };

    const result = await insertSalary(
      salary.id_salary,
      salary.id_shelter,
      salary.id_employee,
      salary.name,
      salary.cost,
      salary.date,
      salary.note,
      salary.created_by
    );

    expect(result).toEqual({
      error: true,
      message: "Failed create Salary Data",
      data: null,
    });
  });

  test("insert salary fails when name is null", async () => {
    insertSalaryData.mockRejectedValueOnce(new Error("name cannot be empty"));

    const salary = {
      id_salary: "SALARY-4e676bd0-196c-42c0-a412-e70a8beb5b4f",
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_employee: "EMPLOYEE-5d553b30-f4cc-401a-bd58-00e3e7c7b710",
      name: "",
      cost: 50000,
      date: "2025-05-23",
      note: "Gaji bulanan",
      created_by: "Raihan Daffa Rizky",
    };

    const result = await insertSalary(
      salary.id_salary,
      salary.id_shelter,
      salary.id_employee,
      salary.name,
      salary.cost,
      salary.date,
      salary.note,
      salary.created_by
    );

    expect(result).toEqual({
      error: true,
      message: "Failed create Salary Data",
      data: null,
    });
  });

  test("insert salary fails when cost is null", async () => {
    insertSalaryData.mockRejectedValueOnce(new Error("cost cannot be empty"));

    const salary = {
      id_salary: "SALARY-4e676bd0-196c-42c0-a412-e70a8beb5b4f",
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_employee: "EMPLOYEE-5d553b30-f4cc-401a-bd58-00e3e7c7b710",
      name: "Salary Month - Argenta Darmawan",
      cost: null,
      date: "2025-05-23",
      note: "Gaji bulanan",
      created_by: "Raihan Daffa Rizky",
    };

    const result = await insertSalary(
      salary.id_salary,
      salary.id_shelter,
      salary.id_employee,
      salary.name,
      salary.cost,
      salary.date,
      salary.note,
      salary.created_by
    );

    expect(result).toEqual({
      error: true,
      message: "Failed create Salary Data",
      data: null,
    });
  });

  test("insert salary fails when date is null", async () => {
    insertSalaryData.mockRejectedValueOnce(new Error("date cannot be empty"));

    const salary = {
      id_salary: "SALARY-4e676bd0-196c-42c0-a412-e70a8beb5b4f",
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_employee: "EMPLOYEE-5d553b30-f4cc-401a-bd58-00e3e7c7b710",
      name: "Salary Month - Argenta Darmawan",
      cost: 50000,
      date: "",
      note: "Gaji bulanan",
      created_by: "Raihan Daffa Rizky",
    };

    const result = await insertSalary(
      salary.id_salary,
      salary.id_shelter,
      salary.id_employee,
      salary.name,
      salary.cost,
      salary.date,
      salary.note,
      salary.created_by
    );

    expect(result).toEqual({
      error: true,
      message: "Failed create Salary Data",
      data: null,
    });
  });

  test("insert salary fails when created_by is null", async () => {
    insertSalaryData.mockRejectedValueOnce(
      new Error("created_by cannot be empty")
    );

    const salary = {
      id_salary: "SALARY-4e676bd0-196c-42c0-a412-e70a8beb5b4f",
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_employee: "EMPLOYEE-5d553b30-f4cc-401a-bd58-00e3e7c7b710",
      name: "Salary Month - Argenta Darmawan",
      cost: 50000,
      date: "2025-05-23",
      note: "Gaji bulanan",
      created_by: "",
    };

    const result = await insertSalary(
      salary.id_salary,
      salary.id_shelter,
      salary.id_employee,
      salary.name,
      salary.cost,
      salary.date,
      salary.note,
      salary.created_by
    );

    expect(result).toEqual({
      error: true,
      message: "Failed create Salary Data",
      data: null,
    });
  });

  test("insert salary success", async () => {
    insertSalaryData.mockResolvedValueOnce({
      error: false,
      message: "Employee Salary created successfully",
      data: {
        id_salary: "SALARY-4e676bd0-196c-42c0-a412-e70a8beb5b4f",
        id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
        id_employee: "EMPLOYEE-5d553b30-f4cc-401a-bd58-00e3e7c7b710",
        name: "Salary Month - Argenta Darmawan",
        cost: "50000",
        date: "2025-05-23",
        note: "Gaji bulanan",
        created_by: "Raihan Daffa Rizky",
      },
    });
    insertExpenses.mockResolvedValueOnce({
      error: false,
      message: "Expenses created successfully",
      data: {
        id_expenses: "EXPENSES-test123",
      },
    });

    const salary = {
      id_salary: "SALARY-4e676bd0-196c-42c0-a412-e70a8beb5b4f",
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_employee: "EMPLOYEE-5d553b30-f4cc-401a-bd58-00e3e7c7b710",
      name: "Salary Month - Argenta Darmawan",
      cost: "50000",
      date: "2025-05-23",
      note: "Gaji bulanan",
      created_by: "Raihan Daffa Rizky",
    };

    const result = await insertSalary(
      salary.id_salary,
      salary.id_shelter,
      salary.id_employee,
      salary.name,
      salary.cost,
      salary.date,
      salary.note,
      salary.created_by
    );

    expect(result).toEqual({
      error: false,
      message: "Salary data created successfully",
      data: {
        result1: expect.any(Object),
        result2: expect.any(Object),
      },
    });
  });
});

describe("Delete Salary Tests", () => {
  test("delete salary fails when id_shelter is empty", async () => {
    deleteSalaryData.mockRejectedValueOnce(() => {
      throw new Error("id_shelter cannot be empty");
    });

    const salary = {
      id_shelter: "",
      id_salary: "SALARY-4e676bd0-196c-42c0-a412-e70a8beb5b4f",
    };

    await expect(
      deleteSalaryData(salary.id_shelter, salary.id_salary)
    ).rejects.toThrow("id_shelter cannot be empty");
  });

  test("delete salary fails when id_salary is empty", async () => {
    deleteSalaryData.mockRejectedValueOnce(() => {
      throw new Error("id_salary cannot be empty");
    });

    const salary = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_salary: "",
    };

    await expect(
      deleteSalaryData(salary.id_shelter, salary.id_salary)
    ).rejects.toThrow("id_salary cannot be empty");
  });

  test("delete salary success", async () => {
    deleteExpensesById.mockResolvedValueOnce({
      error: false,
      message: "Expenses deleted successfully",
    });

    deleteSalaryData.mockResolvedValueOnce({
      error: false,
      message: "Salary deleted successfully",
      data: {
        id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
        id_salary: "SALARY-4e676bd0-196c-42c0-a412-e70a8beb5b4f",
      },
    });

    const salary = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_salary: "SALARY-4e676bd0-196c-42c0-a412-e70a8beb5b4f",
    };

    const result = await deleteSalary(salary.id_shelter, salary.id_salary);

    expect(result).toEqual({
      error: false,
      message: "Delete Salary data successfully",
      data: {
        error: false,
        message: "Salary deleted successfully",
        data: {
          id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
          id_salary: "SALARY-4e676bd0-196c-42c0-a412-e70a8beb5b4f",
        },
      },
    });
  });
});
