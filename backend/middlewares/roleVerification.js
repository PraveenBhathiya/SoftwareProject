// Middleware to check for specific roles
const checkRole = (requiredRole) => {
    return (req, res, next) => {
      if (req.userRole !== requiredRole) {
        return res.status(403).send("Access denied: You do not have permission");
      }
      next();
    };
  };
  
  module.exports = checkRole;
  