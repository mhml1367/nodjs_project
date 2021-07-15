const Procedure = require("../models/procedureModel");

exports.procedureInsert = async (req, res) => {
  const newProcedure = await Procedure.create({
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
  const docs = await Procedure.findById(req.params.id);

  res.status(200).json({
    status: "success",
    result: docs,
  });
};

exports.procedureUpdate = async (req, res) => {
  const id = req.params.id;
  const docs = await Procedure.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    result: docs,
  });
};

exports.procedureRemove = async (req, res) => {
  const id = req.params.id;
  const docs = await Procedure.findOneAndRemove(id);

  res.status(200).json({
    status: "success",
    result: docs,
  });
};
