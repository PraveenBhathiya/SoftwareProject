const express = require("express");

const {
  addMarks,
  getMarks,
  updateMark,
  deleteMark,
  getAllMarksForGivenProjectIdForGivenUser,
  getAllMarksForGivenProjectId,
  addMarksFromExcelSheet,
} = require("../controllers/markController");
const markRouter = express.Router();

// Role base REST apis
const verifyToken = require("../middlewares/varifyJwtToken");
const checkRole = require("../middlewares/roleVerification");

markRouter.post("/create", addMarks);
markRouter.post("/get", getMarks);
markRouter.post("/update", updateMark);
markRouter.post("/delete", deleteMark);
markRouter.post("/getAllMarks", getAllMarksForGivenProjectIdForGivenUser);
markRouter.post("/getAllMarksForProject", getAllMarksForGivenProjectId);
markRouter.post("/addMarksFromexcel", addMarksFromExcelSheet);

module.exports = markRouter;
