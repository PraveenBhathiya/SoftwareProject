const jwt = require("jsonwebtoken");

// Middleware to verify the JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]; // Assuming the token is sent in the Authorization header
  if (!token) {
    return res.status(403).send("No token provided");
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).send("Failed to authenticate token");
    }

    // If token is valid, attach decoded token (id, role) to the request object
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

module.exports = verifyToken;
