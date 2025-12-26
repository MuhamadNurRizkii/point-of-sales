import pool from "../db/database.js";
import { uploadFile, deleteFile } from "../utils/cloudinary.js";
import {
  createProductSchema,
  editProductSchema,
} from "../validations/product.validation.js";

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

export const editProductByIdService = async (request, file, id) => {
  // 1. Validasi Input di awal
  const { value, error } = editProductSchema.validate(request);
  if (error) {
    return {
      success: false,
      statusCode: 400,
      message: error.details.map((err) => err.message),
    };
  }

  const { name, price, stock, category } = value;

  // Gunakan connection dari pool untuk Transaction
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // 2. Cek eksistensi produk
    const [existing] = await connection.query(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );
    if (existing.length === 0) {
      return {
        success: false,
        statusCode: 404,
        message: "Product tidak ditemukan!",
      };
    }

    const oldPublicId = existing[0].public_id;
    let updateFields = [name, price, stock, category];
    let query =
      "UPDATE products SET name = ?, price = ?, stock = ?, category = ?";

    // 3. Logika Gambar (Opsional: Hanya upload jika ada file baru)
    if (file) {
      const uploadResult = await uploadFile(file.buffer);
      query += ", public_id = ?, image_url = ?";
      updateFields.push(uploadResult.public_id, uploadResult.secure_url);
    }

    query += " WHERE id = ?";
    updateFields.push(id);

    // 4. Update Database
    await connection.query(query, updateFields);

    // 5. Commit Transaksi
    await connection.commit();

    // 6. Hapus file lama di Cloudinary SETELAH DB sukses (Cleanup)
    if (file && oldPublicId) {
      // Tidak perlu await jika tidak ingin menghambat response user,
      // tapi disarankan await agar folder Cloudinary tetap bersih.
      await deleteFile(oldPublicId).catch((err) =>
        console.error("Cloudinary Cleanup Error:", err)
      );
    }

    return {
      success: true,
      statusCode: 200,
      message: "Product berhasil diperbarui!",
    };
  } catch (error) {
    await connection.rollback(); // Batalkan perubahan DB jika ada error
    return {
      success: false,
      statusCode: 500,
      message: `Server Error: ${error.message}`,
    };
  } finally {
    connection.release(); // Kembalikan koneksi ke pool
  }
};
