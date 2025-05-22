const { login, profile, logout } = require("../controllers/auth_controller");
const {
  getShelterPassByEmail,
  getShelterIdByEmail,
  getShelterDataById,
} = require("../models/shelter_models");
const {
  getEmployeePassByEmail,
  getEmployeeDataById,
  getShelterIdByEmployee,
} = require("../models/employee_models");
const bcrypt = require("bcrypt");

jest.mock("../models/shelter_models");
jest.mock("../models/employee_models");
jest.mock("bcrypt");
jest.mock("../config/db", () => ({
  query: jest.fn(),
}));

describe("Auth Controller", () => {
  let mockReq, mockRes;

  beforeEach(() => {
    jest.clearAllMocks();

    mockReq = {
      body: {},
      session: {},
      query: {},
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
  });

  describe("login()", () => {
    const superuserCredentials = {
      email: "superuser@gmail.com",
      password: "H4ppyP4ws2025B1nu5Un1V3Rs1tY",
    };

    const shelter = {
      id_shelter: "SHELTER-531e2033-9a03-44b6-b5c5-5f7efa241883",
      owner_name: "Raihan Daffa Rizky",
      email: "raihandaffarizky6969@gmail.com",
      password: "hashedShelterPassword",
      shelter_name: "Raihan Shelter",
      phone_number: "082137174314",
      address: "Gunung Gempal, RT 27, RW 12, Giripeni, Wates, Kulon Progo, Y",
      created_at: "2025-05-19T16:13:52.772Z",
      status: "Active",
      role: "Owner",
    };

    const employee = {
      id_employee: "EMPLOYEE-71163bd9-85a4-4590-a885-359c5cb05cd9",
      id_shelter: "SHELTER-531e2033-9a03-44b6-b5c5-5f7efa241883",
      name: "Argenta Darmawan",
      email: "dummyargenta@gmail.com",
      password: "hashedEmployeePassword",
      role: "Finance",
      gender: "Male",
      shelter_name: "Raihan Shelter",
      phone_number: "082168687575",
      address: "Gunung Gempal, RT 27, RW 12, Giripeni, Wates, Kulon Progo, Y",
      created_at: "2025-05-20T09:29:29.809Z",
      status: "Active",
    };

    test("should return 400 if email or password is missing", async () => {
      const testCases = [
        { email: "", password: "password" },
        { email: "test@example.com", password: "" },
        {},
      ];

      for (const body of testCases) {
        mockReq.body = body;
        await login(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
          message: "Email and password are required",
        });
      }
    });

    test("should authenticate superuser with correct credentials", async () => {
      mockReq.body = superuserCredentials;

      await login(mockReq, mockRes);

      expect(mockReq.session.user).toEqual({
        email: "superuser@gmail.com",
        userType: "superuser",
        role: "Superuser",
      });

      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Login successfully.",
        userType: "superuser",
        userData: {
          email: "superuser@gmail.com",
          name: "Superuser HappyPaws",
          userType: "superuser",
          role: "Superuser",
          id_shelter: null,
          status: "Active",
        },
      });
    });

    test("should reject superuser with wrong password", async () => {
      mockReq.body = {
        email: "superuser@gmail.com",
        password: "wrongpassword",
      };

      await login(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Wrong password.",
      });
    });

    test("should authenticate shelter with correct credentials", async () => {
      getShelterPassByEmail.mockResolvedValue({
        data: { password: shelter.password },
      });
      getShelterIdByEmail.mockResolvedValue({
        data: { id_shelter: shelter.id_shelter },
      });
      getShelterDataById.mockResolvedValue({
        data: shelter,
      });
      bcrypt.compare.mockImplementation((pw, hash, callback) =>
        callback(null, true)
      );

      mockReq.body = {
        email: shelter.email,
        password: "correctPassword",
      };

      await login(mockReq, mockRes);

      expect(mockReq.session.user).toEqual({
        email: shelter.email,
        userType: "shelter",
        id_shelter: shelter.id_shelter,
      });

      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Login successfully.",
        userType: "shelter",
        userData: {
          id_shelter: shelter.id_shelter,
          owner_name: shelter.owner_name,
          email: shelter.email,
          shelter_name: shelter.shelter_name,
          phone_number: shelter.phone_number,
          address: shelter.address,
          created_at: shelter.created_at,
          status: shelter.status,
          role: shelter.role,
        },
      });
    });

    test("should reject shelter with wrong password", async () => {
      getShelterPassByEmail.mockResolvedValue({
        data: { password: shelter.password },
      });
      bcrypt.compare.mockImplementation((pw, hash, callback) =>
        callback(null, false)
      );

      mockReq.body = {
        email: shelter.email,
        password: "wrongPassword",
      };

      await login(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Wrong password.",
      });
    });

    test("should reject new shelter account", async () => {
      getShelterPassByEmail.mockResolvedValue({
        data: { password: shelter.password },
      });
      getShelterIdByEmail.mockResolvedValue({
        data: { id_shelter: shelter.id_shelter },
      });
      getShelterDataById.mockResolvedValue({
        data: { ...shelter, status: "New" },
      });
      bcrypt.compare.mockImplementation((pw, hash, callback) =>
        callback(null, true)
      );

      mockReq.body = {
        email: shelter.email,
        password: "correctPassword",
      };

      await login(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockRes.json).toHaveBeenCalledWith({
        message:
          "Your account is pending activation. Please wait for administrator approval or contact the administrator for assistance.",
        status: "New",
      });
    });

    test("should authenticate employee with correct credentials", async () => {
      getShelterPassByEmail.mockResolvedValue({ error: "Not found" });
      getEmployeePassByEmail.mockResolvedValue({
        data: { password: employee.password },
      });
      getShelterIdByEmployee.mockResolvedValue({
        data: { id_shelter: employee.id_shelter },
      });
      require("../config/db").query.mockResolvedValue({
        rows: [{ id_employee: employee.id_employee }],
      });
      getEmployeeDataById.mockResolvedValue({
        data: employee,
      });
      bcrypt.compare.mockImplementation((pw, hash, callback) =>
        callback(null, true)
      );

      mockReq.body = {
        email: employee.email,
        password: "correctPassword",
      };

      await login(mockReq, mockRes);

      expect(mockReq.session.user).toEqual({
        email: employee.email,
        userType: "employee",
        id_shelter: employee.id_shelter,
        id_employee: employee.id_employee,
      });

      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Login successfully.",
        userType: "employee",
        userData: {
          id_employee: employee.id_employee,
          id_shelter: employee.id_shelter,
          name: employee.name,
          email: employee.email,
          role: employee.role,
          gender: employee.gender,
          shelter_name: employee.shelter_name,
          phone_number: employee.phone_number,
          address: employee.address,
          created_at: employee.created_at,
          status: employee.status,
        },
      });
    });

    test("should return 401 for invalid credentials", async () => {
      getShelterPassByEmail.mockResolvedValue({ error: "Not found" });
      getEmployeePassByEmail.mockResolvedValue({ error: "Not found" });

      mockReq.body = {
        email: "nonexistent@example.com",
        password: "password",
      };

      await login(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Invalid email or password",
      });
    });

    test("should handle internal server errors", async () => {
      getShelterPassByEmail.mockRejectedValue(new Error("Database error"));

      mockReq.body = {
        email: "test@example.com",
        password: "password",
      };

      await login(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Internal server error.",
      });
    });
  });

  describe("profile()", () => {
    const superuserProfile = {
      email: "superuser@gmail.com",
      name: "Superuser HappyPaws",
      userType: "superuser",
      role: "Superuser",
      id_shelter: null,
      status: "Active",
    };

    const shelterProfile = {
      id_shelter: "SHELTER-531e2033-9a03-44b6-b5c5-5f7efa241883",
      owner_name: "Raihan Daffa Rizky",
      email: "raihandaffarizky6969@gmail.com",
      shelter_name: "Raihan Shelter",
      phone_number: "082137174314",
      address: "Gunung Gempal, RT 27, RW 12, Giripeni, Wates, Kulon Progo, Y",
      created_at: "2025-05-19T16:13:52.772Z",
      status: "Active",
      role: "Owner",
    };

    const employeeProfile = {
      id_employee: "EMPLOYEE-71163bd9-85a4-4590-a885-359c5cb05cd9",
      id_shelter: "SHELTER-531e2033-9a03-44b6-b5c5-5f7efa241883",
      name: "Argenta Darmawan",
      email: "dummyargenta@gmail.com",
      role: "Finance",
      gender: "Male",
      shelter_name: "Raihan Shelter",
      phone_number: "082168687575",
      address: "Gunung Gempal, RT 27, RW 12, Giripeni, Wates, Kulon Progo, Y",
      created_at: "2025-05-20T09:29:29.809Z",
      status: "Active",
    };

    test("should return 401 if not logged in", async () => {
      await profile(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "You are not logged in.",
      });
    });

    test("should return superuser profile", async () => {
      mockReq.session.user = {
        email: "superuser@gmail.com",
        userType: "superuser",
      };

      await profile(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Profile retrieved successfully.",
        userType: "superuser",
        profile: superuserProfile,
      });
    });

    test("should return shelter profile", async () => {
      mockReq.session.user = {
        email: shelterProfile.email,
        userType: "shelter",
        id_shelter: shelterProfile.id_shelter,
      };

      getShelterDataById.mockResolvedValue({
        data: { ...shelterProfile, password: "hashedPassword" },
      });

      await profile(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Profile retrieved successfully.",
        userType: "shelter",
        profile: shelterProfile,
      });
    });

    test("should return employee profile", async () => {
      mockReq.session.user = {
        email: employeeProfile.email,
        userType: "employee",
        id_shelter: employeeProfile.id_shelter,
        id_employee: employeeProfile.id_employee,
      };

      getEmployeeDataById.mockResolvedValue({
        data: { ...employeeProfile, password: "hashedPassword" },
      });

      await profile(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Profile retrieved successfully.",
        userType: "employee",
        profile: employeeProfile,
      });
    });

    test("should handle profile not found", async () => {
      mockReq.session.user = {
        email: shelterProfile.email,
        userType: "shelter",
        id_shelter: shelterProfile.id_shelter,
      };

      getShelterDataById.mockResolvedValue({
        error: "Not found",
      });

      await profile(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Profile not found.",
      });
    });

    test("should handle internal server errors", async () => {
      mockReq.session.user = {
        email: shelterProfile.email,
        userType: "shelter",
        id_shelter: shelterProfile.id_shelter,
      };

      getShelterDataById.mockRejectedValue(new Error("Database error"));

      await profile(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Internal server error.",
      });
    });
  });

  describe("logout()", () => {
    test("should logout successfully", async () => {
      mockReq.session.destroy = jest.fn((callback) => callback(null));

      await logout(mockReq, mockRes);

      expect(mockReq.session.destroy).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Logout successfully.",
      });
    });

    test("should handle logout errors", async () => {
      mockReq.session.destroy = jest.fn((callback) =>
        callback(new Error("Logout failed"))
      );

      await logout(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Failed to logout.",
      });
    });
  });
});
