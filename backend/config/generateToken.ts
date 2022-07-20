const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (id: number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export default generateToken;
