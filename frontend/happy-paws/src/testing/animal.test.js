import axios from "axios";

jest.mock("axios");

const fetchAnimalData = async (userData, determineAnimalStatus) => {
  const [animalRes, medicalRes] = await Promise.allSettled([
    axios.get(`/api/animals/getAnimalData/${userData.id_shelter}`),
    axios.get(`/api/medical/getMedicalData/${userData.id_shelter}`),
  ]);

  if (animalRes.status !== "fulfilled") {
    throw new Error("Failed to fetch animal data");
  }

  const animalData = animalRes.value.data;
  const medicalData =
    medicalRes.status === "fulfilled" ? medicalRes.value.data : { data: [] };

  const enriched = (animalData.data || []).map((animal) => {
    const medical = (medicalData.data || []).find(
      (m) => m.id_animal === animal.id_animal
    );

    const animal_status = determineAnimalStatus(
      medical?.medical_status,
      medical?.vaccin_status,
      animal.id_adopter
    );

    return {
      ...animal,
      animal_status,
    };
  });

  return enriched;
};

test("fetch animal data succsessfully", () => {
  const userData = { id_shelter: 1 };

  const animals = {
    data: [
      {
        id_animal: 1,
        name: "Doggo",
        id_adopter: null,
        gender: "Male",
        type: "Golden Retriever",
        age: "3 Tahun",
        date_in: "01/01/2025",
        rescue_location: "Taman",
      },
      {
        id_animal: 2,
        name: "Catto",
        id_adopter: null,
        gender: "Female",
        type: "Persian",
        age: "2 Tahun",
        date_in: "15/02/2025",
        rescue_location: "Rumah kosong",
      },
      {
        id_animal: 3,
        name: "Luna",
        id_adopter: 2,
        gender: "Female",
        type: "Siamese",
        age: "1 Tahun",
        date_in: "20/03/2025",
        rescue_location: "Pasar",
      },
    ],
  };

  const medicals = {
    data: [
      { id_animal: 1, medical_status: "Healthy", vaccin_status: "Vaccinated" },
      { id_animal: 2, medical_status: "Sick", vaccin_status: "Not Vaccinated" },
      { id_animal: 3, medical_status: "Healthy", vaccin_status: "Vaccinated" },
    ],
  };

  const expectedResult = [
    {
      id_animal: 1,
      name: "Doggo",
      id_adopter: null,
      gender: "Male",
      type: "Golden Retriever",
      age: "3 Tahun",
      date_in: "01/01/2025",
      rescue_location: "Taman",
      animal_status: "Available",
    },
    {
      id_animal: 2,
      name: "Catto",
      id_adopter: null,
      gender: "Female",
      type: "Persian",
      age: "2 Tahun",
      date_in: "15/02/2025",
      rescue_location: "Rumah kosong",
      animal_status: "Not Available",
    },
    {
      id_animal: 3,
      name: "Luna",
      id_adopter: 2,
      gender: "Female",
      type: "Siamese",
      age: "1 Tahun",
      date_in: "20/03/2025",
      rescue_location: "Pasar",
      animal_status: "Adopted",
    },
  ];

  axios.get.mockImplementation((url) => {
    if (url.includes("/api/animals")) return Promise.resolve({ data: animals });
    if (url.includes("/api/medical"))
      return Promise.resolve({ data: medicals });
  });

  const determineAnimalStatus = (med, vac, adopter) => {
    if (adopter) return "Adopted";
    if (med === "Healthy" && vac === "Vaccinated") return "Available";
    return "Not Available";
  };

  return fetchAnimalData(userData, determineAnimalStatus).then((data) => {
    expect(data).toEqual(expectedResult);
  });
});

test("fetch animal data fails when userData.id_shelter is null", async () => {
  const userData = { id_shelter: null };

  const determineAnimalStatus = (med, vac, adopter) => {
    if (adopter) return "Adopted";
    if (med === "Healthy" && vac === "Vaccinated") return "Available";
    return "Not Available";
  };

  axios.get.mockImplementation((url) => {
    if (url.includes("null")) {
      return Promise.reject(new Error("Failed to fetch animal data"));
    }
    return Promise.resolve({ data: { data: [] } });
  });

  await expect(
    fetchAnimalData(userData, determineAnimalStatus)
  ).rejects.toThrow("Failed to fetch animal data");
});
