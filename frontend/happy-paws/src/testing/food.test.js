import axios from "axios";

jest.mock("axios");

const fetchFoodData = async (userData) => {
  const foodRes = await axios.get(
    `/api/food/getFoodData/${userData.id_shelter}`
  );

  const foodsData = foodRes.data;

  if (foodsData.error) {
    throw new Error(foodsData.message || "Failed to fetch foods");
  }

  return foodsData;
};

test("fetch foods data", () => {
  const userData = { id_shelter: 1 };
  const foods = {
    data: [
      {
        id_food: 1,
        name: "Dry Dog Food",
        quantity: 50, // in kg
        category: "Dog",
        type: "Dry",
        exp_date: "2025-08-01",
        cost: 120.0,
        date: "2025-05-20",
        note: "For adult dogs only",
        created_at: "2025-05-20T10:00:00Z",
        created_by: "admin1",
        updated_at: "2025-05-21T09:30:00Z",
        updated_by: "admin2",
        id_shelter: 1,
      },
      {
        id_food: 2,
        name: "Wet Cat Food",
        quantity: 30,
        category: "Cat",
        type: "Wet",
        exp_date: "2025-06-15",
        cost: 90.0,
        date: "2025-05-18",
        note: "For kittens",
        created_at: "2025-05-18T12:00:00Z",
        created_by: "admin1",
        updated_at: "2025-05-18T12:00:00Z",
        updated_by: "admin1",
        id_shelter: 2,
      },
      {
        id_food: 3,
        name: "Fish Flakes",
        quantity: 10,
        category: "Fish",
        type: "Dry",
        exp_date: "2026-01-01",
        cost: 20.5,
        date: "2025-05-10",
        note: "High protein",
        created_at: "2025-05-10T08:30:00Z",
        created_by: "admin2",
        updated_at: "2025-05-15T09:00:00Z",
        updated_by: "admin3",
        id_shelter: 1,
      },
    ],
  };
  const expectedResult = {
    data: [
      {
        id_food: 1,
        name: "Dry Dog Food",
        quantity: 50, // in kg
        category: "Dog",
        type: "Dry",
        exp_date: "2025-08-01",
        cost: 120.0,
        date: "2025-05-20",
        note: "For adult dogs only",
        created_at: "2025-05-20T10:00:00Z",
        created_by: "admin1",
        updated_at: "2025-05-21T09:30:00Z",
        updated_by: "admin2",
        id_shelter: 1,
      },
      {
        id_food: 2,
        name: "Wet Cat Food",
        quantity: 30,
        category: "Cat",
        type: "Wet",
        exp_date: "2025-06-15",
        cost: 90.0,
        date: "2025-05-18",
        note: "For kittens",
        created_at: "2025-05-18T12:00:00Z",
        created_by: "admin1",
        updated_at: "2025-05-18T12:00:00Z",
        updated_by: "admin1",
        id_shelter: 2,
      },
      {
        id_food: 3,
        name: "Fish Flakes",
        quantity: 10,
        category: "Fish",
        type: "Dry",
        exp_date: "2026-01-01",
        cost: 20.5,
        date: "2025-05-10",
        note: "High protein",
        created_at: "2025-05-10T08:30:00Z",
        created_by: "admin2",
        updated_at: "2025-05-15T09:00:00Z",
        updated_by: "admin3",
        id_shelter: 1,
      },
    ],
  };

  axios.get.mockResolvedValue({ data: foods });
  return fetchFoodData(userData).then((data) => {
    expect(data).toEqual(expectedResult);
  });
});
test("fetch foods data with data is null", () => {
  const userData = { id_shelter: 1 };
  const foods = {
    data: [],
  };
  const expectedResult = { data: [] };

  axios.get.mockResolvedValue({ data: foods });
  return fetchFoodData(userData).then((data) => {
    expect(data).toEqual(expectedResult);
  });
});
