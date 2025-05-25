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

describe("Shelter API Tests", () => {
  const mockSuperuser = { userType: "superuser" };
  const mockShelterUser = { userType: "shelter" };

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
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    axios.get.mockImplementation((url) => {
      if (url === "/api/shelters/getShelterData") {
        return Promise.resolve({
          data: {
            error: false,
            message: "data fetched successfully",
            data: mockShelterData,
          },
        });
      }
      if (url.includes("/api/shelters/getShelterDataById/")) {
        const id = url.split("/").pop();
        if (!id) {
          return Promise.reject({
            response: {
              status: 400,
              data: { error: true, message: "Shelter ID is required" },
            },
          });
        }
        return Promise.resolve({
          data: { error: false, data: mockShelterData[0] },
        });
      }
      return Promise.reject(new Error("Not mocked"));
    });

    axios.post.mockImplementation((url, data) => {
      if (url === "/api/shelters/getShelterIdByEmail") {
        if (!data?.email) {
          return Promise.reject({
            response: {
              status: 400,
              data: { error: true, message: "Email parameter is required" },
            },
          });
        }
        return Promise.resolve({
          data: { error: false, data: "SHELTER-123" },
        });
      }
      if (url === "/api/shelters/getShelterPassByEmail") {
        if (!data?.email) {
          return Promise.reject({
            response: {
              status: 400,
              data: { error: true, message: "Email parameter is required" },
            },
          });
        }
        return Promise.resolve({
          data: { error: false, data: "hashedpassword123" },
        });
      }
      return Promise.reject(new Error("Not mocked"));
    });
  });

  describe("Success Fetch Data", () => {
    test("should successfully fetch and sort shelter data for superuser", async () => {
      const result = await fetchShelterData(mockSuperuser);
      expect(axios.get).toHaveBeenCalledWith("/api/shelters/getShelterData");
      expect(result).toHaveLength(2);
      expect(result[0].status).toBe("New");
      expect(result[1].status).toBe("Active");
    });

    test("should successfully get shelter ID by email", async () => {
      const mockEmail = "test@example.com";
      const response = await axios.post("/api/shelters/getShelterIdByEmail", {
        email: mockEmail,
      });
      expect(response.data).toEqual({ error: false, data: "SHELTER-123" });
    });

    test("should successfully get shelter password by email", async () => {
      const mockEmail = "test@example.com";
      const response = await axios.post("/api/shelters/getShelterPassByEmail", {
        email: mockEmail,
      });
      expect(response.data).toEqual({
        error: false,
        data: "hashedpassword123",
      });
    });

    test("should successfully get shelter data by ID", async () => {
      const mockShelterId = "SHELTER-123";
      const response = await axios.get(
        `/api/shelters/getShelterDataById/${mockShelterId}`
      );
      expect(response.data).toEqual({ error: false, data: mockShelterData[0] });
    });
  });

  describe("Fails Fetch Data", () => {
    test("should reject when user type is not superuser", async () => {
      await expect(fetchShelterData(mockShelterUser)).rejects.toThrow(
        "Access level not supported for this view"
      );
      expect(axios.get).not.toHaveBeenCalled();
    });

    test("should reject when user session is undefined", async () => {
      await expect(fetchShelterData(undefined)).rejects.toThrow(
        "Access level not supported for this view"
      );
      expect(axios.get).not.toHaveBeenCalled();
    });

    test("should reject when email parameter is missing for getShelterIdByEmail", async () => {
      await expect(
        axios.post("/api/shelters/getShelterIdByEmail", {})
      ).rejects.toMatchObject({
        response: {
          status: 400,
          data: { error: true, message: "Email parameter is required" },
        },
      });
    });

    test("should reject when email parameter is missing for getShelterPassByEmail", async () => {
      await expect(
        axios.post("/api/shelters/getShelterPassByEmail", {})
      ).rejects.toMatchObject({
        response: {
          status: 400,
          data: { error: true, message: "Email parameter is required" },
        },
      });
    });

    test("should reject when id_shelter parameter is missing for getShelterDataById", async () => {
      await expect(
        axios.get("/api/shelters/getShelterDataById/")
      ).rejects.toMatchObject({
        response: {
          status: 400,
          data: { error: true, message: "Shelter ID is required" },
        },
      });
    });

    test("should handle server errors for getShelterData", async () => {
      axios.get.mockRejectedValueOnce({
        response: {
          status: 500,
          data: { error: true, message: "failed to get data" },
        },
      });

      await expect(fetchShelterData(mockSuperuser)).rejects.toThrow(
        "Failed to load shelter data. Please try again later."
      );
    });
  });
});
