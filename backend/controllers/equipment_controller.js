const generateId = require("../config/generate_id");
const { insertEquipmentData, deleteEquipmentData, updateEquipmentData } = require("../models/equipment_models.js");
const { insertExpenses, deleteExpensesById } = require("./expenses_controller");
const { updateTotalBalance } = require("./finance_controller");

const insertEquipment = async (
  name,
  type,
  date,
  cost,
  note,
  created_by,
  id_shelter
) => {
  const id_equipment = "EQUIPMENT-" + generateId();
  try {
    const result1 = await insertEquipmentData(
      id_equipment,
      name,
      type,
      date,
      cost,
      note,
      created_by,
      id_shelter
    );
    if (cost != 0) {
      const result2 = await insertExpenses(
        id_shelter,
        (id_food = null),
        (id_medical = null),
        id_equipment,
        (id_salary = null),
        created_by
      );
      return {
        error: false,
        message: "equipment data created successfully",
        data: { result1, result2 },
      };
    } else {
      return {
        error: false,
        message: "equipment data created successfully",
        data: result1,
      };
    }
  } catch (error) {
    console.error(error)
    return {
      error: true,
      message: "Failed create equipment Data",
      data: null,
    };
  }
};
const deleteEquipment = async (id_shelter, id_equipment) => {
  try {
    await deleteExpensesById(id_shelter, id_equipment);
    const result = await deleteEquipmentData(id_shelter, id_equipment);
    updateTotalBalance(id_shelter);
    return {
      error: false,
      message: "equipment data deleted successfully",
      data: result,
    };
  } catch (error) {
    return {
      error: true,
      message: "Failed delete equipment Data",
      data: null,
    };
  }
};
const updateEquipment = async (
  name,
  type,
  date,
  cost,
  note,
  updated_by,
  id_shelter,
  id_equipment
) => {
  try {
    const updated_at = new Date();
    const result = await updateEquipmentData(
      name,
      type,
      date,
      cost,
      note,
      updated_at,
      updated_by,
      id_shelter,
      id_equipment
    );
    updateTotalBalance(id_shelter);
    return result
  } catch (error) {
    return {
      error: true,
      message: "Failed update Food Data",
      data: null,
    };
  }
};


module.exports = {
  insertEquipment,
  deleteEquipment,
  updateEquipment
};
