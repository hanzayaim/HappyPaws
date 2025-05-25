import axios from "axios";

jest.mock("axios");

const fetchMedicalData = async (userData) => {
  try {
    const medicalRes = await axios.get(
      `/api/medical/getMedicalData/${userData.id_shelter}`
    );

    const medicalDataFetch = medicalRes.data;

    if (medicalDataFetch.error) {
      throw new Error(
        medicalDataFetch.message || "Failed to fetch medical data"
      );
    }
    return medicalDataFetch;
  } catch (error) {
    throw error;
  }
};

describe("get medical", () => {
  test("fetch medical data succsessfully", async () => {
    const userData = { id_shelter: 1 };

    const medical = {
      data: [
        {
          id_medical: 1,
          meidcal_status: "Healthy",
          vaccin_status: "Vaccinated",
          medical_date_in: "2025-04-30",
          medical_date_out: "2025-04-31",
          medical_cost: 10000,
          note: "",
          created_at: "2025-05-25 14:28:42.18687",
          created_by: "admin",
          updated_at: "2025-05-26 14:28:42.18687",
          updated_by: "admin",
          id_shelter: 1,
          id_animal: 1,
        },
      ],
    };

    const expectedResult = {
      data: [
        {
          id_medical: 1,
          meidcal_status: "Healthy",
          vaccin_status: "Vaccinated",
          medical_date_in: "2025-04-30",
          medical_date_out: "2025-04-31",
          medical_cost: 10000,
          note: "",
          created_at: "2025-05-25 14:28:42.18687",
          created_by: "admin",
          updated_at: "2025-05-26 14:28:42.18687",
          updated_by: "admin",
          id_shelter: 1,
          id_animal: 1,
        },
      ],
    };

    axios.get.mockResolvedValue({ data: medical });
    return fetchMedicalData(userData).then((data) => {
      expect(data).toEqual(expectedResult);
    });
  });

  test("fetch medical data when id_shelter is null", async () => {
    const userData = { id_shelter: null };

    axios.get.mockRejectedValue(new Error("Failed to fetch medical data"));

    await expect(fetchMedicalData(userData)).rejects.toThrow(
      "Failed to fetch medical data"
    );
  });

  test("fetch equipment data with data is null", () => {
    const userData = { id_shelter: 1 };
    const medical = {
      data: [],
    };
    const expectedResult = { data: [] };

    axios.get.mockResolvedValue({ data: medical });
    return fetchMedicalData(userData).then((data) => {
      expect(data).toEqual(expectedResult);
    });
  });
});
