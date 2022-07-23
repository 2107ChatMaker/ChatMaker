import jwt from "jsonwebtoken";

//generate a jwt
export function generateToken(seed: string): string {
  return jwt.sign({ seed }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

//validate a jwt
export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET);
}