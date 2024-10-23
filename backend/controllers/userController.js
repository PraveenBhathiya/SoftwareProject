const User = require("../models/userSchema");
const { getProjectForExcel } = require("../utils/getProjects");
const { sendToken } = require("../utils/jwtToken");

exports.register = async function (req, res, next) {
  try {
    const {
      name,
      indexNumber,
      role,
      email,
      phone,
      password,
      profilePictureURL,
      teamIndexNumber,
      batch,
    } = req.body;

    if (
      !name ||
      !indexNumber ||
      !role ||
      !email ||
      !phone ||
      !password ||
      !teamIndexNumber ||
      !batch
    ) {
      return res.status(404).json({
        success: false,
        message: "Fill all the details",
      });
    }

    const isEmail = await User.findOne({ email: email });

    if (isEmail) {
      return res.status(409).json({
        success: false,
        message: "User all ready regitered",
      });
    }

    const newUser = new User({
      name,
      indexNumber,
      role,
      email,
      phone,
      password,
      profilePictureURL,
      teamIndexNumber,
      batch,
    });

    const user = await newUser.save();

    res.status(201).json({
      success: true,
      message: "User Registered!",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: "Error in User Registration",
    });
  }
};

exports.registerTeacher = async function (req, res, next) {
  try {
    const { name, indexNumber, role, email, phone, password } = req.body;

    if (!name || !indexNumber || !role || !email || !phone || !password) {
      return res.status(404).json({
        success: false,
        message: "Fill all the details",
      });
    }

    const isEmail = await User.findOne({ email: email });

    if (isEmail) {
      return res.status(409).json({
        success: false,
        message: "Teacher already regitered",
      });
    }

    const newUser = new User({
      name: name,
      indexNumber: indexNumber,
      role: role,
      email: email,
      phone: phone,
      password: password,
      batch: 2024,
    });

    const user = await newUser.save();

    res.status(201).json({
      success: true,
      message: "Teacher Registered!",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: "Error in Teacher Registration",
    });
  }
};

exports.changePassword = async function (req, res, next) {
  const { email, oldPassword, newPassword } = req.body;
  if (!email || !oldPassword || !newPassword) {
    return res.status(404).json({
      success: false,
      message: "Fill all details",
    });
  }
  try {
    const user = await User.find({
      email: email,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "You are not registered",
      });
    }

    const isMatch = user.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(404).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    user.password = newPassword;
    await user.save();
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Error in changing password",
    });
  }
};

exports.login = async function (req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password.",
      });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email Or Password.",
      });
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email Or Password.",
      });
    }

    sendToken(user, 201, res, "User Logged In!");
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: "Error in Login",
    });
  }
};

exports.getUserDetailsByEmail = async function (req, res, next) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide email",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    } else {
      return res.status(200).json({
        success: true,
        user: user,
        message: "User found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: "Error in finding the user",
    });
  }
};

exports.getAllLectures = async function (req, res, next) {
  try {
    const lectures = await User.find({
      role: "TEACHER",
    });

    if (!lectures) {
      return res.status(400).json({
        success: false,
        message: "No Lectures registered in the portal",
      });
    }

    res.status(201).json({
      success: true,
      message: "Lectures found",
      lectures: lectures,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error in getting lectures",
    });
  }
};

exports.getAllStudents = async function (req, res, next) {
  try {
    const students = await User.find({
      role: "STUDENT",
    });

    if (!students) {
      return res.status(400).json({
        success: false,
        message: "No students registered in the portal",
      });
    }

    res.status(201).json({
      success: true,
      message: "students found",
      students: students,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error in getting students",
    });
  }
};

// This need to implement
exports.getAllStudentsWithGivenLecture = async function (req, res, next) {
  const { lectureName } = req.body;
  if (!lectureName) {
    return res.status(404).json({
      success: false,
      message: "Provide all details",
    });
  }

  try {
    const students = await User.find({
      role: "STUDENT",
    });

    if (!students) {
      return res.status(400).json({
        success: false,
        message: "No students registered in the portal",
      });
    }

    res.status(201).json({
      success: true,
      message: "students found",
      students: students,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error in getting students",
    });
  }
};

exports.updateProfilePicure = async function (req, res, next) {
  const { email, url } = req.body;

  if (!email) {
    return res.status(404).json({
      success: false,
      message: "Fill all details",
    });
  }

  try {
    const user = User.findOne({
      email: email,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exists",
      });
    }

    const response = await User.findOneAndUpdate(
      { email: email },
      { profilePictureURL: url },
      { new: true } // Return the updated document
    );

    if (response) {
      return res.status(201).json({
        success: true,
        message: "Picture updated successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: true,
      message: "Picture updated successfully",
    });
  }
};

exports.updateEditProfile = async function (req, res, next) {
  const { email, name, phone } = req.body;

  if (!email || !name || !phone) {
    return res.status(404).json({
      success: false,
      message: "Fill all details",
    });
  }

  try {
    const user = User.findOne({
      email: email,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exists",
      });
    }

    const response = await User.findOneAndUpdate(
      { email: email },
      { name: name, phone: phone },
      { new: true } // Return the updated document
    );

    if (response) {
      return res.status(201).json({
        success: true,
        message: "Picture updated successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: true,
      message: "Picture updated successfully",
    });
  }
};

exports.getExcelFormat = async function (req, res, next) {
  let result = [];
  try {
    const students = await User.find({
      role: "STUDENT",
    });

    if (!students || students.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No students registered in the portal",
      });
    }

    // Use for...of for async operations
    for (const student of students) {
      const project = await getProjectForExcel(student.email);
      if (project) {
        const wantedObject = {
          studentIndex: student.indexNumber,
          studentName: student.name,
          studentEmail: student.email,
          projectId: project.projectId,
          projectName: project.name,
          year: project.year,
          assignmentId: null,
          marks: null,
        };
        result.push(wantedObject); // Push the result instead of spreading arrays
      }
    }

    res.status(201).json({
      success: true,
      message: "Done", // Corrected string
      result: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error in getting result",
    });
  }
};
