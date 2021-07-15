const procedureReport = require("../models/procedureReportModel");

exports.procedureInsert = async (req, res) => {
  const newProcedure = await procedureReport.create({
    method: req.body.method,
    title: req.body.title,
    titleF: req.body.titleF,
    sql: req.body.sql,
    access: req.body.access,
    limited: req.body.limited,
    cacheTime: req.body.cacheTime,
  });

  res.status(200).json({
    status: "success",
    result: newProcedure,
  });
};

exports.procedure = async (req, res) => {
  const docs = await procedureReport.findById(req.params.id);

  res.status(200).json({
    status: "success",
    result: docs,
  });
};

exports.checkToken = async (req, res, next) => {
  if (true) {
    console.log("token Cheking");
    return res.status(200).json({
      message: 'hello bbaby'
    })
  }
};
