import jwt from "jsonwebtoken";

export default async function generateToken(payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
  return token;
}
