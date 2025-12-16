import {
  loginSchema,
  registerSchema,
} from "../validations/public.validation.js";
import pool from "../db/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginService = async (request) => {
  try {
    const { value, error } = loginSchema.validate(request);

    if (error) {
      res.status(400).json({
        success: false,
        message: error.details.map((detail) => detail.message),
      });
      return;
    }

    const { username, password } = value;

    const sql = await pool.query("SELECT * FROM users where username = ?");

    const [isUsername] = await pool.query(sql, [username]);

    if (!isUsername) {
      res
        .status(400)
        .json({ success: false, message: "username atau password salah!" });
      return;
    }

    const comparePassword = await bcrypt.compare(password, isUsername.password);

    if (!comparePassword) {
      res
        .status(400)
        .json({ success: false, message: "username atau password salah!" });
      return;
    }

    const accessToken = jwt.sign(
      { id: isUsername.id },
      process.env.ACCESS_TOKEN,
      { expiresIn: "7d" }
    );

    res.json({ success: true, message: "login berhasil", token: accessToken });
  } catch (error) {
    console.log("Terjadi kesalahan: ", error);
  }
};

export { loginService };
