import axios from "axios";

jest.mock("axios");

const fetchFoodData = async (userData, month, year) => {
  try {
    const m = month === "all" ? null : month;
    const y = year === "all" ? null : year;

    const foodRes = await axios.post(`/api/food/getFoodDataConvert`, {
      id_shelter: userData.id_shelter,
      month: m,
      year: y,
    });

    const foodDataFetch = foodRes.data;

    if (foodDataFetch.error) {
      throw new Error(foodDataFetch.message || "Failed to fetch food data");
    }
    return foodDataFetch.data;
  } catch (error) {
    throw error;
  }
};

describe("get convert_data", () => {
  test("get food convert data", async () => {
    const userData = { id_shelter: 1 };
    const month = 5;
    const year = 2025;

    const expectedResult = [
      {
        name: "Dry Cat Food",
        type: "Donation",
        purchase_or_donation_date: "2025-04-10",
        expired_date: "2026-04-10",
        cost: 0,
        note: "Donated by local pet store",
        created_at: "2025-04-10 08:30:00",
        created_by: "admin1",
        updated_at: "2025-04-15 10:00:00",
        updated_by: "admin2",
      },
    ];

    axios.post.mockResolvedValueOnce({
      data: {
        error: false,
        data: expectedResult,
      },
    });

    const data = await fetchFoodData(userData, month, year);
    expect(data).toEqual(expectedResult);
  });

  test("get food convert data failed when id_shelter is null", async () => {
    const userData = { id_shelter: null };
    const month = 5;
    const year = 2025;

    axios.post.mockRejectedValue(new Error("Failed to fetch food data"));

    await expect(fetchFoodData(userData, month, year)).rejects.toThrow(
      "Failed to fetch food data"
    );
  });
});
