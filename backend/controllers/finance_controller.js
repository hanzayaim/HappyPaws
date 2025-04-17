
const { getFinance, increaseBalance,decreaseBalance, updateBalance } = require("../models/finance_models.js");
const { getExpenses } = require("../models/expenses_models.js")
const { getIncome, getIncomeById } = require("../models/income_models.js")
const { getFoodData } = require("../models/food_models.js")
const { getMedicalData } = require("../models/medical_models.js")
const { getEquipmentData } = require("../models/equipment_models.js")
const { getSalary } = require("../models/salary_models.js")
/*
profit = income
loss = expenses
total balace = profit - loss


func profit
func loss
func update total balance
func UPDATE loss
func UPDATE profit

*/
let totalProfit;
let totalLoss;
const getProfit = async (id_shelter) => {
  try {
    const incomeData = await getIncome(id_shelter);
    totalProfit = 0;
    incomeData.data.forEach(item => {
      totalProfit += item.amount;
    });
    return totalProfit;
  } catch (error) {
    return{
      error: true,
      message: "Failed to get Profit",
      result: null,
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
    (foodData?.data || []).forEach(item => {
      totalLoss += item.cost;
    });
    (medicalData?.data || []).forEach(item => {
      totalLoss += item.medical_cost;
    });
    (equipmentData?.data || []).forEach(item => {
      totalLoss += item.cost;
    });
    (salaryData?.data || []).forEach(item => {
      totalLoss += item.cost;
    });
    return totalLoss;
  } catch (error) {
    return{
      error: true,
      message: "Failed to get Loss",
      result: null,
  };
  }
};


const updateTotalBalance = async(id_shelter) =>{
  try {
    const finance = await getFinance(id_shelter);
    const totalProfit = await getProfit(id_shelter);
    const totalLoss = await getLoss(id_shelter);
    const newBalance = totalProfit - totalLoss;
    const result = await updateBalance(
      newBalance,
      finance.data[0].id_finance,
      id_shelter,
    );
    
    return result
  } catch (error) {
    return{
      error: true,
      message: "Failed to update balance data.",
      result: null,
  };
  }
}


// const updateDecreaseBalance = async (
//     id_shelter,DataCost,amount
//   ) => {
//       const currentAmount = DataCost.data.amount
//       if (currentAmount != amount) {
//         const finance = await getFinance(id_shelter);
//         const currentBalance = finance.data[0].total_balance;
//         const newBalance = (currentBalance - currentAmount) - amount;
//         if (newBalance < 0) {
//             return{
//                 error: true,
//                 message: "Failed to update balance data",
//                 result: null,
//               };
//         }else{
//             await updateBalance(
//               newBalance,
//               finance.data[0].id_finance,
//               id_shelter,
//             );
//         }
//       }
//   }
//   const updateIncreaseBalance = async (
//     id_shelter, DataCost, amount
//   ) => {
//       const currentAmount = DataCost.data.amount
//       if (currentAmount != amount) {
//         const finance = await getFinance(id_shelter);
//         const currentBalance = finance.data[0].total_balance;
//         const newBalance = (currentBalance - currentAmount) + amount;
//         if (newBalance < 0) {
//             return{
//                 error: true,
//                 message: "Failed to update balance data.",
//                 result: null,
//               };
//         }else{
//             await updateBalance(
//               newBalance,
//               finance.data[0].id_finance,
//               id_shelter,
//             );
//         }
//       }
//   }
//   const increaseBalanceFinance = async (
//     id_shelter,amount
//   ) =>{
//     const finance = await getFinance(id_shelter);
//     const newBalance = await increaseBalance(
//         finance.data[0].id_finance,
//         id_shelter,
//         amount.data[0].cost
//     );
//     await updateBalance(
//         newBalance,
//         finance.data[0].id_finance,
//         id_shelter
//     );
//   }
// const decreaseBalanceFinance = async (
//     id_shelter,amount
//   ) =>{
//     try {
//         const finance = await getFinance(id_shelter);
//         const newBalance = await decreaseBalance(
//           finance.data[0].id_finance,
//           id_shelter,
//           amount
//         );
//         await updateBalance(
//           newBalance,
//           finance.data[0].id_finance,
//           id_shelter,
//         );
//     } catch (error) {
//         return{
//             error: true,
//             message: "Failed to update income data.",
//             result: null,
//         };
//     }
//   }


  module.exports = {
    updateTotalBalance,getLoss,getProfit,totalProfit,totalLoss
  };
  