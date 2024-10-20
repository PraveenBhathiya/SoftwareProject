const Upload = require("../models/uploadSchema");

exports.uploadFile = async function (req, res, next) {
  try {
    const { projectId, url, name } = req.body;

    if (!projectId || !url || !name) {
      return res.status(400).json({
        success: false,
        message: "Enter all details",
      });
    }

    const newUpload = new Upload({
      projectId: projectId,
      url: url,
      name: name,
    });

    const result = await newUpload.save();

    res.status(201).json({
      success: true,
      message: "upload is added to the databse",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in creating the upload document in database",
    });
  }
};

exports.getAllFilesFromProjectId = async function (req, res, next) {
  try {
    const { projectId } = req.body;

    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: "Enter all details",
      });
    }

    const result = await Upload.find({
      projectId: projectId,
    });

    if (result) {
      res.status(201).json({
        success: true,
        message: "All uploads",
        files: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in creating the upload document in database",
    });
  }
};

exports.deleteFileFromDb = async function (req, res, next) {
  try {
    const { projectId, name } = req.body;

    if (!projectId || !name) {
      return res.status(400).json({
        success: false,
        message: "Enter all details",
      });
    }

    const result = await Upload.deleteOne({
      projectId: projectId,
      name: name,
    });

    if (result.deletedCount === 0) {
      console.log("No Upload found with the specified project name.");
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
    res.status(500).json({
      success: false,
      message: "Error in creating the upload document in database",
    });
  }
};
