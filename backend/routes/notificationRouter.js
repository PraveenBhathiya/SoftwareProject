const express = require("express");
const {
  createNotification,
  deleteNotification,
  updateNotificationDetails,
  getNotificationsByBatch,
  getNotificationsByTeacherEmail,
  getAllNotifications,
} = require("../controllers/notificationController");

const notificationRouter = express.Router();
notificationRouter.post("/create", createNotification);
notificationRouter.post("/delete", deleteNotification);
notificationRouter.post("/update", updateNotificationDetails);
notificationRouter.get("/getNotifications/:batch", getNotificationsByBatch);
notificationRouter.get("/getAllNotifications", getAllNotifications);
notificationRouter.get(
  "/getNotificationsByTeacher/:email",
  getNotificationsByTeacherEmail
);

module.exports = notificationRouter;
