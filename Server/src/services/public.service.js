import {
  loginSchema,
  registerSchema,
} from "../validations/public.validation.js";
import pool from "../db/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginService = async (request) => {
  try {
    // validasi input dari user
    const { value, error } = loginSchema.validate(request);

    // cek jika terjadi error
    if (error) {
      return {
        success: false,
        statusCode: 400,
        message: error.details.map((detail) => detail.message),
      };
    }

    // destructuring input user
    const { username, password } = value;

    // query untuk mengambil data id, username, dan password berdasarkan input username user
    const sql = "SELECT id, username, password FROM users WHERE username = ?";

    // hasil query database
    const [isUsername] = await pool.query(sql, [username]);

    // jika username tida ditemukan
    if (isUsername.length === 0) {
      return {
        success: false,
        statusCode: 400,
        message: "username atau password salah!",
      };
    }

    // bandingkan password
    const comparePassword = await bcrypt.compare(
      password,
      isUsername[0].password
    );

    // jika password tidak sama
    if (!comparePassword) {
      return {
        success: false,
        statusCode: 400,
        message: "username atau password salah!",
      };
    }

    // bikin token
    const accessToken = jwt.sign(
      { id: isUsername[0].id, username: isUsername[0].username },
      process.env.ACCESS_TOKEN,
      { expiresIn: "7d" }
    );

    // kembalikan hasilnya jika semua proses berhasil
    return {
      success: true,
      statusCode: 200,
      message: "login berhasil",
      token: accessToken,
    };
  } catch (error) {
    // kembalikan pesan error jika terjadi error
    return {
      success: false,
      statusCode: 500,
      message: `Terjadi kesalahan server`,
    };
  }
};

const registerService = async (request) => {
  try {
    // validasi data input dari user
    const { value, error } = registerSchema.validate(request, {
      abortEarly: false,
    });

    if (error) {
      return {
        success: false,
        satusCode: 400,
        message: error.details.map((detail) => detail.message),
      };
    }

    const { nama_depan, nama_belakang, username, password } = value;
    // cek apakah username sudah ada di db?
    const sql = "SELECT * FROM users WHERE username = ?";
    const [user] = await pool.query(sql, [username]);

    // jika ada kembalikan error 400
    if (user.length > 0) {
      return {
        success: false,
        statusCode: 400,
        message: "Username sudah digunakan!",
      };
    }

    // jika tidak, hashing password
    const hashPassword = await bcrypt.hash(password, 10);

    // masukkan data baru ke db
    const newDataUser =
      "INSERT INTO users (nama_depan, nama_belakang, username, password) VALUES (?, ?, ?, ?)";

    await pool.query(newDataUser, [
      nama_depan,
      nama_belakang,
      username,
      hashPassword,
    ]);

    return { success: true, statusCode: 201, message: "Register berhasil" };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: `Terjadi kesalahan server`,
    };
  }
};

export { loginService, registerService };
