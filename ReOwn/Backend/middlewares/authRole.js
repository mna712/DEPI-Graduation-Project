import { FAIL } from "../utilities/successWords.js";

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        status: 403,
        success: FAIL,
        message: "You are not allowed to access this route",
      });
    }
    next();
  };
};