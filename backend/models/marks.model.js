//marks_model.js


import mongoose from 'mongoose';
const marksSchema = new mongoose.Schema(
  {
    regNo: { type: String,  required: true,},
    username: { type: String, required: true,},

    proposal_presentationMark: { type: Number, required: true,},
    proposal_vivaMark: { type: Number, required: true,},
    proposal_contributionMark: { type: Number, required: true,},

    progress_presentationMark: { type: Number, required: true,},
    progress_vivaMark: { type: Number, required: true,},
    progress_contributionMark: { type: Number, required: true,},

    final_presentationMark: { type: Number, required: true,},
    final_vivaMark: { type: Number, required: true,},
    final_contributionMark: { type: Number, required: true,},
    
  },
  {
    timestamps: true,
  }
);

const Marks = mongoose.model("Marks", marksSchema);
//const Student = mongoose.model("Student", studentSchema);

export{Marks};