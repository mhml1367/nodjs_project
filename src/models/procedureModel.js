const mongoose = require("mongoose");

const procedureApiSchema = new mongoose.Schema(
  {
    method: String,
    title: String,
    titleF: String,
    sql: String,
    access: String,
    limited: [String],
    cacheTime: Number,
  },
  { timestamps: true }
);


const procedureApi = mongoose.model("procedures", procedureApiSchema);

module.exports = procedureApi;
