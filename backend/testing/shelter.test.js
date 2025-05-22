const {
  insertShelterData,
  updateShelterStatus,
  deleteShelterData,
} = require("../models/shelter_models");
const { insertNewShelter } = require("../controllers/shelter_controller");

jest.mock("../models/shelter_models.js", () => ({
  insertShelterData: jest.fn(),
  updateShelterStatus: jest.fn(),
  deleteShelterData: jest.fn(),
}));

describe("Insert Shelter Tests", () => {
  test("insert shelter fails when owner_name is null", async () => {
    insertShelterData.mockImplementation(() => {
      throw new Error("owner_name cannot be empty");
    });

    const shelter = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      owner_name: "",
      email: "raihandaffarizky6969@gmail.com",
      password: "bima123",
      shelter_name: "Bima Shelter",
      phone_number: "086574364532",
      address: "Jl. Kaliurang nomor 1, Yogyakarta, Indonesia",
      status: "New",
    };

    await expect(
      insertNewShelter(
        shelter.id_shelter,
        shelter.owner_name,
        shelter.email,
        shelter.password,
        shelter.shelter_name,
        shelter.phone_number,
        shelter.address,
        shelter.status
      )
    ).rejects.toThrow("owner_name cannot be empty");
  });

  test("insert shelter fails when email is null", async () => {
    insertShelterData.mockImplementation(() => {
      throw new Error("email cannot be empty");
    });

    const shelter = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      owner_name: "Bima Sakti",
      email: "",
      password: "bima123",
      shelter_name: "Bima Shelter",
      phone_number: "086574364532",
      address: "Jl. Kaliurang nomor 1, Yogyakarta, Indonesia",
      status: "New",
    };

    await expect(
      insertNewShelter(
        shelter.id_shelter,
        shelter.owner_name,
        shelter.email,
        shelter.password,
        shelter.shelter_name,
        shelter.phone_number,
        shelter.address,
        shelter.status
      )
    ).rejects.toThrow("email cannot be empty");
  });

  test("insert shelter fails when password is null", async () => {
    insertShelterData.mockImplementation(() => {
      throw new Error("password cannot be empty");
    });

    const shelter = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      owner_name: "Bima Sakti",
      email: "raihandaffarizky6969@gmail.com",
      password: "",
      shelter_name: "Bima Shelter",
      phone_number: "086574364532",
      address: "Jl. Kaliurang nomor 1, Yogyakarta, Indonesia",
      status: "New",
    };

    await expect(
      insertNewShelter(
        shelter.id_shelter,
        shelter.owner_name,
        shelter.email,
        shelter.password,
        shelter.shelter_name,
        shelter.phone_number,
        shelter.address,
        shelter.status
      )
    ).rejects.toThrow("password cannot be empty");
  });

  test("insert shelter fails when shelter_name is null", async () => {
    insertShelterData.mockImplementation(() => {
      throw new Error("shelter_name cannot be empty");
    });

    const shelter = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      owner_name: "Bima Sakti",
      email: "raihandaffarizky6969@gmail.com",
      password: "bima123",
      shelter_name: "",
      phone_number: "086574364532",
      address: "Jl. Kaliurang nomor 1, Yogyakarta, Indonesia",
      status: "New",
    };

    await expect(
      insertNewShelter(
        shelter.id_shelter,
        shelter.owner_name,
        shelter.email,
        shelter.password,
        shelter.shelter_name,
        shelter.phone_number,
        shelter.address,
        shelter.status
      )
    ).rejects.toThrow("shelter_name cannot be empty");
  });

  test("insert shelter fails when phone_number is null", async () => {
    insertShelterData.mockImplementation(() => {
      throw new Error("phone_number cannot be empty");
    });

    const shelter = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      owner_name: "Bima Sakti",
      email: "raihandaffarizky6969@gmail.com",
      password: "bima123",
      shelter_name: "Bima Shelter",
      phone_number: "",
      address: "Jl. Kaliurang nomor 1, Yogyakarta, Indonesia",
      status: "New",
    };

    await expect(
      insertNewShelter(
        shelter.id_shelter,
        shelter.owner_name,
        shelter.email,
        shelter.password,
        shelter.shelter_name,
        shelter.phone_number,
        shelter.address,
        shelter.status
      )
    ).rejects.toThrow("phone_number cannot be empty");
  });

  test("insert shelter fails when address is null", async () => {
    insertShelterData.mockImplementation(() => {
      throw new Error("address cannot be empty");
    });

    const shelter = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      owner_name: "Bima Sakti",
      email: "raihandaffarizky6969@gmail.com",
      password: "bima123",
      shelter_name: "Bima Shelter",
      phone_number: "086574364532",
      address: "",
      status: "New",
    };

    await expect(
      insertNewShelter(
        shelter.id_shelter,
        shelter.owner_name,
        shelter.email,
        shelter.password,
        shelter.shelter_name,
        shelter.phone_number,
        shelter.address,
        shelter.status
      )
    ).rejects.toThrow("address cannot be empty");
  });

  test("insert shelter fails when status is null", async () => {
    insertShelterData.mockImplementation(() => {
      throw new Error("status cannot be empty");
    });

    const shelter = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      owner_name: "Bima Sakti",
      email: "raihandaffarizky6969@gmail.com",
      password: "bima123",
      shelter_name: "Bima Shelter",
      phone_number: "086574364532",
      address: "Jl. Kaliurang nomor 1, Yogyakarta, Indonesia",
      status: "",
    };

    await expect(
      insertNewShelter(
        shelter.id_shelter,
        shelter.owner_name,
        shelter.email,
        shelter.password,
        shelter.shelter_name,
        shelter.phone_number,
        shelter.address,
        shelter.status
      )
    ).rejects.toThrow("status cannot be empty");
  });

  test("insert shelter fails when email is exists", async () => {
    insertShelterData.mockImplementation(() => {
      throw new Error("id_shelter already exists");
    });

    const shelter = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      owner_name: "Bima Sakti",
      email: "raihandaffarizky6969@gmail.com",
      password: "bima123",
      shelter_name: "Bima Shelter",
      phone_number: "086574364532",
      address: "Jl. Kaliurang nomor 1, Yogyakarta, Indonesia",
      status: "New",
    };

    await expect(
      insertNewShelter(
        shelter.id_shelter,
        shelter.owner_name,
        shelter.email,
        shelter.password,
        shelter.shelter_name,
        shelter.phone_number,
        shelter.address,
        shelter.status
      )
    ).rejects.toThrow("id_shelter already exists");
  });

  test("insert shelter fails when shelter_name is exists", async () => {
    insertShelterData.mockImplementation(() => {
      throw new Error("shelter_name already exists");
    });

    const shelter = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      owner_name: "Bima Sakti",
      email: "bima.sakti@gmail.com",
      password: "bima123",
      shelter_name: "Raihan Shelter",
      phone_number: "086574364532",
      address: "Jl. Kaliurang nomor 1, Yogyakarta, Indonesia",
      status: "New",
    };

    await expect(
      insertNewShelter(
        shelter.id_shelter,
        shelter.owner_name,
        shelter.email,
        shelter.password,
        shelter.shelter_name,
        shelter.phone_number,
        shelter.address,
        shelter.status
      )
    ).rejects.toThrow("shelter_name already exists");
  });

  test("insert shelter fails when phone_number is exists", async () => {
    insertShelterData.mockImplementation(() => {
      throw new Error("phone_number already exists");
    });

    const shelter = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      owner_name: "Bima Sakti",
      email: "bimasakti@gmail.com",
      password: "bima123",
      shelter_name: "Bima Shelter",
      phone_number: "082137174314",
      address: "Jl. Kaliurang nomor 1, Yogyakarta, Indonesia",
      status: "New",
    };

    await expect(
      insertNewShelter(
        shelter.id_shelter,
        shelter.owner_name,
        shelter.email,
        shelter.password,
        shelter.shelter_name,
        shelter.phone_number,
        shelter.address,
        shelter.status
      )
    ).rejects.toThrow("phone_number already exists");
  });

  test("insert shelter success", async () => {
    insertShelterData.mockResolvedValueOnce({ success: true });

    const shelter = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      owner_name: "Bima Sakti",
      email: "bima@gmail.com",
      password: "bima123",
      shelter_name: "Bima Shelter",
      phone_number: "086574364532",
      address: "Jl. Kaliurang nomor 1, Yogyakarta, Indonesia",
      status: "New",
    };

    const result = await insertNewShelter(
      shelter.id_shelter,
      shelter.owner_name,
      shelter.email,
      shelter.password,
      shelter.shelter_name,
      shelter.phone_number,
      shelter.address,
      shelter.status
    );

    expect(result).toEqual({ success: true });
  });
});

describe("Update Shelter Tests", () => {
  test("update shelter fails when status is empty", async () => {
    updateShelterStatus.mockReset();

    updateShelterStatus.mockImplementation((status, id_shelter) => {
      if (!status || status === "") {
        return Promise.reject(new Error("status cannot be empty"));
      }
    });

    const shelter = {
      status: "",
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
    };

    await expect(
      updateShelterStatus(shelter.status, shelter.id_shelter)
    ).rejects.toThrow("status cannot be empty");
  });

  test("update shelter fails when id_shelter is empty", async () => {
    updateShelterStatus.mockReset();

    updateShelterStatus.mockImplementation((status, id_shelter) => {
      if (!id_shelter || id_shelter === "") {
        return Promise.reject(new Error("id_shelter cannot be empty"));
      }
    });

    const shelter = {
      status: "New",
      id_shelter: "",
    };

    await expect(
      updateShelterStatus(shelter.status, shelter.id_shelter)
    ).rejects.toThrow("id_shelter cannot be empty");
  });

  test("update shelter status success", async () => {
    updateShelterStatus.mockResolvedValueOnce({ success: true });

    const shelter = {
      status: "Active",
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
    };

    const result = await updateShelterStatus(
      shelter.status,
      shelter.id_shelter
    );

    expect(result).toEqual({ success: true });
  });
});

describe("Delete Shelter Tests", () => {
  test("delete shelter fails when id_shelter is empty", async () => {
    deleteShelterData.mockRejectedValueOnce(() => {
      throw new Error("id_shelter cannot be empty");
    });

    const shelter = {
      id_shelter: "",
    };

    await expect(deleteShelterData(shelter.id_shelter)).rejects.toThrow(
      "id_shelter cannot be empty"
    );
  });

  test("delete shelter success", async () => {
    deleteShelterData.mockResolvedValueOnce({ success: true });

    const shelter = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
    };

    const result = await deleteShelterData(shelter.id_shelter);

    expect(result).toEqual({ success: true });
  });
});
