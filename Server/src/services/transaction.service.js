import pool from "../db/database.js";

export const createTransactionService = async (items) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

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
        "INSERT INTO transaction_items (transactionn_id, product_id, quantity, price, subtotal) VALUES (?, ?, ?, ?)",
        [trxId, item.product_id, item.price, item.quantity, item.subtotal]
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
