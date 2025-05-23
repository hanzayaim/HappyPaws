import axios from "axios";

jest.mock("axios");

const fetchShelterData = async (userSession) => {
  if (userSession?.userType !== "superuser") {
    throw new Error("Access level not supported for this view");
  }

  try {
    const response = await axios.get("/api/shelters/getShelterData");

    if (response.data.error) {
      if (response.data.message !== "no data found") {
        throw new Error(
          response.data.message || "Failed to fetch shelter data"
        );
      }
      return [];
    }

    const shelterData = response.data.data || [];
    return sortSheltersByStatus(shelterData);
  } catch (error) {
    if (!error.response || error.response.status !== 404) {
      throw new Error("Failed to load shelter data. Please try again later.");
    }
    return [];
  }
};

const sortSheltersByStatus = (shelters) => {
  const statusOrder = { New: 1, Active: 2, Inactive: 3 };
  return [...shelters].sort(
    (a, b) => statusOrder[a.status] - statusOrder[b.status]
  );
};

describe("fetchShelterData", () => {
  const mockSuperuser = { userType: "superuser" };

  const mockShelterData = [
    {
      id_shelter: "SHELTER-b2dd640d-9857-4ace-a4ba-c714f80b201d",
      owner_name: "Sebastianus Dimas Anjangasmara",
      email: "sebastianus248@gmail.com",
      shelter_name: "Shellter DMS",
      phone_number: "08236475883947",
      address: "Jln bandung",
      status: "Active",
      role: "Owner",
    },
    {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      owner_name: "Raihan Daffa Rizky",
      email: "raihandaffarizky6969@gmail.com",
      shelter_name: "Raihan Shelter",
      phone_number: "082137174314",
      address: "Yogyakarta, Indonesia",
      status: "New",
      role: "Owner",
    },
    {
      id_shelter: "SHELTER-3333-4444-5555-666666666666",
      owner_name: "John Doe",
      email: "john@example.com",
      shelter_name: "Inactive Shelter",
      phone_number: "081234567890",
      address: "Jakarta, Indonesia",
      status: "Inactive",
      role: "Owner",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Success Fetch Data", () => {
    test("should successfully fetch and sort shelter data", async () => {
      axios.get.mockResolvedValue({
        data: {
          error: false,
          message: "data fetched successfully",
          data: mockShelterData,
        },
      });

      const result = await fetchShelterData(mockSuperuser);

      expect(axios.get).toHaveBeenCalledWith("/api/shelters/getShelterData");
      expect(result).toHaveLength(3);
      expect(result[0].status).toBe("New");
      expect(result[1].status).toBe("Active");
      expect(result[2].status).toBe("Inactive");
    });

    test("should handle empty data response", async () => {
      axios.get.mockResolvedValue({
        data: {
          error: false,
          message: "no data found",
          data: [],
        },
      });

      const result = await fetchShelterData(mockSuperuser);
      expect(result).toEqual([]);
    });

    test("should handle 404 errors gracefully", async () => {
      const error = {
        response: {
          status: 404,
        },
      };
      axios.get.mockRejectedValue(error);

      const result = await fetchShelterData(mockSuperuser);
      expect(result).toEqual([]);
    });

    test("should handle 'no data found' message", async () => {
      axios.get.mockResolvedValue({
        data: {
          error: true,
          message: "no data found",
        },
      });

      const result = await fetchShelterData(mockSuperuser);
      expect(result).toEqual([]);
    });
  });

  describe("Fails Fetch Data", () => {
    test("should reject non-superuser access", async () => {
      const mockShelterUser = { userType: "shelter" };

      await expect(fetchShelterData(mockShelterUser)).rejects.toThrow(
        "Access level not supported for this view"
      );
      expect(axios.get).not.toHaveBeenCalled();
    });

    test("should handle network errors", async () => {
      axios.get.mockRejectedValue(new Error("Network Error"));

      await expect(fetchShelterData(mockSuperuser)).rejects.toThrow(
        "Failed to load shelter data. Please try again later."
      );
    });

    test("should handle server errors (500)", async () => {
      const error = {
        response: {
          status: 500,
          data: { message: "Internal Server Error" },
        },
      };
      axios.get.mockRejectedValue(error);

      await expect(fetchShelterData(mockSuperuser)).rejects.toThrow(
        "Failed to load shelter data. Please try again later."
      );
    });

    test("should handle error response with custom error message", async () => {
      axios.get.mockResolvedValue({
        data: {
          error: true,
          message: "Database connection failed",
        },
      });

      await expect(fetchShelterData(mockSuperuser)).rejects.toThrow(
        "Failed to load shelter data. Please try again later."
      );
    });

    test("should reject undefined user", async () => {
      await expect(fetchShelterData(undefined)).rejects.toThrow(
        "Access level not supported for this view"
      );
      expect(axios.get).not.toHaveBeenCalled();
    });
  });
});
