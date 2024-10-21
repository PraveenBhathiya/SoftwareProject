const express = require("express");
const {
  register,
  login,
  getAllLectures,
  getAllStudents,
  registerTeacher,
  changePassword,
  getUserDetailsByEmail,
  updateProfilePicure,
  updateEditProfile,
  getExcelFormat,
} = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/getAllLectures", getAllLectures);
userRouter.get("/getAllStudents", getAllStudents);
userRouter.post("/registerTeacher", registerTeacher);
userRouter.post("/changePassword", changePassword);
userRouter.post("/getUserByEmail", getUserDetailsByEmail);
userRouter.post("/updateProfilePicture", updateProfilePicure);
userRouter.post("/updateUserByEditProfile", updateEditProfile);
userRouter.get("/getExcelFormat", getExcelFormat);

module.exports = userRouter;
