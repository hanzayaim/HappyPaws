import axios from "axios";

jest.mock("axios");

const fetchEmployeeData = async (userSession) => {
  if (
    userSession?.userType !== "shelter" ||
    !["Owner", "Administrator", "Finance", "Medical"].includes(
      userSession?.profile?.role
    )
  ) {
    throw new Error("Access level not supported for this view");
  }

  try {
    const shelterId = userSession.profile?.id_shelter;
    const response = await axios.get(
      `/api/employees/getEmployeeData/${shelterId}`
    );

    if (response.data.error) {
      if (response.data.message !== "no data found") {
        throw new Error(
          response.data.message || "Failed to fetch employee data"
        );
      }
      return [];
    }

    const employeeData = response.data.data || [];
    return sortEmployeesByStatus(employeeData);
  } catch (error) {
    if (error.response) {
      if (error.response.status !== 404) {
        if (error.response.data?.message) {
          throw new Error(error.response.data.message);
        }
        throw new Error(
          "Failed to load employee data. Please try again later."
        );
      }
      return [];
    }

    if (error.message && error.message !== "Network Error") {
      throw error;
    }

    throw new Error("Failed to load employee data. Please try again later.");
  }
};

const sortEmployeesByStatus = (employees) => {
  const statusOrder = { New: 1, Active: 2, Inactive: 3 };
  return [...employees].sort(
    (a, b) => statusOrder[a.status] - statusOrder[b.status]
  );
};

describe("Fetch Employee Data", () => {
  const mockShelterOwner = {
    userType: "shelter",
    profile: {
      role: "Owner",
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
    },
  };

  const mockEmployeeData = [
    {
      id_employee: "EMPLOYEE-5d553b30-f4cc-401a-bd58-00e3e7c7b710",
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      name: "Argenta Darmawan",
      email: "dummyargenta@gmail.com",
      role: "Finance",
      gender: "Male",
      shelter_name: "Raihan Shelter",
      phone_number: "0857646354763",
      address: "Yogyakarta, Indonesia",
      created_at: "2025-05-20T15:49:43.603Z",
      status: "Active",
      id_salary: "SALARY-4e676bd0-196c-42c0-a412-e70a8beb5b4f",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Success Fetch Data", () => {
    test("should successfully fetch employee data for Owner role with correct shelter ID", async () => {
      axios.get.mockResolvedValue({
        data: {
          error: false,
          message: "data fetched successfully",
          data: mockEmployeeData,
        },
      });

      const result = await fetchEmployeeData(mockShelterOwner);

      expect(axios.get).toHaveBeenCalledWith(
        "/api/employees/getEmployeeData/SHELTER-7612f623-6386-4016-9966-9c0ca1debacc"
      );

      expect(result).toHaveLength(1);
      expect(result[0].id_shelter).toBe(
        "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc"
      );
      expect(result[0].status).toBe("Active");
      expect(result[0].role).toBe("Finance");
    });

    test("should allow access for Owner role", async () => {
      axios.get.mockResolvedValue({
        data: {
          error: false,
          message: "data fetched successfully",
          data: mockEmployeeData,
        },
      });

      await expect(fetchEmployeeData(mockShelterOwner)).resolves.toBeDefined();
    });

    test("should handle empty data response", async () => {
      axios.get.mockResolvedValue({
        data: {
          error: false,
          message: "no data found",
          data: [],
        },
      });

      const result = await fetchEmployeeData(mockShelterOwner);
      expect(result).toEqual([]);
    });
  });

  describe("Fails Fetch Data", () => {
    test("should reject if shelter ID doesn't match", async () => {
      const wrongShelterUser = {
        userType: "shelter",
        profile: {
          role: "Owner",
          id_shelter: "SHELTER-WRONG-ID",
        },
      };

      axios.get.mockResolvedValue({
        data: {
          error: true,
          message: "Unauthorized access to shelter data",
        },
      });

      await expect(fetchEmployeeData(wrongShelterUser)).rejects.toThrow(
        "Unauthorized access to shelter data"
      );
    });

    test("should handle 404 when shelter not found", async () => {
      const error = {
        response: {
          status: 404,
        },
      };
      axios.get.mockRejectedValue(error);

      const result = await fetchEmployeeData(mockShelterOwner);
      expect(result).toEqual([]);
    });

    test("should reject non-owner access for other shelter roles", async () => {
      const mockStaffUser = {
        userType: "shelter",
        profile: {
          role: "Staff",
          id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
        },
      };

      await expect(fetchEmployeeData(mockStaffUser)).rejects.toThrow(
        "Access level not supported for this view"
      );
    });
  });
});
