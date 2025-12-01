import jwt from "jsonwebtoken";

export const validateToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  const token = cookies.split("=")[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (e) {
    throw Error("Invalid token");
  }
};
