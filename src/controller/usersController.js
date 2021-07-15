const User = require("../models/usersModel");

var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'mhml' }, 'shhhhh');

const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 12);
  
  const user = await User.aggregate([[{ $match: { username: req.body.username} }]]);
  
  const hashPassword = await bcrypt.compare(user[0].password, hash); // true
  
  console.log(user[0].password ,"--", hash);
  console.log(hashPassword);

  // const docs = await User.aggregate([[{ $match: { username: req.body.username , passwor: hash} }]]);

  // res.status(200).json({
  //   status: "success",
  //   result: docs,
  // });
};

exports.user = async (req, res) => {
  const docs = await User.aggregate([[{ $match: { username: req.body.username } }]]);

  res.status(200).json({
    status: "success",
    result: docs,
  });
};

exports.singup = async (req, res) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(req.body.password, salt);
  
  const docs = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: hash,
    level: 1,
  });

  res.status(200).json({
    status: "success",
    result: docs,
  });
};

