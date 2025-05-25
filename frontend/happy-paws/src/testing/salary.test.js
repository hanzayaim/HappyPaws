import axios from "axios";

jest.mock("axios");

const mockUserData = {
  id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
};

const mockSalaryData = [
  {
    id_salary: "SALARY-4e676bd0-196c-42c0-a412-e70a8beb5b4f",
    id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
    name: "Argenta Darmawan",
    cost: 5000000,
    date: "2025-05-20T15:49:43.603Z",
    note: "Monthly salary",
    status: "Active",
  },
];

const setSalaries = jest.fn();

const fetchSalaryData = async (userData) => {
  try {
    const response = await axios.get(
      `/api/salary/getSalary/${userData.id_shelter}`
    );

    if (response.status === 404) {
      setSalaries(null);
      return;
    }

    const SalaryData = response.data;
    if (SalaryData.error) {
      throw new Error(SalaryData.message || "Failed to fetch Salary");
    }

    setSalaries(SalaryData.data?.length ? SalaryData.data : null);
  } catch (error) {
    console.error("Error fetching salary data:", error);
  }
};

describe("Fetch Salary data", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Success cases", () => {
    test("fetches salary data successfully", async () => {
      axios.get.mockResolvedValue({
        status: 200,
        data: {
          error: false,
          data: mockSalaryData,
        },
      });

      await fetchSalaryData(mockUserData);

      expect(axios.get).toHaveBeenCalledWith(
        `/api/salary/getSalary/${mockUserData.id_shelter}`
      );
      expect(setSalaries).toHaveBeenCalledWith(mockSalaryData);
    });

    test("handles empty data response", async () => {
      axios.get.mockResolvedValue({
        status: 200,
        data: {
          error: false,
          data: [],
        },
      });

      await fetchSalaryData(mockUserData);

      expect(setSalaries).toHaveBeenCalledWith(null);
    });

    test("handles 404 response", async () => {
      axios.get.mockResolvedValue({
        status: 404,
      });

      await fetchSalaryData(mockUserData);

      expect(setSalaries).toHaveBeenCalledWith(null);
    });
  });

  describe("Error cases", () => {
    test("logs error when API returns error", async () => {
      const errorMessage = "Database error";
      axios.get.mockResolvedValue({
        data: {
          error: true,
          message: errorMessage,
        },
      });

      const consoleSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      await fetchSalaryData(mockUserData);

      expect(consoleSpy).toHaveBeenCalledWith(
        "Error fetching salary data:",
        expect.objectContaining({
          message: errorMessage,
        })
      );
      consoleSpy.mockRestore();
    });

    test("logs error on network failure", async () => {
      const error = new Error("Network Error");
      axios.get.mockRejectedValue(error);

      const consoleSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      await fetchSalaryData(mockUserData);

      expect(consoleSpy).toHaveBeenCalledWith(
        "Error fetching salary data:",
        error
      );
      consoleSpy.mockRestore();
    });

    test("logs error on server error (500)", async () => {
      const error = {
        response: {
          status: 500,
          data: { message: "Internal server error" },
        },
      };
      axios.get.mockRejectedValue(error);

      const consoleSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      await fetchSalaryData(mockUserData);

      expect(consoleSpy).toHaveBeenCalledWith(
        "Error fetching salary data:",
        error
      );
      consoleSpy.mockRestore();
    });
  });
});
