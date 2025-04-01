
const passport = require('passport');

// Authentication middleware
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
};

// Role-based access control middleware
const hasRole = (roles) => {
  return (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    if (roles.includes(req.user.role)) {
      return next();
    }
    return res.status(403).json({ message: 'Forbidden' });
  };
};

module.exports = {
  isAuthenticated,
  hasRole
};
