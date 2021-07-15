const mongoose = require("mongoose");

const procedureReportSchema = new mongoose.Schema(
  {
    apiKey: String,
    userId:Number,
    ip: String,
    title: String,
    method: String,
    statusCode: Number,
    params: String,
    description: String,
  },
  { timestamps: true }
);


const procedureReport = mongoose.model("procedure_reports", procedureReportSchema);

module.exports = procedureReport;
