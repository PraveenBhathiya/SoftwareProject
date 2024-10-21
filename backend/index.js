const express = require("express");
const dbConnection = require("./database/dbConnection");
const cors = require("cors");
require("dotenv").config({ path: "./config/.env" });

// importing routes
const userRouter = require("./routes/userRouter");
const projectRouter = require("./routes/projectRouter");
const markRouter = require("./routes/markRouter");
const uploadRouter = require("./routes/uploadRouter");
const notificationRouter = require("./routes/notificationRouter");

const app = express();

// Configuring cors
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Make the database connections
dbConnection();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/mark", markRouter);
app.use("/api/v1/upload", uploadRouter);
app.use("/api/v1/notification", notificationRouter);

app.listen(process.env.PORT, () => {
  console.log(`listing on port ${process.env.PORT}`);
});
