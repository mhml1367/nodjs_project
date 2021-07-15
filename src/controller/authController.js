const {promisify} = require('util')
const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    // secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
  });

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = async (req, res) => {
  const newUser = await User.create({
    username: req.body.username,
    mobile: req.body.mobile,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });

  createSendToken(newUser, 201, req, res);
};

exports.checkToken = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  // // 1) Check if token sent empty
  if (!token) {
    return res.status(200).json({
      status: "failed",
      message: "Token is invalid",
    });
  }
  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return res.status(200).json({
      status: "failed",
      message: "The user belonging to this token does no longer exist.",
    });
  }

  res.status(200).json({
    status: "success",
    token,
    data: {
      user: currentUser,
    },
  });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  // 1) Check if username and password exist
  if (!username || !password) {
    return res.status(400).json({
      status: "failed",
      message: "Please provide username and password!",
    });
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ username }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      status: "failed",
      message: "Incorrect username or password",
    });
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, req, res);
};
