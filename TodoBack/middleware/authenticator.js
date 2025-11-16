const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticatorToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ status: "error", message: "Token no Proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ status: "error", message: "Token no válido" });
  }
};
module.exports = { authenticatorToken };
