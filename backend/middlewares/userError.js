function ErrorHandler(message, statusCode) {
    Error.call(this, message);
    this.message = message;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
  
  // Inherit from Error
  ErrorHandler.prototype = Object.create(Error.prototype);
  ErrorHandler.prototype.constructor = ErrorHandler;
  
  var errorMiddleware = function (err, req, res, next) {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;
  
    if (err.name === "CastError") {
      var message = "Resource not found. Invalid " + err.path;
      err = new ErrorHandler(message, 400);
    }
  
    if (err.code === 11000) {
      var message = "Duplicate " + Object.keys(err.keyValue) + " Entered";
      err = new ErrorHandler(message, 400);
    }
  
    if (err.name === "JsonWebTokenError") {
      var message = "Json Web Token is invalid, Try again!";
      err = new ErrorHandler(message, 400);
    }
  
    if (err.name === "TokenExpiredError") {
      var message = "Json Web Token is expired, Try again!";
      err = new ErrorHandler(message, 400);
    }
  
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  };
  
  // Export the ErrorHandler and middleware
  module.exports = {
    ErrorHandler: ErrorHandler,
    errorMiddleware: errorMiddleware,
  };
  