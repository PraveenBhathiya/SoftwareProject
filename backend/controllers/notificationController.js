const Notification = require("../models/notificationSchema");

exports.createNotification = async function (req, res, next) {
  try {
    const { title, batch, description, time, userEmail, role } = req.body;

    if (!title || !batch || !description || !time || !userEmail || !role) {
      return res.status(400).json({
        success: false,
        message: "Provide all notification details to create notification",
      });
    }

    const notification = await Notification.findOne({ title: title });

    if (notification) {
      return res.status(400).json({
        success: false,
        message: "Notification exists",
      });
    }

    const newNotification = new Notification({
      title: title,
      batch: batch,
      description: description,
      userEmail: userEmail,
      time: time,
      role: role,
    });

    const result = await newNotification.save();
    res.status(201).json({
      success: true,
      message: "Mark is successfuly added to database",
      notificartion: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Eror in adding the mark",
    });
  }
};

exports.deleteNotification = async function (req, res, next) {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Provide all notification details to delete notification",
      });
    }

    const result = await Notification.deleteOne({
      title: title,
    });

    if (result.deletedCount === 0) {
      console.log("No notification found with the specified details.");
      return res.status(404).json({
        success: false,
        message: "No notification found with the specified details.",
      });
    } else {
      console.log("Notification deleted successfully.");
      return res.status(200).json({
        success: true,
        message: "Notification deleted successfully.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(200).json({
      success: true,
      message: "Error happens in deleting Notification.",
    });
  }
};

exports.updateNotificationDetails = async function (req, res, next) {
  try {
    const { title, batch, userEmail, description, time } = req.body;

    if (!title || !userEmail) {
      return res.status(400).json({
        success: false,
        message: "Enter all details to get update notification",
      });
    }

    const notification = await Notification.findOneAndUpdate(
      {
        title: title,
      },
      {
        batch: batch,
        description: description,
        time: time,
      },
      { new: true, useFindAndModify: false }
    );

    if (!notification) {
      return res.status(400).json({
        success: false,
        message: "Wanted notification is not exits in the database",
      });
    }

    res.status(201).json({
      success: true,
      message: "notification is successfuly updated",
      notification: notification,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error in updating notification",
    });
  }
};

exports.getNotificationsByBatch = async function (req, res, next) {
  try {
    const { batch } = req.params;

    if (!batch) {
      return res.status(404).json({
        success: false,
        message: "Batch is required",
      });
    }

    // Find the project where the
    const notifications = await Notification.find({
      batch: batch,
    });

    if (!notifications) {
      return res.status(404).json({
        success: false,
        message: "No notifications found for given batch",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notifications found successfully",
      notifications: notifications,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error when finding notifications",
    });
  }
};

exports.getNotificationsByTeacherEmail = async function (req, res, next) {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(404).json({
        success: false,
        message: "teacher email is required",
      });
    }

    // Find the project where the
    const notifications = await Notification.find({
      userEmail: email,
    });

    if (!notifications) {
      return res.status(404).json({
        success: false,
        message: "No notifications found for given teacher",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notifications found successfully",
      notifications: notifications,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error when finding notifications",
    });
  }
};

exports.getAllNotifications = async function (req, res, next) {
  try {
    const notifications = await Notification.find();

    if (!notifications) {
      return res.status(404).json({
        success: false,
        message: "No notifications found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notifications found successfully",
      notifications: notifications,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error when finding notifications",
    });
  }
};
