const {
  insertMedical,
  deleteMedical,
  updateMedical,
} = require("../controllers/medical_controller");
const {
  insertMedicalData,
  updateMedicalData,
  deleteMedicalData,
} = require("../models/medical_models");

jest.mock("../models/medical_models", () => ({
  insertMedicalData: jest.fn(),
  updateMedicalData: jest.fn(),
  deleteMedicalData: jest.fn(),
}));

describe("Insert Medical", () => {
  test("insert medical success", async () => {
    insertMedicalData.mockResolvedValueOnce({ success: true });

    const medical = {
      medical_status: "test",
      vaccin_status: "test",
      medical_date_in: "01-25-2024",
      medical_date_out: "01-28-2024",
      medical_cost: 20000,
      note: "test",
      created_by: "test",
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_animal: "ANIMAL-7def6a8d-5936-4acc-a67c-a3f2dc72404c",
    };

    const result = await insertMedical(
      medical.medical_status,
      medical.vaccin_status,
      medical.medical_date_in,
      medical.medical_date_out,
      medical.medical_cost,
      medical.note,
      medical.created_by,
      medical.id_shelter,
      medical.id_animal
    );

    expect(result).toEqual({ success: true });
  });

  test("insert medical failed when id_shelter is empty ", async () => {
    insertMedicalData.mockImplementation(() => {
      throw new Error("id_shelter cannot be empty");
    });

    const medical = {
      medical_status: "test",
      vaccin_status: "test",
      medical_date_in: "01-25-2024",
      medical_date_out: "01-28-2024",
      medical_cost: 20000,
      note: "test",
      created_by: "test",
      id_shelter: "",
      id_animal: "ANIMAL-7def6a8d-5936-4acc-a67c-a3f2dc72404c",
    };
    await expect(
      insertMedical(
        medical.medical_status,
        medical.vaccin_status,
        medical.medical_date_in,
        medical.medical_date_out,
        medical.medical_cost,
        medical.note,
        medical.created_by,
        medical.id_shelter,
        medical.id_animal
      )
    ).rejects.toThrow("id_shelter cannot be empty");
  });

  test("insert medical failed when id_animal is empty ", async () => {
    insertMedicalData.mockImplementation(() => {
      throw new Error("id_animal cannot be empty");
    });

    const medical = {
      medical_status: "test",
      vaccin_status: "test",
      medical_date_in: "01-25-2024",
      medical_date_out: "01-28-2024",
      medical_cost: 20000,
      note: "test",
      created_by: "test",
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_animal: "",
    };
    await expect(
      insertMedical(
        medical.medical_status,
        medical.vaccin_status,
        medical.medical_date_in,
        medical.medical_date_out,
        medical.medical_cost,
        medical.note,
        medical.created_by,
        medical.id_shelter,
        medical.id_animal
      )
    ).rejects.toThrow("id_animal cannot be empty");
  });

  test("insert medical failed when medical_date_in is empty ", async () => {
    insertMedicalData.mockImplementation(() => {
      throw new Error("medical_date_in cannot be empty");
    });

    const medical = {
      medical_status: "test",
      vaccin_status: "test",
      medical_date_in: "",
      medical_date_out: "01-28-2024",
      medical_cost: 20000,
      note: "test",
      created_by: "test",
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_animal: "ANIMAL-7def6a8d-5936-4acc-a67c-a3f2dc72404c",
    };
    await expect(
      insertMedical(
        medical.medical_status,
        medical.vaccin_status,
        medical.medical_date_in,
        medical.medical_date_out,
        medical.medical_cost,
        medical.note,
        medical.created_by,
        medical.id_shelter,
        medical.id_animal
      )
    ).rejects.toThrow("medical_date_in cannot be empty");
  });

  test("insert medical failed when medical_cost is empty ", async () => {
    insertMedicalData.mockImplementation(() => {
      throw new Error("medical_cost cannot be empty");
    });

    const medical = {
      medical_status: "test",
      vaccin_status: "test",
      medical_date_in: "01-25-2024",
      medical_date_out: "01-28-2024",
      medical_cost: null,
      date: "01-25-2024",
      note: "test",
      created_by: "test",
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_animal: "ANIMAL-7def6a8d-5936-4acc-a67c-a3f2dc72404c",
    };
    await expect(
      insertMedical(
        medical.medical_status,
        medical.vaccin_status,
        medical.medical_date_in,
        medical.medical_date_out,
        medical.medical_cost,
        medical.note,
        medical.created_by,
        medical.id_shelter,
        medical.id_animal
      )
    ).rejects.toThrow("medical_cost cannot be empty");
  });

  test("insert medical failed when created_by is empty ", async () => {
    insertMedicalData.mockImplementation(() => {
      throw new Error("created_by cannot be empty");
    });

    const medical = {
      medical_status: "test",
      vaccin_status: "test",
      medical_date_in: "01-25-2024",
      medical_date_out: "01-28-2024",
      medical_cost: 20000,
      date: "01-25-2024",
      note: "test",
      created_by: "",
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_animal: "ANIMAL-7def6a8d-5936-4acc-a67c-a3f2dc72404c",
    };
    await expect(
      insertMedical(
        medical.medical_status,
        medical.vaccin_status,
        medical.medical_date_in,
        medical.medical_date_out,
        medical.medical_cost,
        medical.note,
        medical.created_by,
        medical.id_shelter,
        medical.id_animal
      )
    ).rejects.toThrow("created_by cannot be empty");
  });
});

describe("Update Medical", () => {
  test("update medical successfully", async () => {
    updateMedicalData.mockResolvedValueOnce({ success: true });

    const medical = {
      medical_status: "test",
      vaccin_status: "test",
      medical_date_in: "01-25-2024",
      medical_date_out: "01-28-2024",
      medical_cost: 20000,
      note: "test",
      updated_by: "test",
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_animal: "ANIMAL-7def6a8d-5936-4acc-a67c-a3f2dc72404c",
      id_medical: "MEDICAL-c2471480-3851-4713-894d-e39d2e207f12",
    };

    const result = await updateMedical(
      medical.medical_status,
      medical.vaccin_status,
      medical.medical_date_in,
      medical.medical_date_out,
      medical.medical_cost,
      medical.note,
      medical.updated_by,
      medical.id_shelter,
      medical.id_animal,
      medical.id_medical
    );

    expect(result).toEqual({ success: true });
  });

  test("update medical failed when id_shelter is empty ", async () => {
    updateMedicalData.mockImplementation(() => {
      throw new Error("id_shelter cannot be empty");
    });

    const medical = {
      medical_status: "test",
      vaccin_status: "test",
      medical_date_in: "01-25-2024",
      medical_date_out: "01-28-2024",
      medical_cost: 20000,
      note: "test",
      updated_by: "test",
      id_shelter: "",
      id_animal: "ANIMAL-7def6a8d-5936-4acc-a67c-a3f2dc72404c",
      id_medical: "MEDICAL-c2471480-3851-4713-894d-e39d2e207f12",
    };

    await expect(
      updateMedical(
        medical.medical_status,
        medical.vaccin_status,
        medical.medical_date_in,
        medical.medical_date_out,
        medical.medical_cost,
        medical.note,
        medical.updated_by,
        medical.id_shelter,
        medical.id_animal,
        medical.id_medical
      )
    ).rejects.toThrow("id_shelter cannot be empty");
  });

  test("update medical failed when id_animal is empty ", async () => {
    updateMedicalData.mockImplementation(() => {
      throw new Error("id_animal cannot be empty");
    });

    const medical = {
      medical_status: "test",
      vaccin_status: "test",
      medical_date_in: "01-25-2024",
      medical_date_out: "01-28-2024",
      medical_cost: 20000,
      note: "test",
      updated_by: "test",
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_animal: "",
      id_medical: "MEDICAL-c2471480-3851-4713-894d-e39d2e207f12",
    };

    await expect(
      updateMedical(
        medical.medical_status,
        medical.vaccin_status,
        medical.medical_date_in,
        medical.medical_date_out,
        medical.medical_cost,
        medical.note,
        medical.updated_by,
        medical.id_shelter,
        medical.id_animal,
        medical.id_medical
      )
    ).rejects.toThrow("id_animal cannot be empty");
  });

  test("update medical failed when id_medical is empty ", async () => {
    updateMedicalData.mockImplementation(() => {
      throw new Error("id_medical cannot be empty");
    });

    const medical = {
      medical_status: "test",
      vaccin_status: "test",
      medical_date_in: "01-25-2024",
      medical_date_out: "01-28-2024",
      medical_cost: 20000,
      note: "test",
      updated_by: "test",
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_animal: "ANIMAL-7def6a8d-5936-4acc-a67c-a3f2dc72404c",
      id_medical: "",
    };

    await expect(
      updateMedical(
        medical.medical_status,
        medical.vaccin_status,
        medical.medical_date_in,
        medical.medical_date_out,
        medical.medical_cost,
        medical.note,
        medical.updated_by,
        medical.id_shelter,
        medical.id_animal,
        medical.id_medical
      )
    ).rejects.toThrow("id_medical cannot be empty");
  });

  test("update medical failed when medical_cost is empty ", async () => {
    updateMedicalData.mockImplementation(() => {
      throw new Error("medical_cost cannot be empty");
    });

    const medical = {
      medical_status: "test",
      vaccin_status: "test",
      medical_date_in: "01-25-2024",
      medical_date_out: "01-28-2024",
      medical_cost: null,
      note: "test",
      updated_by: "test",
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_animal: "ANIMAL-7def6a8d-5936-4acc-a67c-a3f2dc72404c",
      id_medical: "MEDICAL-c2471480-3851-4713-894d-e39d2e207f12",
    };

    await expect(
      updateMedical(
        medical.medical_status,
        medical.vaccin_status,
        medical.medical_date_in,
        medical.medical_date_out,
        medical.medical_cost,
        medical.note,
        medical.updated_by,
        medical.id_shelter,
        medical.id_animal,
        medical.id_medical
      )
    ).rejects.toThrow("medical_cost cannot be empty");
  });

  test("update medical failed when medical_date_in is empty ", async () => {
    updateMedicalData.mockImplementation(() => {
      throw new Error("medical_date_in cannot be empty");
    });

    const medical = {
      medical_status: "test",
      vaccin_status: "test",
      medical_date_in: "",
      medical_date_out: "01-28-2024",
      medical_cost: 20000,
      note: "test",
      updated_by: "test",
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_animal: "ANIMAL-7def6a8d-5936-4acc-a67c-a3f2dc72404c",
      id_medical: "MEDICAL-c2471480-3851-4713-894d-e39d2e207f12",
    };

    await expect(
      updateMedical(
        medical.medical_status,
        medical.vaccin_status,
        medical.medical_date_in,
        medical.medical_date_out,
        medical.medical_cost,
        medical.note,
        medical.updated_by,
        medical.id_shelter,
        medical.id_animal,
        medical.id_medical
      )
    ).rejects.toThrow("medical_date_in cannot be empty");
  });

  test("update medical failed when medical_date_out is empty ", async () => {
    updateMedicalData.mockImplementation(() => {
      throw new Error("medical_date_out cannot be empty");
    });

    const medical = {
      medical_status: "test",
      vaccin_status: "test",
      medical_date_in: "01-25-2024",
      medical_date_out: "",
      medical_cost: 20000,
      note: "test",
      updated_by: "test",
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_animal: "ANIMAL-7def6a8d-5936-4acc-a67c-a3f2dc72404c",
      id_medical: "MEDICAL-c2471480-3851-4713-894d-e39d2e207f12",
    };

    await expect(
      updateMedical(
        medical.medical_status,
        medical.vaccin_status,
        medical.medical_date_in,
        medical.medical_date_out,
        medical.medical_cost,
        medical.note,
        medical.updated_by,
        medical.id_shelter,
        medical.id_animal,
        medical.id_medical
      )
    ).rejects.toThrow("medical_date_out cannot be empty");
  });

  test("update medical failed when updated_by is empty ", async () => {
    updateMedicalData.mockImplementation(() => {
      throw new Error("updated_by cannot be empty");
    });

    const medical = {
      medical_status: "test",
      vaccin_status: "test",
      medical_date_in: "01-25-2024",
      medical_date_out: "01-28-2024",
      medical_cost: 20000,
      note: "test",
      updated_by: "",
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_animal: "ANIMAL-7def6a8d-5936-4acc-a67c-a3f2dc72404c",
      id_medical: "MEDICAL-c2471480-3851-4713-894d-e39d2e207f12",
    };

    await expect(
      updateMedical(
        medical.medical_status,
        medical.vaccin_status,
        medical.medical_date_in,
        medical.medical_date_out,
        medical.medical_cost,
        medical.note,
        medical.updated_by,
        medical.id_shelter,
        medical.id_animal,
        medical.id_medical
      )
    ).rejects.toThrow("updated_by cannot be empty");
  });
});

describe("Delete Medical", () => {
  test("delete medical fails when id_shelter is empty", async () => {
    deleteMedicalData.mockImplementation(() => {
      throw new Error("id_shelter cannot be empty");
    });

    const medical = {
      id_shelter: "",
      id_animal: "ANIMAL-7def6a8d-5936-4acc-a67c-a3f2dc72404c",
      id_medical: "MEDICAL-c2471480-3851-4713-894d-e39d2e207f12",
    };

    await expect(
      deleteMedical(medical.id_shelter, medical.id_animal, medical.id_medical)
    ).rejects.toThrow("id_shelter cannot be empty");
  });

  test("delete medical fails when id_animal is empty", async () => {
    deleteMedicalData.mockImplementation(() => {
      throw new Error("id_animal cannot be empty");
    });

    const medical = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_animal: "",
      id_medical: "MEDICAL-c2471480-3851-4713-894d-e39d2e207f12",
    };

    await expect(
      deleteMedical(medical.id_shelter, medical.id_animal, medical.id_medical)
    ).rejects.toThrow("id_animal cannot be empty");
  });

  test("delete medical sucessfully", async () => {
    deleteMedicalData.mockResolvedValueOnce({ success: true });

    const medical = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_animal: "ANIMAL-7def6a8d-5936-4acc-a67c-a3f2dc72404c",
      id_medical: "MEDICAL-c2471480-3851-4713-894d-e39d2e207f12",
    };

    const result = await deleteMedical(
      medical.id_shelter,
      medical.id_animal,
      medical.id_medical
    );

    expect(result).toEqual({ success: true });
  });
});
