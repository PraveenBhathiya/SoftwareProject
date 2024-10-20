const mongoose = require("mongoose");

const uploadschema = mongoose.Schema({
  projectId: {
    type: String,
    required: [true, "Enter valid project Id"],
  },
  url: {
    type: String,
    required: [true, "Upload url is required"],
    minLength: [5, "Upload url must have minimum 5 characters"],
  },
  name: {
    type: String,
    required: [true, "File name is required"],
  },
});

const Upload = mongoose.model("Upload", uploadschema);

module.exports = Upload;
