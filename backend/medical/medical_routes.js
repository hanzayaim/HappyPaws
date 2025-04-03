const express = require("express");
const router = express.Router();
const { getMedicalData } = require("./medical_handler");

router.get("/medical/:id_shelter", async (req, res) =>  {
    const { id_shelter } = req.params;
    const result = await getMedicalData(id_shelter);

    if (result.error) {
        return res.status(404).json(result);
    }
    
    res.json(result);
});

module.exports = router;