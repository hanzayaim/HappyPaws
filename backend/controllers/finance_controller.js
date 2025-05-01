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

    // If you want to return the result from the backend structure, use this:
    return {
      error: false,
      message: "Success",
      result: totalProfit, // This is the calculated profit value
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

    // Return the total loss as the result
    return {
      error: false,
      message: "Success",
      result: totalLoss, // This is the calculated loss value
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

    // Get total profit, use result from the returned object
    const profitResponse = await getProfit(id_shelter);
    let totalProfit = profitResponse.result || 0; // Extract the result

    // Get total loss, use result from the returned object
    const lossResponse = await getLoss(id_shelter);
    let totalLoss = lossResponse.result || 0; // Extract the result

    // Calculate balance (can be negative)
    const newBalance = totalProfit - totalLoss;

    console.log("New Balance:", newBalance);

    // Update balance in database or elsewhere
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
