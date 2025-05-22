const {
  updateAdopterData,
  deleteAdopterData,
  insertAdopterData,
} = require("../models/adopter_models");

jest.mock("../models/adopter_models", () => ({
  insertAdopterData: jest.fn(),
  updateAdopterData: jest.fn(),
  deleteAdopterData: jest.fn(),
}));

describe("Insert Adopter", () => {
  test("insert adopter successfully", async () => {
    insertAdopterData.mockResolvedValue({ succsess: true });

    const adopter = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      adopter_name: "test",
      profile_img: "test",
      gender: "test",
      phone_number: "test",
      address: "test",
      created_by: "test",
    };

    const result = await insertAdopterData(
      adopter.id_shelter,
      adopter.adopter_name,
      adopter.profile_img,
      adopter.gender,
      adopter.phone_number,
      adopter.address,
      adopter.created_by
    );

    expect(result).toEqual({ succsess: true });
  });

  test("insert adopter failed when id_shelter is empty", async () => {
    insertAdopterData.mockImplementation(async () => {
      throw new Error("id_shelter cannot be empty");
    });

    const adopter = {
      id_shelter: "",
      adopter_name: "test",
      profile_img: "test",
      gender: "test",
      phone_number: "test",
      address: "test",
      createdby: "test",
    };

    await expect(
      insertAdopterData(
        adopter.id_shelter,
        adopter.adopter_name,
        adopter.profile_img,
        adopter.gender,
        adopter.phone_number,
        adopter.address,
        adopter.createdby
      )
    ).rejects.toThrow("id_shelter cannot be empty");
  });

  test("insert adopter failed when adopter_name is empty", async () => {
    insertAdopterData.mockImplementation(async () => {
      throw new Error("adopter_name cannot be empty");
    });

    const adopter = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      adopter_name: "",
      profile_img: "test",
      gender: "test",
      phone_number: "test",
      address: "test",
      created_by: "test",
    };

    await expect(
      insertAdopterData(
        adopter.id_shelter,
        adopter.adopter_name,
        adopter.profile_img,
        adopter.gender,
        adopter.phone_number,
        adopter.address,
        adopter.created_by
      )
    ).rejects.toThrow("adopter_name cannot be empty");
  });

  test("insert adopter failed when gender is empty", async () => {
    insertAdopterData.mockImplementation(async () => {
      throw new Error("gender cannot be empty");
    });

    const adopter = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      adopter_name: "test",
      profile_img: "test",
      gender: "",
      phone_number: "test",
      address: "test",
      created_by: "test",
    };

    await expect(
      insertAdopterData(
        adopter.id_shelter,
        adopter.adopter_name,
        adopter.profile_img,
        adopter.gender,
        adopter.phone_number,
        adopter.address,
        adopter.created_by
      )
    ).rejects.toThrow("gender cannot be empty");
  });

  test("insert adopter failed when adress is empty", async () => {
    insertAdopterData.mockImplementation(async () => {
      throw new Error("adress cannot be empty");
    });

    const adopter = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      adopter_name: "test",
      profile_img: "test",
      gender: "test",
      phone_number: "test",
      address: "",
      created_by: "test",
    };

    await expect(
      insertAdopterData(
        adopter.id_shelter,
        adopter.adopter_name,
        adopter.profile_img,
        adopter.gender,
        adopter.phone_number,
        adopter.address,
        adopter.created_by
      )
    ).rejects.toThrow("adress cannot be empty");
  });

  test("insert adopter failed when phone_number is empty", async () => {
    insertAdopterData.mockImplementation(async () => {
      throw new Error("phone_number cannot be empty");
    });

    const adopter = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      adopter_name: "test",
      profile_img: "test",
      gender: "test",
      phone_number: "",
      address: "test",
      created_by: "test",
    };

    await expect(
      insertAdopterData(
        adopter.id_shelter,
        adopter.adopter_name,
        adopter.profile_img,
        adopter.gender,
        adopter.phone_number,
        adopter.address,
        adopter.created_by
      )
    ).rejects.toThrow("phone_number cannot be empty");
  });

  test("insert adopter failed when created_by is empty", async () => {
    insertAdopterData.mockImplementation(async () => {
      throw new Error("created_by cannot be empty");
    });

    const adopter = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      adopter_name: "test",
      profile_img: "test",
      gender: "test",
      phone_number: "",
      address: "test",
      created_by: "",
    };

    await expect(
      insertAdopterData(
        adopter.id_shelter,
        adopter.adopter_name,
        adopter.profile_img,
        adopter.gender,
        adopter.phone_number,
        adopter.address,
        adopter.created_by
      )
    ).rejects.toThrow("created_by cannot be empty");
  });
});

describe("Update Adopter", () => {
  test("update adopter successfully", async () => {
    updateAdopterData.mockResolvedValue({ succsess: true });

    const adopter = {
      adopter_name: "test",
      profile_img: "test",
      gender: "test",
      phone_number: "test",
      address: "test",
      updated_by: "test",
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_adopter: "Adopter-49502b21-dfb0-478f-bf24-294914c0106e",
    };

    const result = await updateAdopterData(
      adopter.id_adopter,
      adopter.adopter_name,
      adopter.profile_img,
      adopter.gender,
      adopter.phone_number,
      adopter.address,
      adopter.updated_by,
      adopter.id_shelter,
      adopter.id_adopter
    );

    expect(result).toEqual({ succsess: true });
  });

  test("update adopter failed when id_shelter is empty", async () => {
    updateAdopterData.mockImplementation(async () => {
      throw new Error("id_shelter cannot be empty");
    });

    const adopter = {
      adopter_name: "test",
      profile_img: "test",
      gender: "test",
      phone_number: "test",
      address: "test",
      updated_by: "test",
      id_shelter: "",
      id_adopter: "Adopter-49502b21-dfb0-478f-bf24-294914c0106e",
    };

    await expect(
      updateAdopterData(
        adopter.id_adopter,
        adopter.adopter_name,
        adopter.profile_img,
        adopter.gender,
        adopter.phone_number,
        adopter.address,
        adopter.updated_by,
        adopter.id_shelter,
        adopter.id_adopter
      )
    ).rejects.toThrow("id_shelter cannot be empty");
  });

  test("update adopter failed when id_adopter is empty", async () => {
    updateAdopterData.mockImplementation(async () => {
      throw new Error("id_adopter cannot be empty");
    });

    const adopter = {
      adopter_name: "test",
      profile_img: "test",
      gender: "test",
      phone_number: "test",
      address: "test",
      updated_by: "test",
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_adopter: "",
    };

    await expect(
      updateAdopterData(
        adopter.id_adopter,
        adopter.adopter_name,
        adopter.profile_img,
        adopter.gender,
        adopter.phone_number,
        adopter.address,
        adopter.updated_by,
        adopter.id_shelter,
        adopter.id_adopter
      )
    ).rejects.toThrow("id_adopter cannot be empty");
  });

  test("update adopter failed when adopter_name is empty", async () => {
    updateAdopterData.mockImplementation(async () => {
      throw new Error("adopter_name cannot be empty");
    });

    const adopter = {
      adopter_name: "",
      profile_img: "test",
      gender: "test",
      phone_number: "test",
      address: "test",
      updated_by: "test",
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_adopter: "Adopter-49502b21-dfb0-478f-bf24-294914c0106e",
    };

    await expect(
      updateAdopterData(
        adopter.id_adopter,
        adopter.adopter_name,
        adopter.profile_img,
        adopter.gender,
        adopter.phone_number,
        adopter.address,
        adopter.updated_by,
        adopter.id_shelter,
        adopter.id_adopter
      )
    ).rejects.toThrow("adopter_name cannot be empty");
  });

  test("update adopter failed when gender is empty", async () => {
    updateAdopterData.mockImplementation(async () => {
      throw new Error("gender cannot be empty");
    });

    const adopter = {
      adopter_name: "test",
      profile_img: "test",
      gender: "",
      phone_number: "test",
      address: "test",
      updated_by: "test",
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_adopter: "Adopter-49502b21-dfb0-478f-bf24-294914c0106e",
    };

    await expect(
      updateAdopterData(
        adopter.id_adopter,
        adopter.adopter_name,
        adopter.profile_img,
        adopter.gender,
        adopter.phone_number,
        adopter.address,
        adopter.updated_by,
        adopter.id_shelter,
        adopter.id_adopter
      )
    ).rejects.toThrow("gender cannot be empty");
  });

  test("update adopter failed when phone_number is empty", async () => {
    updateAdopterData.mockImplementation(async () => {
      throw new Error("phone_number cannot be empty");
    });

    const adopter = {
      adopter_name: "test",
      profile_img: "test",
      gender: "test",
      phone_number: "",
      address: "test",
      updated_by: "test",
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_adopter: "Adopter-49502b21-dfb0-478f-bf24-294914c0106e",
    };

    await expect(
      updateAdopterData(
        adopter.id_adopter,
        adopter.adopter_name,
        adopter.profile_img,
        adopter.gender,
        adopter.phone_number,
        adopter.address,
        adopter.updated_by,
        adopter.id_shelter,
        adopter.id_adopter
      )
    ).rejects.toThrow("phone_number cannot be empty");
  });

  test("update adopter failed when address is empty", async () => {
    updateAdopterData.mockImplementation(async () => {
      throw new Error("address cannot be empty");
    });

    const adopter = {
      adopter_name: "test",
      profile_img: "test",
      gender: "test",
      phone_number: "test",
      address: "",
      updated_by: "test",
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_adopter: "Adopter-49502b21-dfb0-478f-bf24-294914c0106e",
    };

    await expect(
      updateAdopterData(
        adopter.id_adopter,
        adopter.adopter_name,
        adopter.profile_img,
        adopter.gender,
        adopter.phone_number,
        adopter.address,
        adopter.updated_by,
        adopter.id_shelter,
        adopter.id_adopter
      )
    ).rejects.toThrow("address cannot be empty");
  });

  test("update adopter failed when updated_by is empty", async () => {
    updateAdopterData.mockImplementation(async () => {
      throw new Error("updated_by cannot be empty");
    });

    const adopter = {
      adopter_name: "test",
      profile_img: "test",
      gender: "test",
      phone_number: "test",
      address: "test",
      updated_by: "",
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_adopter: "Adopter-49502b21-dfb0-478f-bf24-294914c0106e",
    };

    await expect(
      updateAdopterData(
        adopter.id_adopter,
        adopter.adopter_name,
        adopter.profile_img,
        adopter.gender,
        adopter.phone_number,
        adopter.address,
        adopter.updated_by,
        adopter.id_shelter,
        adopter.id_adopter
      )
    ).rejects.toThrow("updated_by cannot be empty");
  });
});

describe("Delete Adopter", () => {
  test("delete adopter fails when id_shelter is empty", async () => {
    deleteAdopterData.mockImplementation(async () => {
      throw new Error("id_shelter cannot be empty");
    });

    const adopter = {
      id_shelter: "",
      id_adopter: "Adopter-49502b21-dfb0-478f-bf24-294914c0106e",
    };

    await expect(
      deleteAdopterData(adopter.id_shelter, adopter.id_adopter)
    ).rejects.toThrow("id_shelter cannot be empty");
  });

  test("delete adopter fails when id_adopter is empty", async () => {
    deleteAdopterData.mockImplementation(async () => {
      throw new Error("id_adopter cannot be empty");
    });

    const adopter = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_adopter: "",
    };

    await expect(
      deleteAdopterData(adopter.id_shelter, adopter.id_adopter)
    ).rejects.toThrow("id_adopter cannot be empty");
  });

  test("delete adopter sucessfully", async () => {
    deleteAdopterData.mockResolvedValueOnce({ success: true });

    const adopter = {
      id_shelter: "SHELTER-7612f623-6386-4016-9966-9c0ca1debacc",
      id_adopter: "Adopter-49502b21-dfb0-478f-bf24-294914c0106e",
    };

    const result = await deleteAdopterData(
      adopter.id_shelter,
      adopter.id_adopter
    );

    expect(result).toEqual({ success: true });
  });
});
