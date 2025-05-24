import axios from "axios";

jest.mock("axios");

const fetchIncomeData = async (userData) => {
  const incomeRes = await axios.get(
    `/api/income/getIncome/${userData.id_shelter}`
  );

  const incomeData = incomeRes.data;

  if (incomeData.error) {
    throw new Error(incomeData.message || "Failed to fetch income");
  }

  return incomeData;
};

test("fetch income data", () => {
  const userData = { id_shelter: 1 };
  const income = {
    data: [
      {
        id_income: "INC-001",
        id_shelter: "SHELTER-001",
        name: "Donation from Community",
        amount: 1000.0,
        date: "2025-05-15T10:00:00Z",
        type: "Donation",
        note: "Monthly support from local community",
        created_at: "2025-05-15T10:05:00Z",
        created_by: "admin1",
        update_at: "2025-05-16T09:00:00Z",
        update_by: "admin2",
      },
      {
        id_income: "INC-002",
        id_shelter: "SHELTER-002",
        name: "Adoption Fee - Bella",
        amount: 150.0,
        date: "2025-05-10T14:30:00Z",
        type: "Adoption",
        note: "Adoption of dog Bella",
        created_at: "2025-05-10T14:35:00Z",
        created_by: "admin1",
        update_at: "2025-05-10T15:00:00Z",
        update_by: "admin1",
      },
      {
        id_income: "INC-003",
        id_shelter: "SHELTER-001",
        name: "Fundraiser Event",
        amount: 2500.0,
        date: "2025-04-28T18:00:00Z",
        type: "Fundraising",
        note: "Annual pet care fundraiser event",
        created_at: "2025-04-28T18:10:00Z",
        created_by: "admin3",
        update_at: "2025-04-29T09:30:00Z",
        update_by: "admin3",
      },
    ],
  };
  const expectedResult = {
    data: [
      {
        id_income: "INC-001",
        id_shelter: "SHELTER-001",
        name: "Donation from Community",
        amount: 1000.0,
        date: "2025-05-15T10:00:00Z",
        type: "Donation",
        note: "Monthly support from local community",
        created_at: "2025-05-15T10:05:00Z",
        created_by: "admin1",
        update_at: "2025-05-16T09:00:00Z",
        update_by: "admin2",
      },
      {
        id_income: "INC-002",
        id_shelter: "SHELTER-002",
        name: "Adoption Fee - Bella",
        amount: 150.0,
        date: "2025-05-10T14:30:00Z",
        type: "Adoption",
        note: "Adoption of dog Bella",
        created_at: "2025-05-10T14:35:00Z",
        created_by: "admin1",
        update_at: "2025-05-10T15:00:00Z",
        update_by: "admin1",
      },
      {
        id_income: "INC-003",
        id_shelter: "SHELTER-001",
        name: "Fundraiser Event",
        amount: 2500.0,
        date: "2025-04-28T18:00:00Z",
        type: "Fundraising",
        note: "Annual pet care fundraiser event",
        created_at: "2025-04-28T18:10:00Z",
        created_by: "admin3",
        update_at: "2025-04-29T09:30:00Z",
        update_by: "admin3",
      },
    ],
  };
  axios.get.mockResolvedValue({ data: income });
  return fetchIncomeData(userData).then((data) => {
    expect(data).toEqual(expectedResult);
  });
});
test("fetch income data with data is null", () => {
  const userData = { id_shelter: 1 };
  const income = {
    data: [],
  };
  const expectedResult = { data: [] };
  axios.get.mockResolvedValue({ data: income });
  return fetchIncomeData(userData).then((data) => {
    expect(data).toEqual(expectedResult);
  });
});
