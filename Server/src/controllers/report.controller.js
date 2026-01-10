import { getDataReportService } from "../services/report.service.js";

export const getDataReportController = async (req, res) => {
  try {
    const { year, month } = req.query;

    const result = await getDataReportService(year, month);

    return res.status(result.statusCode).json({
      success: result.success,
      message: result.message,
      period: `${year ?? "current"}-${month ?? "month"}`,
      payload: result.payload,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Terjadi kesalahan server!" });
  }
};
