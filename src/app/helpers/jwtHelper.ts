import jwt, { Secret } from "jsonwebtoken";

// Generate Token
const generateToken = (payload: any, secret: string, expireTime: string) => {
  const token = jwt.sign(
    {
      email: payload.email,
      role: payload.role,
    },
    secret,
    {
      algorithm: "HS256",
      expiresIn: expireTime,
    }
  );
  return token;
};

// Verify Token
const verifyToken = (token: string, secret: Secret) => {
  let decoded = jwt.verify(token, secret) as jwt.JwtPayload;
  return decoded;
};
export const jwtHelper = {
  generateToken,
  verifyToken,
};
