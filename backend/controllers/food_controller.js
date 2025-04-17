const generateId = require("../config/generate_id");
const { insertFoodData, deleteFoodData } = require("../models/food_models");
const { insertExpenses, deleteExpensesById } = require("./expenses_controller");

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
    console.log(error);
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
    return {
      error: false,
      message: "Food data deleted successfully",
      data: result,
    };
  } catch (error) {
    console.log(error);
    return {
      error: true,
      message: "Failed delete Food Data",
      data: null,
    };
  }
};

module.exports = {
  insertFood,
  deleteFood,
};
