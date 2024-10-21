const Project = require("../models/projectSchema");

exports.getProjectForExcel = async function (email) {
  try {
    // Find the project where the student's email is in the emailsOfMembers array
    const project = await Project.findOne({
      emailsOfMembers: { $in: [email] },
    });

    if (!project) {
      return null;
    }

    return project;
  } catch (error) {
    console.log(error);
    return null;
  }
};
