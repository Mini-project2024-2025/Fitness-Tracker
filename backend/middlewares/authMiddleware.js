const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get the token from cookies
  const token = req.cookies.token; 

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token using the secret stored in .env or directly
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Use your JWT secret here
    req.user = decoded.userId;  // Attach user ID to the request object
    next();  // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
