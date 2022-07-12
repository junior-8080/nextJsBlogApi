import jwt from "jsonwebtoken";
import * as api from "./api.js";

export const authorize = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  try {
    let verifiedTokenPayload = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = verifiedTokenPayload;
    next();
  } catch (error) {
    let payload = {
      code: "UNAUTHORIZED",
      message: "Invalid Token",
    };
    return api.serverErrors(res, payload);
  }
};
