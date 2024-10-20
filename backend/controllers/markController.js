const Mark = require("../models/markSchema");
const Project = require("../models/projectSchema");

exports.addMarks = async function (req, res, next) {
  try {
    const { value, assignmentId, projectId, userEmail, criteria } = req.body;

    if (!value || !assignmentId || !projectId) {
      return res.status(400).json({
        success: false,
        message: "Provide all project details",
      });
    }

    const wantedProject = Project.find({
      projectId: projectId,
    });

    if (!wantedProject) {
      return res.status(400).json({
        success: false,
        message: "Project is not found",
      });
    }

    const newMrak = new Mark({
      value: value,
      assignmentId: assignmentId,
      projectId: projectId,
      userEmail: userEmail,
      criteria: criteria,
    });

    const result = await newMrak.save();
    res.status(201).json({
      success: true,
      message: "Mark is successfuly added to database",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Eror in adding the mark",
    });
  }
};

exports.getMarks = async function (req, res, next) {
  try {
    const { projectId, assignmentId } = req.body;

    if (!projectId || !assignmentId) {
      return res.status(400).json({
        success: false,
        message: "Enter all details to get marks",
      });
    }

    const mark = await Mark.find({
      projectId: projectId,
      assignmentId: assignmentId,
    });

    if (!mark) {
      return res.status(400).json({
        success: false,
        message: "Wanted marks is not exits in the database",
      });
    }

    res.status(201).json({
      success: true,
      message: "Mark found",
      mark: mark,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error in getting marks",
    });
  }
};

exports.updateMark = async function (req, res, next) {
  try {
    const { projectId, assignmentId, updatedMark } = req.body;

    if (!projectId || !assignmentId || !updatedMark) {
      return res.status(400).json({
        success: false,
        message: "Enter all details to get marks",
      });
    }

    const mark = await Mark.findOneAndUpdate(
      {
        projectId: projectId,
        assignmentId: assignmentId,
      },
      {
        value: updatedMark,
      },
      { new: true, useFindAndModify: false }
    );

    if (!mark) {
      return res.status(400).json({
        success: false,
        message: "Wanted marks is not exits in the database",
      });
    }

    res.status(201).json({
      success: true,
      message: "Mark is successfuly update the mark",
      mark: mark,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error in getting marks",
    });
  }
};

exports.deleteMark = async function (req, res, next) {
  try {
    const { projectId, assignmentId } = req.body;

    if (!projectId || !assignmentId) {
      return res.status(400).json({
        success: false,
        message: "Enter all details to get marks",
      });
    }

    const result = await Mark.deleteOne({
      projectId: projectId,
      assignmentId: assignmentId,
    });

    if (result.deletedCount === 0) {
      console.log("No mark found with the specified assugnment.");
      return res.status(404).json({
        success: false,
        message: "Error when Deleting the mark",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Mark deleted successfully.",
      });
      console.log("Project deleted successfully.");
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error in getting marks",
    });
  }
};

exports.getAllMarksForGivenProjectIdForGivenUser = async function (
  req,
  res,
  next
) {
  try {
    const { projectId, userEmail } = req.body;

    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: "Enter all details to get marks",
      });
    }

    const marks = await Mark.find({
      projectId: projectId,
      userEmail: userEmail,
    });

    if (!marks) {
      return res.status(400).json({
        success: false,
        message: "Wanted marks is not exits in the database",
      });
    }

    res.status(201).json({
      success: true,
      message: "Mark found",
      mark: marks,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error in getting marks",
    });
  }
};

exports.getAllMarksForGivenProjectId = async function (req, res, next) {
  try {
    const { projectId } = req.body;

    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: "Enter all details to get marks",
      });
    }

    const marks = await Mark.find({
      projectId: projectId,
    });

    if (!marks) {
      return res.status(400).json({
        success: false,
        message: "Wanted marks is not exits in the database",
      });
    }

    res.status(201).json({
      success: true,
      message: "Mark found",
      mark: marks,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error in getting marks",
    });
  }
};

exports.addMarksFromExcelSheet = async function (req, res, next) {
  try {
    const { results } = req.body;

    for (const mark of results) {
      const newMrak = new Mark({
        value: Number(mark.marks),
        assignmentId: mark.assignmentId,
        projectId: mark.projectId,
        userEmail: mark.studentEmail,
        criteria: [],
      });

      const result = await newMrak.save();
    }

    res.status(201).json({
      success: true,
      message: "Mark is successfuly added to database",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Eror in adding the mark",
    });
  }
};
