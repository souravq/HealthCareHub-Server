import jwt from "jsonwebtoken";

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
export default generateToken;
