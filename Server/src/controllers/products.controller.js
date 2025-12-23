import { createProductService } from "../services/products.service.js";

export const addProductController = async (req, res) => {
  try {
    // destructuring input user
    const { name, price, stock } = req.body;

    // variabel untuk menyimpan hasil createProduct
    const result = await createProductService(
      { name, price: Number(price), stock: Number(stock) },
      req.file
    );
    console.log(result);

    // kirim response ke client
    res
      .status(result.statusCode)
      .json({ success: result.success, message: result.message });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
