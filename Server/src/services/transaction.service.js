import pool from "../db/database.js";

export const createTransactionService = async (
  paymentMethod,
  items,
  userId
) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    console.log(items);

    let total = 0;
    const detailItems = [];

    for (const item of items) {
      const [[product]] = await conn.query(
        "SELECT id, price, stock FROM products WHERE id = ? FOR UPDATE",
        [item.id]
      );

      if (!product) {
        return {
          success: false,
          statusCode: 404,
          message: "Product tidak ditemukan!",
        };
      }

      if (product.stock < item.qty) {
        return {
          success: false,
          statusCode: 400,
          message: "Stok tidak cukup!",
        };
      }

      const subtotal = product.price * item.qty;
      total += subtotal;

      detailItems.push({
        product_id: product.id,
        price: product.price,
        quantity: item.qty,
        subtotal,
      });
    }

    const [trxResult] = await conn.query(
      "INSERT INTO transactions (user_id, total_amount, payment_method) VALUES (?, ?, ?)",
      [userId, total, paymentMethod]
    );

    const trxId = trxResult.insertId;

    for (const item of detailItems) {
      await conn.query(
        "INSERT INTO transaction_items (transaction_id, product_id, quantity, price, subtotal) VALUES (?, ?, ?, ?, ?)",
        [trxId, item.product_id, item.quantity, item.price, item.subtotal]
      );

      await conn.query("UPDATE products SET stock = stock - ? WHERE id = ?", [
        item.quantity,
        item.product_id,
      ]);
    }

    await conn.commit();

    return {
      success: true,
      statusCode: 200,
      message: "Transaksi berhasil",
    };
  } catch (error) {
    await conn.rollback();

    return {
      success: false,
      statusCode: 500,
      message: "Terjadi kesalahan server",
    };
  }
};

export const getAllTransactionService = async () => {
  try {
    const [dataTransaction] = await pool.query(`SELECT 
  t.id,
  date(t.created_at) as date,
  u.nama_depan,
  u.nama_belakang,
  t.payment_method,
  SUM(ti.quantity) AS qty,
  SUM(ti.subtotal) AS total
FROM users u
JOIN transactions t ON u.id = t.user_id
JOIN transaction_items ti ON t.id = ti.transaction_id
GROUP BY 
  t.id,
  t.created_at,
  u.nama_depan,
  u.nama_belakang,
  t.payment_method
ORDER BY t.created_at DESC;`);

    const [reportTransaction] = await pool.query(`SELECT 
  COUNT(DISTINCT t.id) AS total_transaksi,
  SUM(ti.subtotal) AS total_pendapatan
  FROM transactions t
  JOIN transaction_items ti ON t.id = ti.transaction_id
  WHERE DATE(t.created_at) = CURDATE();;`);

    if (dataTransaction.length === 0) {
      return {
        success: false,
        statusCode: 404,
        message: "Data tidak ditemukan!",
      };
    }

    if (reportTransaction.length === 0) {
      return {
        success: false,
        statusCode: 404,
        message: "Data tidak ditemukan!",
      };
    }

    return {
      success: true,
      statusCode: 200,
      payload: {
        dataTransaction: dataTransaction,
        reportTransaction: reportTransaction,
      },
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: "Terjadi kesalahan server",
    };
  }
};
