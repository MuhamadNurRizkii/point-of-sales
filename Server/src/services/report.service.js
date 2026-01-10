import pool from "../db/database.js";

export const getDataReportService = async (year, month) => {
  try {
    const now = new Date();

    const currentYear = year ?? now.getFullYear();
    const currentMonth = month ?? String(now.getMonth() + 1).padStart(2, "0");

    const startDate = `${currentYear}-${currentMonth}-01`;
    const endDate = `${currentYear}-${currentMonth}-31 23:59:59`;

    const [rows] = await pool.query(
      `
        SELECT
        SUM(ti.subtotal) AS total_pendapatan,
        COUNT(DISTINCT t.id) AS total_transaksi,
        SUM(ti.quantity) AS total_produk,
        SUM(ti.subtotal) / COUNT (DISTINCT t.id) AS avg_transaksi
        FROM transactions t
        JOIN transaction_items ti ON t.id = ti.transaction_id
        WHERE t.created_at BETWEEN ? AND ?
        `,
      [startDate, endDate]
    );

    return {
      success: true,
      statusCode: 200,
      payload: {
        total_pendapatan: Number(rows[0].total_pendapatan),
        total_transaksi: Number(rows[0].total_transaksi),
        total_produk: Number(rows[0].total_produk),
        avg_transaksi: parseFloat(rows[0].avg_transaksi),
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

export const chartReportService = async () => {
  try {
    const [report] = await pool.query(`SELECT
  DATE(t.created_at) AS tanggal,
  SUM(ti.subtotal) AS total_pendapatan
FROM transactions t
JOIN transaction_items ti ON t.id = ti.transaction_id
WHERE t.created_at >= CURDATE() - INTERVAL 6 DAY
GROUP BY DATE(t.created_at)
ORDER BY tanggal ASC;
`);

    return {
      success: true,
      statusCode: 200,
      payload: report,
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: error.message,
    };
  }
};
