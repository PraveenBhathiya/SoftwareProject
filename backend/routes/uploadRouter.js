const express = require("express");
const {
  uploadFile,
  deleteFileFromDb,
  getAllFilesFromProjectId,
} = require("../controllers/uploadController");

const uploadRoter = express.Router();

uploadRoter.post("/upload", uploadFile);
uploadRoter.post("/delete", deleteFileFromDb);
uploadRoter.post("/getUploadsByProjectId", getAllFilesFromProjectId);

module.exports = uploadRoter;
