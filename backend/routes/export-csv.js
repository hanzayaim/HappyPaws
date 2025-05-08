const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { format } = require("@fast-csv/format");
const { getMedicalDataConvert } = require("../models/medical_models");

function formatMedicalRow(row) {
  return {
    animal_name: row.animal_name || "-",
    medical_status: row.medical_status || "-",
    vaccin_status: row.vaccin_status || "-",
    medical_date_in: row.medical_date_in
      ? new Date(row.medical_date_in).toLocaleString("id-ID")
      : "-",
    medical_cost: row.medical_cost ?? "-",
    note: row.note || "-",
    created_at: row.created_at
      ? new Date(row.created_at).toLocaleString("id-ID")
      : "-",
    created_by: row.created_by || "-",
  };
}

router.post("/export-csv", async (req, res) => {
  const { id_shelter, month, year, triggerValue } = req.body;

  let safeMonth = month === "all" ? null : parseInt(month);
  let safeYear = year === "all" ? null : parseInt(year);

  try {
    let result = null;
    let fileName = null;
    let formatter = null;

    if (triggerValue === "medical") {
      result = await getMedicalDataConvert(id_shelter, safeMonth, safeYear);
      fileName = `Recap_MedicalData_${month}_${year}.csv`;
      formatter = formatMedicalRow;
    }

    if (result.error || !result.data || result.data.length === 0) {
      return res.status(400).send("No data available or error occurred.");
    }

    if (!formatter) {
      return res.status(400).send("Unsupported export type");
    }

    const exportDir = path.join(__dirname, "..", "exports");

    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
    }

    const filePath = path.join(exportDir, fileName);
    const writeStream = fs.createWriteStream(filePath);
    const csvStream = format({ headers: true });

    csvStream.pipe(writeStream);
    result.data.forEach((row) => {
      const formattedRow = formatter(row);
      csvStream.write(formattedRow);
    });
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
