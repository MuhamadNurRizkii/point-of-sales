import { getDataService } from "../services/dashboard.service.js";

export const getDataController = async (req, res) => {
  try {
    const result = await getDataService();

    console.log(result);

    return res
      .status(result.statusCode)
      .json({ message: result.message, payload: result.payload });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Terjadi kesalahan server!" });
  }
};
