const jwt = require("jsonwebtoken");
require("dotenv").config();
const generateToken = (id: string, role: String, status: String) => {
    return jwt.sign({ _id: id, role, status }, process.env.JWT_SECRET, {
        expiresIn: "6h",
    });
};

const generateRefreshToken = (id: string) => {
    return jwt.sign({ _id: id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

export { generateToken, generateRefreshToken };
