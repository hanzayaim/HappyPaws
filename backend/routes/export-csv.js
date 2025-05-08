const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { format } = require("@fast-csv/format");
const { getMedicalDataConvert } = require("../models/medical_models");
const { getAnimalDataConvert } = require("../models/animal_models");

router.post("/export-csv", async (req, res) => {
  const { id_shelter, month, year, triggerValue } = req.body;

  let safeMonth = month === "all" ? null : parseInt(month);
  let safeYear = year === "all" ? null : parseInt(year);

  try {
    let result = null;
    let fileName = null;

    if (triggerValue === "medical") {
      result = await getMedicalDataConvert(id_shelter, safeMonth, safeYear);
      fileName = `Recap_MedicalData_${month}_${year}.csv`;
    } else if (triggerValue === "animal") {
      result = await getAnimalDataConvert(id_shelter, safeMonth, safeYear);
      fileName = `Recap_AnimalData_${month}_${year}.csv`;
    }

    if (result.error || !result.data || result.data.length === 0) {
      return res.status(400).send("No data available or error occurred.");
    }

    const exportDir = path.join(__dirname, "..", "exports");

    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
    }

    const filePath = path.join(exportDir, fileName);
    const writeStream = fs.createWriteStream(filePath);
    const csvStream = format({ headers: true, delimiter: ";" });

    csvStream.pipe(writeStream);
    result.data.forEach((row) => csvStream.write(row));
    csvStream.end();

    writeStream.on("finish", () => {
      res.download(filePath, fileName, (err) => {
        if (err) {
          console.error("Download error:", err);
          res.status(500).send("Failed to download file");
        } else {
          fs.unlink(filePath, (err) => {
            if (err) console.error("Failed to delete file:", err);
          });
        }
      });
    });

    writeStream.on("error", (err) => {
      console.error("Write error:", err);
      res.status(500).send("Failed to write CSV file");
    });

    console.log(result.data[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error exporting data");
  }
});

module.exports = router;
