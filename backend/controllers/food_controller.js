const generateId = require("../config/generate_id");
const {
  insertFoodData,
  deleteFoodData,
  updateFoodData,
} = require("../models/food_models");
const { insertExpenses, deleteExpensesById } = require("./expenses_controller");
const { updateTotalBalance } = require("./finance_controller");

const insertFood = async (
  name,
  quantity,
  category,
  type,
  exp_date,
  cost,
  date,
  note,
  created_by,
  id_shelter
) => {
  const id_food = "FOOD-" + generateId();
  try {
    const result1 = await insertFoodData(
      id_food,
      name,
      quantity,
      category,
      type,
      exp_date,
      cost,
      date,
      note,
      created_by,
      id_shelter
    );
    if (cost != 0) {
      const result2 = await insertExpenses(
        id_shelter,
        id_food,
        (id_medical = null),
        (id_equipment = null),
        (id_salary = null),
        created_by
      );
      return {
        error: false,
        message: "Food data created successfully",
        data: { result1, result2 },
      };
    } else {
      return {
        error: false,
        message: "Food data created successfully",
        data: result1,
      };
    }
  } catch (error) {
    return {
      error: true,
      message: "Failed create Food Data",
      data: null,
    };
  }
};

const deleteFood = async (id_shelter, id_food) => {
  try {
    await deleteExpensesById(id_shelter, id_food);
    const result = await deleteFoodData(id_shelter, id_food);
    updateTotalBalance(id_shelter);
    return {
      error: false,
      message: "Food data deleted successfully",
      data: result,
    };
  } catch (error) {
    return {
      error: true,
      message: "Failed delete Food Data",
      data: null,
    };
  }
};
const updateFood = async (
  name,
  quantity,
  category,
  type,
  exp_date,
  cost,
  date,
  note,
  updated_by,
  id_shelter,
  id_food
) => {
  try {
    const updated_at = new Date();
    const result = await updateFoodData(
      name,
      quantity,
      category,
      type,
      exp_date,
      cost,
      date,
      note,
      updated_at,
      updated_by,
      id_shelter,
      id_food
    );

    updateTotalBalance(id_shelter);
    return result;
  } catch (error) {
    return {
      error: true,
      message: "Failed update Food Data",
      data: null,
    };
  }
};

module.exports = {
  insertFood,
  deleteFood,
  updateFood,
};
