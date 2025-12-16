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

    const sql = "SELECT * FROM users where username = ?";

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

const registerService = async (request) => {
  try {
    // validasi data input dari user
    const { value, error } = registerSchema.validate(request);

    if (error) {
      res.status(400).json({
        success: false,
        message: error.details.map((detail) => detail.message),
      });
      return;
    }

    const { nama_depan, nama_belakang, username, password } = value;
    // cek apakah username sudah ada di db?
    const sql = "SELECT * FROM users WHERE username = ?";
    const [user] = await pool.query(sql, [username]);

    // jika ada kembalikan error 400
    if (user) {
      res.status(400).json({
        success: false,
        message: error.details.map((detail) => detail.message),
      });
      return;
    }

    // jika tidak, hashing password
    const hashPassword = await bcrypt.hash(password, 10);

    // masukkan data baru ke db
    const newDataUser =
      "INSERT INTO users (nama_depan, nama_belakang, username, password) VALUES (?, ?, ?, ?)";

    await pool.query(newDataUser, [
      nama_belakang,
      nama_belakang,
      username,
      hashPassword,
    ]);

    return res
      .status(201)
      .json({ success: true, message: "Register berhasil" });
  } catch (error) {
    console.log("Terjadi kesalahan: ", error);
  }
};

export { loginService, registerService };
