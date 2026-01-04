import { createTransactionService } from "../services/transaction.service.js";

export const createTransactionController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { payment_method, data } = req.body;
    console.log(req.body);
    console.log(data);
    console.log(req.user);

    if (!Array.isArray(data)) {
      return res.status(400).json({
        success: false,
        message: "Data item tidak valid",
      });
    }

    const result = await createTransactionService(payment_method, data, userId);

    return res
      .status(result.statusCode)
      .json({ success: result.success, message: result.message });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
