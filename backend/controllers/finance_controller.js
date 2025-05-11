const {
  getFinance,
  updateBalance,
  insertFinanceData,
} = require("../models/finance_models.js");
const { getIncome } = require("../models/income_models.js");
const { getFoodData } = require("../models/food_models.js");
const { getMedicalData } = require("../models/medical_models.js");
const { getEquipmentData } = require("../models/equipment_models.js");
const { getSalary } = require("../models/salary_models.js");
const generateId = require("../config/generate_id.js");

let totalProfit;
let totalLoss;
const getProfit = async (id_shelter) => {
  try {
    const incomeData = await getIncome(id_shelter);
    totalProfit = 0;

    if (incomeData?.data) {
      incomeData.data.forEach((item) => {
        totalProfit += item.amount;
      });
    }
    return {
      error: false,
      message: "Success",
      result: totalProfit,
    };
  } catch (error) {
    return {
      error: true,
      message: "Failed to get Profit",
      result: 0,
    };
  }
};

const getLoss = async (id_shelter) => {
  try {
    const foodData = await getFoodData(id_shelter);
    const medicalData = await getMedicalData(id_shelter);
    const equipmentData = await getEquipmentData(id_shelter);
    const salaryData = await getSalary(id_shelter);
    totalLoss = 0;

    (foodData?.data || []).forEach((item) => {
      totalLoss += item.cost;
    });
    (medicalData?.data || []).forEach((item) => {
      totalLoss += item.medical_cost;
    });
    (equipmentData?.data || []).forEach((item) => {
      totalLoss += item.cost;
    });
    (salaryData?.data || []).forEach((item) => {
      totalLoss += item.cost;
    });
    return {
      error: false,
      message: "Success",
      result: totalLoss,
    };
  } catch (error) {
    return {
      error: true,
      message: "Failed to get Loss",
      result: 0,
    };
  }
};

const insertFinance = async (id_shelter) => {
  try {
    const id_finance = "FINANCE-" + generateId();
    const total_balance = 0;
    const result = await insertFinanceData(
      id_finance,
      id_shelter,
      total_balance
    );
    return result;
  } catch (error) {
    return {
      error: true,
      message: "Failed to Insert Finance",
      result: null,
    };
  }
};
const updateTotalBalance = async (id_shelter) => {
  try {
    const finance = await getFinance(id_shelter);

    const profitResponse = await getProfit(id_shelter);
    let totalProfit = profitResponse.result || 0;

    const lossResponse = await getLoss(id_shelter);
    let totalLoss = lossResponse.result || 0;

    const newBalance = totalProfit - totalLoss;

    const result = await updateBalance(
      newBalance,
      finance.data[0].id_finance,
      id_shelter
    );

    return result;
  } catch (error) {
    return {
      error: true,
      message: "Failed to update balance data.",
      result: null,
    };
  }
};

module.exports = {
  updateTotalBalance,
  getLoss,
  getProfit,
  totalProfit,
  totalLoss,
  insertFinance,
};
