const {
  insertEmployeeData,
  updateEmployeeStatus,
  deleteEmployeeData,
} = require("../models/employee_models");
const { insertNewEmployee } = require("../controllers/employee_controller");

jest.mock("../models/employee_models.js", () => ({
  insertEmployeeData: jest.fn(),
  updateEmployeeStatus: jest.fn(),
  deleteEmployeeData: jest.fn(),
}));

describe("Insert Employee Tests", () => {
  test("insert employee fails when id_shelter is null", async () => {
    insertEmployeeData.mockImplementation(() => {
      throw new Error("id_shelter cannot be empty");
    });

    const employee = {
      id_shelter: "",
      id_employee: "EMPLOYEE-5d553b30-f4cc-401a-bd58-00e3e7c7b710",
      name: "Argenta Darmawan",
      email: "raihandaffarizky6969@gmail.com",
      password: "bima123",
      role: "Finance",
      gender: "Male",
      shelter_name: "Bima Shelter",
      phone_number: "086574364532",
      address: "Jl. Kaliurang nomor 1, Yogyakarta, Indonesia",
      status: "New",
    };

    await expect(
      insertNewEmployee(
        employee.id_shelter,
        employee.owner_name,
        employee.email,
        employee.password,
        employee.shelter_name,
        employee.phone_number,
        employee.address,
        employee.status
      )
    ).rejects.toThrow("id_shelter cannot be empty");
  });

  test("insert employee fails when name is null", async () => {
    insertEmployeeData.mockImplementation(() => {
      throw new Error("name cannot be empty");
    });

    const employee = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_employee: "EMPLOYEE-5d553b30-f4cc-401a-bd58-00e3e7c7b710",
      name: "",
      email: "raihandaffarizky6969@gmail.com",
      password: "bima123",
      role: "Finance",
      gender: "Male",
      shelter_name: "Bima Shelter",
      phone_number: "086574364532",
      address: "Jl. Kaliurang nomor 1, Yogyakarta, Indonesia",
      status: "New",
    };

    await expect(
      insertNewEmployee(
        employee.id_shelter,
        employee.owner_name,
        employee.email,
        employee.password,
        employee.shelter_name,
        employee.phone_number,
        employee.address,
        employee.status
      )
    ).rejects.toThrow("name cannot be empty");
  });

  test("insert employee fails when email is null", async () => {
    insertEmployeeData.mockImplementation(() => {
      throw new Error("email cannot be empty");
    });

    const employee = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_employee: "EMPLOYEE-5d553b30-f4cc-401a-bd58-00e3e7c7b710",
      name: "Argenta Darmawan",
      email: "",
      password: "bima123",
      role: "Finance",
      gender: "Male",
      shelter_name: "Bima Shelter",
      phone_number: "086574364532",
      address: "Jl. Kaliurang nomor 1, Yogyakarta, Indonesia",
      status: "New",
    };

    await expect(
      insertNewEmployee(
        employee.id_shelter,
        employee.owner_name,
        employee.email,
        employee.password,
        employee.shelter_name,
        employee.phone_number,
        employee.address,
        employee.status
      )
    ).rejects.toThrow("email cannot be empty");
  });

  test("insert employee fails when password is null", async () => {
    insertEmployeeData.mockImplementation(() => {
      throw new Error("password cannot be empty");
    });

    const employee = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_employee: "EMPLOYEE-5d553b30-f4cc-401a-bd58-00e3e7c7b710",
      name: "Argenta Darmawan",
      email: "raihandaffarizky6969@gmail.com",
      password: "",
      role: "Finance",
      gender: "Male",
      shelter_name: "Bima Shelter",
      phone_number: "086574364532",
      address: "Jl. Kaliurang nomor 1, Yogyakarta, Indonesia",
      status: "New",
    };

    await expect(
      insertNewEmployee(
        employee.id_shelter,
        employee.owner_name,
        employee.email,
        employee.password,
        employee.shelter_name,
        employee.phone_number,
        employee.address,
        employee.status
      )
    ).rejects.toThrow("password cannot be empty");
  });

  test("insert employee fails when role is null", async () => {
    insertEmployeeData.mockImplementation(() => {
      throw new Error("role cannot be empty");
    });

    const employee = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_employee: "EMPLOYEE-5d553b30-f4cc-401a-bd58-00e3e7c7b710",
      name: "Argenta Darmawan",
      email: "raihandaffarizky6969@gmail.com",
      password: "bima123",
      role: "",
      gender: "Male",
      shelter_name: "Bima Shelter",
      phone_number: "086574364532",
      address: "Jl. Kaliurang nomor 1, Yogyakarta, Indonesia",
      status: "New",
    };

    await expect(
      insertNewEmployee(
        employee.id_shelter,
        employee.owner_name,
        employee.email,
        employee.password,
        employee.shelter_name,
        employee.phone_number,
        employee.address,
        employee.status
      )
    ).rejects.toThrow("role cannot be empty");
  });

  test("insert employee fails when gender is null", async () => {
    insertEmployeeData.mockImplementation(() => {
      throw new Error("gender cannot be empty");
    });

    const employee = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_employee: "EMPLOYEE-5d553b30-f4cc-401a-bd58-00e3e7c7b710",
      name: "Argenta Darmawan",
      email: "raihandaffarizky6969@gmail.com",
      password: "bima123",
      role: "Finance",
      gender: "",
      shelter_name: "Bima Shelter",
      phone_number: "086574364532",
      address: "Jl. Kaliurang nomor 1, Yogyakarta, Indonesia",
      status: "New",
    };

    await expect(
      insertNewEmployee(
        employee.id_shelter,
        employee.owner_name,
        employee.email,
        employee.password,
        employee.shelter_name,
        employee.phone_number,
        employee.address,
        employee.status
      )
    ).rejects.toThrow("gender cannot be empty");
  });

  test("insert employee fails when shelter_name is null", async () => {
    insertEmployeeData.mockImplementation(() => {
      throw new Error("shelter_name cannot be empty");
    });

    const employee = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_employee: "EMPLOYEE-5d553b30-f4cc-401a-bd58-00e3e7c7b710",
      name: "Argenta Darmawan",
      email: "raihandaffarizky6969@gmail.com",
      password: "bima123",
      role: "Finance",
      gender: "Male",
      shelter_name: "",
      phone_number: "086574364532",
      address: "Jl. Kaliurang nomor 1, Yogyakarta, Indonesia",
      status: "New",
    };

    await expect(
      insertNewEmployee(
        employee.id_shelter,
        employee.owner_name,
        employee.email,
        employee.password,
        employee.shelter_name,
        employee.phone_number,
        employee.address,
        employee.status
      )
    ).rejects.toThrow("shelter_name cannot be empty");
  });

  test("insert employee fails when phone_number is null", async () => {
    insertEmployeeData.mockImplementation(() => {
      throw new Error("phone_number cannot be empty");
    });

    const employee = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_employee: "EMPLOYEE-5d553b30-f4cc-401a-bd58-00e3e7c7b710",
      name: "Argenta Darmawan",
      email: "raihandaffarizky6969@gmail.com",
      password: "bima123",
      role: "Finance",
      gender: "Male",
      shelter_name: "Bima Shelter",
      phone_number: "",
      address: "Jl. Kaliurang nomor 1, Yogyakarta, Indonesia",
      status: "New",
    };

    await expect(
      insertNewEmployee(
        employee.id_shelter,
        employee.owner_name,
        employee.email,
        employee.password,
        employee.shelter_name,
        employee.phone_number,
        employee.address,
        employee.status
      )
    ).rejects.toThrow("phone_number cannot be empty");
  });

  test("insert employee fails when address is null", async () => {
    insertEmployeeData.mockImplementation(() => {
      throw new Error("address cannot be empty");
    });

    const employee = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_employee: "EMPLOYEE-5d553b30-f4cc-401a-bd58-00e3e7c7b710",
      name: "Argenta Darmawan",
      email: "raihandaffarizky6969@gmail.com",
      password: "bima123",
      role: "Finance",
      gender: "Male",
      shelter_name: "Bima Shelter",
      phone_number: "086574364532",
      address: "",
      status: "New",
    };

    await expect(
      insertNewEmployee(
        employee.id_shelter,
        employee.owner_name,
        employee.email,
        employee.password,
        employee.shelter_name,
        employee.phone_number,
        employee.address,
        employee.status
      )
    ).rejects.toThrow("address cannot be empty");
  });

  test("insert employee fails when status is null", async () => {
    insertEmployeeData.mockImplementation(() => {
      throw new Error("status cannot be empty");
    });

    const employee = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_employee: "EMPLOYEE-5d553b30-f4cc-401a-bd58-00e3e7c7b710",
      name: "Argenta Darmawan",
      email: "raihandaffarizky6969@gmail.com",
      password: "bima123",
      role: "Finance",
      gender: "Male",
      shelter_name: "Bima Shelter",
      phone_number: "086574364532",
      address: "Jl. Kaliurang nomor 1, Yogyakarta, Indonesia",
      status: "New",
    };

    await expect(
      insertNewEmployee(
        employee.id_shelter,
        employee.owner_name,
        employee.email,
        employee.password,
        employee.shelter_name,
        employee.phone_number,
        employee.address,
        employee.status
      )
    ).rejects.toThrow("status cannot be empty");
  });

  test("insert employee fails when email is exists", async () => {
    insertEmployeeData.mockImplementation(() => {
      throw new Error("email already exists");
    });

    const employee = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_employee: "EMPLOYEE-5d553b30-f4cc-401a-bd58-00e3e7c7b710",
      name: "Argenta Darmawan",
      email: "dummyargenta@gmail.com",
      password: "bima123",
      role: "Finance",
      gender: "Male",
      shelter_name: "Bima Shelter",
      phone_number: "086574364532",
      address: "Jl. Kaliurang nomor 1, Yogyakarta, Indonesia",
      status: "New",
    };

    await expect(
      insertNewEmployee(
        employee.id_shelter,
        employee.owner_name,
        employee.email,
        employee.password,
        employee.shelter_name,
        employee.phone_number,
        employee.address,
        employee.status
      )
    ).rejects.toThrow("email already exists");
  });

  test("insert employee fails when phone_number is exists", async () => {
    insertEmployeeData.mockImplementation(() => {
      throw new Error("phone_number already exists");
    });

    const employee = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_employee: "EMPLOYEE-5d553b30-f4cc-401a-bd58-00e3e7c7b710",
      name: "Argenta Darmawan",
      email: "raihandaffarizky6969@gmail.com",
      password: "bima123",
      role: "Finance",
      gender: "Male",
      shelter_name: "Bima Shelter",
      phone_number: "0857646354763",
      address: "Jl. Kaliurang nomor 1, Yogyakarta, Indonesia",
      status: "New",
    };

    await expect(
      insertNewEmployee(
        employee.id_shelter,
        employee.owner_name,
        employee.email,
        employee.password,
        employee.shelter_name,
        employee.phone_number,
        employee.address,
        employee.status
      )
    ).rejects.toThrow("phone_number already exists");
  });

  test("insert employee success", async () => {
    insertEmployeeData.mockResolvedValueOnce({ success: true });

    const employee = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_employee: "EMPLOYEE-5d553b30-f4cc-401a-bd58-00e3e7c7b710",
      name: "Argenta Darmawan",
      email: "raihandaffarizky6969@gmail.com",
      password: "bima123",
      role: "Finance",
      gender: "Male",
      shelter_name: "Bima Shelter",
      phone_number: "0857646354763",
      address: "Jl. Kaliurang nomor 1, Yogyakarta, Indonesia",
      status: "New",
    };

    const result = await insertNewEmployee(
      employee.id_shelter,
      employee.owner_name,
      employee.email,
      employee.password,
      employee.shelter_name,
      employee.phone_number,
      employee.address,
      employee.status
    );

    expect(result).toEqual({ success: true });
  });
});

describe("Update Employee Tests", () => {
  test("update employee fails when status is empty", async () => {
    updateEmployeeStatus.mockReset();

    updateEmployeeStatus.mockImplementation(
      (status, id_shelter, id_employee) => {
        if (!status || status === "") {
          return Promise.reject(new Error("status cannot be empty"));
        }
      }
    );

    const employee = {
      status: "",
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_employee: "EMPLOYEE-5d553b30-f4cc-401a-bd58-00e3e7c7b710",
    };

    await expect(
      updateEmployeeStatus(
        employee.status,
        employee.id_shelter,
        employee.id_employee
      )
    ).rejects.toThrow("status cannot be empty");
  });

  test("update employee fails when id_shelter is empty", async () => {
    updateEmployeeStatus.mockReset();

    updateEmployeeStatus.mockImplementation(
      (status, id_shelter, id_employee) => {
        if (!id_shelter || id_shelter === "") {
          return Promise.reject(new Error("id_shelter cannot be empty"));
        }
      }
    );

    const employee = {
      status: "New",
      id_shelter: "",
      id_employee: "EMPLOYEE-5d553b30-f4cc-401a-bd58-00e3e7c7b710",
    };

    await expect(
      updateEmployeeStatus(
        employee.status,
        employee.id_shelter,
        employee.id_employee
      )
    ).rejects.toThrow("id_shelter cannot be empty");
  });

  test("update employee fails when id_employee is empty", async () => {
    updateEmployeeStatus.mockReset();

    updateEmployeeStatus.mockImplementation(
      (status, id_shelter, id_employee) => {
        if (!id_employee || id_employee === "") {
          return Promise.reject(new Error("id_employee cannot be empty"));
        }
      }
    );

    const employee = {
      status: "New",
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_employee: "",
    };

    await expect(
      updateEmployeeStatus(
        employee.status,
        employee.id_shelter,
        employee.id_employee
      )
    ).rejects.toThrow("id_employee cannot be empty");
  });

  test("update employee status success", async () => {
    updateEmployeeStatus.mockResolvedValueOnce({ success: true });

    const employee = {
      status: "Active",
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
    };

    const result = await updateEmployeeStatus(
      employee.status,
      employee.id_shelter
    );

    expect(result).toEqual({ success: true });
  });
});

describe("Delete Employee Tests", () => {
  test("delete employee fails when id_shelter is empty", async () => {
    deleteEmployeeData.mockRejectedValueOnce(() => {
      throw new Error("id_shelter cannot be empty");
    });

    const employee = {
      id_shelter: "",
      id_employee: "EMPLOYEE-5d553b30-f4cc-401a-bd58-00e3e7c7b710",
    };

    await expect(
      deleteEmployeeData(employee.id_shelter, employee.id_employee)
    ).rejects.toThrow("id_shelter cannot be empty");
  });

  test("delete employee fails when id_employee is empty", async () => {
    deleteEmployeeData.mockRejectedValueOnce(() => {
      throw new Error("id_employee cannot be empty");
    });

    const employee = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_employee: "",
    };

    await expect(
      deleteEmployeeData(employee.id_shelter, employee.id_employee)
    ).rejects.toThrow("id_employee cannot be empty");
  });

  test("delete employee success", async () => {
    deleteEmployeeData.mockResolvedValueOnce({ success: true });

    const employee = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_employee: "EMPLOYEE-5d553b30-f4cc-401a-bd58-00e3e7c7b710",
    };

    const result = await deleteEmployeeData(
      employee.id_shelter,
      employee.id_employee
    );

    expect(result).toEqual({ success: true });
  });
});
