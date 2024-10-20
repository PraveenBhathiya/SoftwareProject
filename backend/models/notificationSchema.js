const joi = require("joi");
const mongoose = require("mongoose");
let validator = require("validator");

const notificationSchema = mongoose.Schema({
  title: {
    type: String,
    unique: true, // Notification title is unique
    required: [true, "Enter valid notification title"],
  },
  batch: {
    type: Number,
    required: [true, "Enter a vaild batch"],
  },
  description: {
    type: String,
    required: [true, "Enter a vaild description"],
  },
  time: {
    type: String,
    required: [true, "Enter a vaild time"],
  },
  // This can be assign in later stages
  userEmail: {
    type: String,
    required: [true, "Enter a vaild email"],
  },
  role: {
    type: String,
    required: [true, "Enter a vaild role"],
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
