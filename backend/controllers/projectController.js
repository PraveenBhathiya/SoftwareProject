const Project = require("../models/projectSchema");

exports.createProject = async function (req, res, next) {
  try {
    const {
      name,
      numberOfMembers,
      emailsOfMembers,
      year,
      department,
      lectureName,
    } = req.body;
    if (!name || !numberOfMembers || !department) {
      return res.status(400).json({
        success: false,
        message: "Provide all project details",
      });
    }

    // Generate the project Id dynamically
    const projectId = `${year}${department}${name}`;

    const newProject = new Project({
      projectId,
      name,
      numberOfMembers,
      year,
      emailsOfMembers,
      department,
      lectureName,
    });

    // Saving the project to database
    const project = await newProject.save();
    res.status(201).json({
      success: true,
      message: "Project successfuly added to database",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in adding project",
    });
  }
};

exports.enrollToProject = async function (req, res, next) {
  try {
    const { projectName, department, studentEmail } = req.body;

    if (!projectName || !department || !studentEmail) {
      return res.status(400).json({
        success: false,
        message: "Provide all relavent details",
      });
    }

    // Find project by name and update it
    const updatedProject = await Project.findOneAndUpdate(
      {
        name: projectName,
        department: department,
      },
      { $push: { emailsOfMembers: { $each: studentEmail } } },
      { new: true, useFindAndModify: false }
    );

    if (!updatedProject) {
      return res.status(400).json({
        success: false,
        message: "No project found for given details",
      });
    }

    // When the inster is success
    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: "Error when entrolling the project",
    });
  }
};

// Delete the project by its name and the department
exports.deleteProject = async function (req, res, next) {
  try {
    const { name, department } = req.body;

    if (!name || !department) {
      return res.status(404).json({
        success: false,
        message: "Fill all the details",
      });
    }

    const result = await Project.deleteOne({
      name: name,
      department: department,
    });

    if (result.deletedCount === 0) {
      console.log("No project found with the specified name.");
      return res.status(404).json({
        success: false,
        message: "Error when entrolling the project",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Project deleted successfully.",
      });
      console.log("Project deleted successfully.");
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: "Error when deleting the project",
    });
  }
};

exports.getAllProject = async function (req, res, next) {
  try {
    // Find the project where the student's email is in the emailsOfMembers array
    const projects = await Project.find();

    if (!projects) {
      return res.status(404).json({
        success: false,
        message: "No project found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project found successfully",
      project: projects,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: "Error when getting the project",
    });
  }
};

exports.getProject = async function (req, res, next) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(404).json({
        success: false,
        message: "Pass email",
      });
    }

    // Find the project where the student's email is in the emailsOfMembers array
    const project = await Project.findOne({
      emailsOfMembers: { $in: [email] },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "No project found for the given email",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project found successfully",
      project: project,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: "Error when deleting the project",
    });
  }
};

exports.getProjectByLectureName = async function (req, res, next) {
  try {
    const { lectureName } = req.body;

    if (!lectureName) {
      return res.status(404).json({
        success: false,
        message: "Pass lecture name",
      });
    }

    // Find the project where the
    const project = await Project.find({
      lectureName: lectureName,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "No project found for given lecture name",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project found successfully",
      project: project,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: "Error when deleting the project",
    });
  }
};

exports.getUserEmailsBtProjectId = async function (req, res, next) {
  try {
    const { projectId } = req.body;

    if (!projectId) {
      return res.status(404).json({
        success: false,
        message: "Pass project id",
      });
    }

    // Find the project where the
    const project = await Project.find({
      projectId: projectId,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "No project found for given project Id",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project found successfully",
      studentEmails: project[0].emailsOfMembers,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: "Error finding the student emails",
    });
  }
};
