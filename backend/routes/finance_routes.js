const express = require("express");
const router = express.Router();
const {
  getFinance,
  deleteFinanceData,
} = require("../models/finance_models.js");
const {
  updateTotalBalance,
  getProfit,
  getLoss,
  insertFinance,
} = require("../controllers/finance_controller.js");

router.get("/getFinance/:id_shelter", async (req, res) => {
  const { id_shelter } = req.params;
  const result = await getFinance(id_shelter);
  if (result.error) {
    return res.status(404).json(result);
  }
  res.json(result);
});
router.post("/insertFinanceData", async (req, res) => {
  try {
    const { id_shelter } = req.body;

    if (!id_shelter) {
      return res
        .status(400)
        .json({ error: true, message: "Please provide all required data." });
    }
    const result = await insertFinance(id_shelter);
    if (result.error) {
      return res.status(500).json(result);
    }
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: "Failed to insert finance data" });
  }
});
router.post("/deleteFinanceData", async (req, res) => {
  const { id_shelter, id_finance } = req.body;
  if (!id_finance) {
    return res
      .status(400)
      .json({ error: true, message: "Please provide all required data." });
  }
  try {
    const result = await deleteFinanceData(id_shelter, id_finance);
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: "Failed to delete finance data" });
  }
});
router.post("/updateTotalBalance", async (req, res) => {
  const { id_shelter } = req.body;
  if (!id_shelter) {
    return res
      .status(400)
      .json({ error: true, message: "Please provide all required data." });
  }
  try {
    const result = await updateTotalBalance(id_shelter);
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: "Failed to update Balance finance data" });
  }
});
router.post("/getLoss", async (req, res) => {
  const { id_shelter } = req.body;
  if (!id_shelter) {
    return res
      .status(400)
      .json({ error: true, message: "Please provide all required data." });
  }
  try {
    const result = await getLoss(id_shelter);
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: "Failed to get Loss finance data" });
  }
});
router.post("/getPorfit", async (req, res) => {
  const { id_shelter } = req.body;
  if (!id_shelter) {
    return res
      .status(400)
      .json({ error: true, message: "Please provide all required data." });
  }
  try {
    const result = await getProfit(id_shelter);
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: "Failed to get Profit finance data" });
  }
});

module.exports = router;
