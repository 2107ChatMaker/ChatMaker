import jwt from "jsonwebtoken";

export function generateToken(seed: string): string {
  return jwt.sign({ seed }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET);
}