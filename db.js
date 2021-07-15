const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://moftadeh:bst123@10.0.0.139:27017/apiExternal?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback() {
  console.log("connect to mongoDB");
});
