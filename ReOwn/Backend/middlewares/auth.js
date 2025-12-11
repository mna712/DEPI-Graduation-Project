import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(authHeader.split(" ")[1], process.env.JWT_SECRET);
    req.user = {
      _id: decoded.id,
      role: decoded.role
    };

    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};
