const joi = require("joi");
const mongoose = require("mongoose");
let validator = require("validator");

const projectSchema = mongoose.Schema({
  projectId: {
    type: String,
    required: [true, "Enter valid project Id"],
  },
  name: {
    type: String,
    required: [true, "Enter the project name"],
    minLength: [5, "Project must have minimum 5 characters"],
  },
  numberOfMembers: {
    type: Number,
    required: [true, "Enter the number of team members"],
  },
  year: {
    type: Number,
    required: [true, "Enter year of the project"],
  },
  emailsOfMembers: {
    type: [{ type: String }],
  },
  department: {
    type: String,
    required: [true, "Enter the department name"],
    minLength: [5, "Department name must have minimum 5 characters"],
  },
  // This can be assign in later stages
  lectureName: {
    type: String,
    minLength: [5, "Department name must have minimum 5 characters"],
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
