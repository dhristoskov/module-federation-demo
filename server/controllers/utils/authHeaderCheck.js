import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ERROR_MESSAGE = "Not authenticated.";

const authHeaderCheck = (req, res) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    res.status(401).json({ message: ERROR_MESSAGE });
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: ERROR_MESSAGE});
    return;
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    res.status(401).json({ message: ERROR_MESSAGE});
    return;
  }

  const userId = decodedToken.userId;

  return userId;
};

export default authHeaderCheck;
