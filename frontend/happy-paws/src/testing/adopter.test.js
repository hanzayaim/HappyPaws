import axios from "axios";

jest.mock("axios");

const fetchAdopterData = async (userData) => {
  try {
    const adopterRes = await axios.get(
      `/api/adopters/getAdopterData/${userData.id_shelter}`
    );
    const adopterData = adopterRes.data;

    if (adopterData.error) {
      throw new Error(adopterData.message || "Failed to fetch adopter data");
    }
    return adopterData;
  } catch (error) {
    throw error;
  }
};

test("fetch adopter data succsessfully", async () => {
  const userData = { id_shelter: 1 };

  const adopters = {
    data: [
      {
        id_adopter: 1,
        name: "Handi Wardoyo Aji",
        photo: "example.jpg",
        phone_number: "087564347586",
        gender: "Male",
        address: "Yogyakarta, Indonesia",
      },
    ],
  };

  const expectedResult = {
    data: [
      {
        id_adopter: 1,
        name: "Handi Wardoyo Aji",
        photo: "example.jpg",
        phone_number: "087564347586",
        gender: "Male",
        address: "Yogyakarta, Indonesia",
      },
    ],
  };

  axios.get.mockResolvedValue({ data: adopters });
  return fetchAdopterData(userData).then((data) => {
    expect(data).toEqual(expectedResult);
  });
});

test("fetch adopter data failed when userData.id_shelter is null", async () => {
  const userData = { id_shelter: null };

  axios.get.mockRejectedValue(new Error("Failed to fetch adopter data"));

  await expect(fetchAdopterData(userData)).rejects.toThrow(
    "Failed to fetch adopter data"
  );
});

test("fetch equipment data with data is null", () => {
  const userData = { id_shelter: 1 };
  const adopters = {
    data: [],
  };
  const expectedResult = { data: [] };

  axios.get.mockResolvedValue({ data: adopters });
  return fetchAdopterData(userData).then((data) => {
    expect(data).toEqual(expectedResult);
  });
});
