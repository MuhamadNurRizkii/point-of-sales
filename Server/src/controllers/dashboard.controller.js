import { getDataService } from "../services/dashboard.service.js";

export const getDataController = async (req, res) => {
  try {
    const result = await getDataService();

    return res.status(result.statusCode).json({
      success: result.success,
      message: result.message,
      dataTransaction: result.dataTransaction,
      productPopuler: result.productPopuler,
      payload: result.payload,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Terjadi kesalahan server!" });
  }
};
