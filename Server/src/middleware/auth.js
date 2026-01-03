import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Akses ditolak, token tidak ditemukan atau format salah",
      });
    }

    const token = authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ success: false, message: "Token sudah kadaluarsa" });
    }

    return res.status(401).json({
      success: false,
      message: "Token tidak valid",
    });
  }
};
