import pool from "../db/database.js";
import uploadFile from "../utils/cloudinary.js";
import { createProductSchema } from "../validations/product.validation.js";

export const createProductService = async (request, file) => {
  try {
    // validasi input user
    const { value, error } = createProductSchema.validate(request);

    // kirim pesan error, jika validasi salah
    if (error) {
      return {
        success: false,
        statusCode: 400,
        message: error.details.map((err) => err.message),
      };
    }
    // variabel untuk menyimpan parameter file (gambar)
    const image = file;

    // desctructuring input user
    const { name, price, stock } = value;

    // validasi jika gambar tidak ada
    if (!image) {
      return {
        success: false,
        statusCode: 400,
        message: "Gambar tidak ditemukan!",
      };
    }

    // variabel untuk menyimpan hasil upload gambar ke cloudinary
    const uploadResult = await uploadFile(image.buffer);

    // query untuk menambahkan product ke database
    const sql =
      "INSERT INTO products (name, price, stock, image_url) VALUES (?, ?, ?, ?);";

    // eksekusi query
    await pool.query(sql, [name, price, stock, uploadResult.secure_url]);

    // kirim respon ke controller
    return {
      success: true,
      statusCode: 201,
      message: "Product berhasil ditambahkan",
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: `Terjadi kesalahan server`,
    };
  }
};
