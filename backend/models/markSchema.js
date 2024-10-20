const mongoose = require("mongoose");

const markSchema = mongoose.Schema({
  value: {
    type: Number,
    required: [true, "Enter valid mark value"],
  },
  userEmail: {
    type: String,
  },
  assignmentId: {
    type: String, // EE202001 - format (department year assignmentNumber)
    required: [true, "Enter the project name"],
    minLength: [3, "Assingment Id must have minimum 5 characters"],
  },
  projectId: {
    type: String, // format - {year}${department}${name}
    required: [true, "Enter valid projhect name"],
  },
  criteria: [
    {
      criteria: { type: String, required: true },
      marks: { type: Number, required: true },
    },
  ],
});

const Mark = mongoose.model("Mark", markSchema);

module.exports = Mark;
