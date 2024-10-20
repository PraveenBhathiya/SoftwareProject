exports.sendToken = function (user, statusCode, res, message) {
  const token = user.generateJWTToken();
  const expiresIn = parseInt(process.env.JWT_EXPIRES);

  const options = {
    expires: new Date(Date.now() + expiresIn * 1000), // Convert seconds to milliseconds
    httpOnly: true, // Set httpOnly to true
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};
