const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config({
  path: "./config.env",
});

const port = 9099;

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

require("./db");
const procedureReportRoute = require("./src/routes/procedureReportRoute");
const procedureRoute = require("./src/routes/procedureRoute");
const userRouter = require("./src/routes/userRoute");
app.use("/api/v1/report", procedureReportRoute);
app.use("/api/v1/procedure", procedureRoute);
app.use("/api/v1/auth", userRouter);

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
