import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  jwt_secret: process.env.JWT_SECRET,
  jwt_expries_in: process.env.EXPRIES_IN,
  refresh_jwt_secret: process.env.REFRESH_JWT_SECRET,
  refresh_jwt_secret_expries_in: process.env.REFRESH_JWT_SECRET_EXPRIES_IN,
};
