import pool from "../db/database.js";

export const getDataService = async () => {
  try {
    const [report] = await pool.query(`
        select
        sum(quantity) as 'produk_terjual',
        count(distinct transaction_id) as 'total_transaksi',
        sum(subtotal) as 'pendapatan'
        from transaction_items where date(created_at) = curdate();
        `);

    const [dataTransaction] = await pool.query(`SELECT 
  t.id,
  date(t.created_at) as date,
  u.nama_depan,
  u.nama_belakang,
  t.payment_method,
  SUM(ti.subtotal) AS total
FROM users u
JOIN transactions t ON u.id = t.user_id
JOIN transaction_items ti ON t.id = ti.transaction_id
WHERE DATE(t.created_at) = CURDATE()
GROUP BY 
  t.id,
  t.created_at,
  u.nama_depan,
  u.nama_belakang,
  t.payment_method
ORDER BY t.created_at DESC
LIMIT 5;`);

    return {
      success: true,
      statusCode: 200,
      message: "Data berhasil diambil",
      dataTransaction,
      payload: {
        produk_terjual: Number(report[0].produk_terjual),
        total_transaksi: Number(report[0].total_transaksi),
        pendapatan: Number(report[0].pendapatan),
      },
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: error.message,
    };
  }
};
