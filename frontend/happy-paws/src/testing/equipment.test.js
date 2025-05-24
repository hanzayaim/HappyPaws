import axios from "axios";

jest.mock("axios");

const fetchEquipmentData = async (userData) => {
  const equipmentRes = await axios.get(
    `/api/equipment/getEquipmentData/${userData.id_shelter}`
  );

  const equipmentData = equipmentRes.data;

  if (equipmentData.error) {
    throw new Error(equipmentData.message || "Failed to fetch foods");
  }

  return equipmentData;
};

test("fetch equipment data", () => {
  const userData = { id_shelter: 1 };
  const equipments = {
    data: [
      {
        id_equipment: "EQ-001",
        name: "Stainless Steel Kennel",
        type: "Cage",
        date: "2025-05-10T09:00:00Z",
        cost: 450.0,
        note: "Large size for adult dogs",
        created_at: "2025-05-10T09:15:00Z",
        created_by: "admin1",
        updated_at: "2025-05-12T11:00:00Z",
        updated_by: "admin2",
        id_shelter: "SHELTER-001",
      },
      {
        id_equipment: "EQ-002",
        name: "Portable Pet Dryer",
        type: "Grooming",
        date: "2025-04-20T14:30:00Z",
        cost: 120.0,
        note: "Used for post-bath drying",
        created_at: "2025-04-20T14:35:00Z",
        created_by: "admin1",
        updated_at: "2025-04-21T10:00:00Z",
        updated_by: "admin1",
        id_shelter: "SHELTER-002",
      },
      {
        id_equipment: "EQ-003",
        name: "Animal Scale",
        type: "Medical",
        date: "2025-03-15T10:00:00Z",
        cost: 300.0,
        note: "Digital scale for small to medium pets",
        created_at: "2025-03-15T10:05:00Z",
        created_by: "admin2",
        updated_at: "2025-03-20T13:00:00Z",
        updated_by: "admin3",
        id_shelter: "SHELTER-001",
      },
    ],
  };
  const expectedResult = {
    data: [
      {
        id_equipment: "EQ-001",
        name: "Stainless Steel Kennel",
        type: "Cage",
        date: "2025-05-10T09:00:00Z",
        cost: 450.0,
        note: "Large size for adult dogs",
        created_at: "2025-05-10T09:15:00Z",
        created_by: "admin1",
        updated_at: "2025-05-12T11:00:00Z",
        updated_by: "admin2",
        id_shelter: "SHELTER-001",
      },
      {
        id_equipment: "EQ-002",
        name: "Portable Pet Dryer",
        type: "Grooming",
        date: "2025-04-20T14:30:00Z",
        cost: 120.0,
        note: "Used for post-bath drying",
        created_at: "2025-04-20T14:35:00Z",
        created_by: "admin1",
        updated_at: "2025-04-21T10:00:00Z",
        updated_by: "admin1",
        id_shelter: "SHELTER-002",
      },
      {
        id_equipment: "EQ-003",
        name: "Animal Scale",
        type: "Medical",
        date: "2025-03-15T10:00:00Z",
        cost: 300.0,
        note: "Digital scale for small to medium pets",
        created_at: "2025-03-15T10:05:00Z",
        created_by: "admin2",
        updated_at: "2025-03-20T13:00:00Z",
        updated_by: "admin3",
        id_shelter: "SHELTER-001",
      },
    ],
  };

  axios.get.mockResolvedValue({ data: equipments });
  return fetchEquipmentData(userData).then((data) => {
    expect(data).toEqual(expectedResult);
  });
});
test("fetch equipment data with data is null", () => {
  const userData = { id_shelter: 1 };
  const equipments = {
    data: [],
  };
  const expectedResult = { data: [] };

  axios.get.mockResolvedValue({ data: equipments });
  return fetchEquipmentData(userData).then((data) => {
    expect(data).toEqual(expectedResult);
  });
});
