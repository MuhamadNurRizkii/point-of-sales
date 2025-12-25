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
    const { name, price, stock, category } = value;

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

    console.log(uploadResult);

    // query untuk menambahkan product ke database
    const sql =
      "INSERT INTO products (name, price, stock, category, public_id, image_url) VALUES (?, ?, ?, ?, ?, ?);";

    // eksekusi query
    await pool.query(sql, [
      name,
      price,
      stock,
      category,
      uploadResult.public_id,
      uploadResult.secure_url,
    ]);

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

export const getAllProductsService = async (queryPage, queryLimit) => {
  try {
    const page = parseInt(queryPage) || 1;
    const limit = parseInt(queryLimit) || 6;
    const offset = (page - 1) * limit;

    const [countProducts] = await pool.query(
      "SELECT COUNT(*) as total FROM products"
    );
    const totalData = countProducts[0].total;
    const totalPages = Math.ceil(totalData / limit);

    const [result] = await pool.query(
      `SELECT * FROM products LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    return {
      success: true,
      statusCode: 200,
      message: "Data berhasil diambil",
      paging: {
        currentPage: page,
        totalData,
        totalPages,
        data: result,
      },
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: `Terjadi kesalahan server`,
    };
  }
};

export const getProductByIdService = async (id) => {
  try {
    if (!id) {
      return {
        success: false,
        statusCode: 404,
        message: "Id tidak ditemukan!",
      };
    }

    const getProductByIdQuery = "SELECT * FROM products where id = ?";
    const [result] = await pool.query(getProductByIdQuery, [id]);

    if (result.length === 0) {
      return {
        success: true,
        statusCode: 404,
        message: "Product tidak ditemukan",
      };
    }

    return {
      success: true,
      statusCode: 200,
      message: "Data berhasil diambil!",
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: `Terjadi kesalahan server`,
    };
  }
};
