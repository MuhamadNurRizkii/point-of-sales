import pool from "../db/database.js";

export const getDataService = async () => {
  try {
    const [report] = await pool.query(`
        select
        sum(quantity) as 'produk_terjual',
        count(distinct transaction_id) as 'total_transaksi',
        sum(subtotal) as 'pendapatan'
        from transaction_items where month(created_at) = month(current_date()) and year(created_at) = year(current_date());
        `);

    return {
      success: true,
      statusCode: 200,
      message: "Data berhasil diambil",
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
