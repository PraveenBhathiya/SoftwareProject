const express = require("express");
const {
  createProject,
  enrollToProject,
  deleteProject,
  getProject,
  getProjectByLectureName,
  getUserEmailsBtProjectId,
  getAllProject,
} = require("../controllers/projectController");
const porjectRouter = express.Router();
const verifyToken = require("../middlewares/varifyJwtToken");
const checkRole = require("../middlewares/roleVerification");

porjectRouter.post("/create", createProject);
porjectRouter.post("/enroll", enrollToProject);
porjectRouter.post("/delete", deleteProject);
porjectRouter.post("/get", getProject);
porjectRouter.post("/getProjectByLectureName", getProjectByLectureName);
porjectRouter.post("/getUserEmialsByProjectId", getUserEmailsBtProjectId);
porjectRouter.get("/getAllProjects", getAllProject);
// porjectRouter.get("/get", [verifyToken, checkRole("TEACHER")], createProject);

module.exports = porjectRouter;
