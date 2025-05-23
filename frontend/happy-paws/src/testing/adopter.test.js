import axios from "axios";

jest.mock("axios");

export const fetchAdopterData = async ({ userData }) => {
  try {
    const adopterRes = await axios.get(
      `/api/adopters/getAdopterData/${userData.id_shelter}`
    );
    const adopterData = adopterRes.data;

    if (adopterData.error) {
      throw new Error(adopterData.message || "Failed to fetch adopter data");
    }
    return adopterData.data || [];
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

  axios.get.mockImplementation((url) => {
    if (url === "/api/adopters/getAdopterData/1") {
      return Promise.resolve({ data: adopters });
    } else {
      return Promise.reject(new Error("Invalid URL"));
    }
  });

  const result = await fetchAdopterData({ userData });
  expect(result).toEqual(adopters.data);
});

test("fetch adopter data failed when userData.id_shelter is null", async () => {
  const userData = { id_shelter: null };

  axios.get.mockImplementation((url) => {
    if (url.includes("null")) {
      return Promise.reject(new Error("Failed to fetch adopter data"));
    }
    return Promise.resolve({ data: { data: [] } });
  });

  await expect(fetchAdopterData({ userData })).rejects.toThrow(
    "Failed to fetch adopter data"
  );
});
