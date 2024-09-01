//marks_model.js


import mongoose from 'mongoose';
const marksSchema = new mongoose.Schema(
  {
    regNo: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    presentationMark: {
      type: Number,
      required: true,
    },
    vivaMark: {
      type: Number,
      required: true,
    },
    contributionMark: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Marks = mongoose.model("Marks", marksSchema);
//const Student = mongoose.model("Student", studentSchema);

export{Marks};