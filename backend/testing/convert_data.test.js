const { convertCSV } = require("../controllers/csv_controller");

jest.mock("../controllers/csv_controller", () => ({
  convertCSV: jest.fn(),
}));

describe("Data Convert", () => {
  test("calls convertCSV with expected arguments", async () => {
    const reqData = {
      id_shelter: "SHELTER-123",
      month: "5",
      year: "2025",
      triggerValue: "animal",
    };

    const res = {
      setHeader: jest.fn(),
      write: jest.fn(),
      end: jest.fn(),
      on: jest.fn(),
    };

    convertCSV.mockResolvedValueOnce({ success: true });

    const result = await convertCSV(
      reqData.id_shelter,
      reqData.month,
      reqData.year,
      reqData.triggerValue,
      res
    );

    expect(convertCSV).toHaveBeenCalledWith(
      reqData.id_shelter,
      reqData.month,
      reqData.year,
      reqData.triggerValue,
      res
    );

    expect(result).toEqual({ success: true });
  });

  test("convertCSV fails when id_shelter is null", async () => {
    convertCSV.mockImplementation(async () => {
      throw new Error("id_shelter cannot be empty");
    });

    const reqData = {
      id_shelter: null,
      month: "5",
      year: "2025",
      triggerValue: "animal",
    };

    const res = {
      setHeader: jest.fn(),
      write: jest.fn(),
      end: jest.fn(),
      on: jest.fn(),
    };

    await expect(
      convertCSV(
        reqData.id_shelter,
        reqData.month,
        reqData.year,
        reqData.triggerValue,
        res
      )
    ).rejects.toThrow("id_shelter cannot be empty");
  });
});
