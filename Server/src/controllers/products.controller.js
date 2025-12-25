import {
  createProductService,
  getAllProductsService,
  getProductByIdService,
} from "../services/products.service.js";

export const addProductController = async (req, res) => {
  try {
    // destructuring input user
    const { name, price, stock, category } = req.body;

    // variabel untuk menyimpan hasil createProduct
    const result = await createProductService(
      { name, price: Number(price), stock: Number(stock), category },
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

export const getAllProducts = async (req, res) => {
  try {
    const result = await getAllProductsService(req.query.page, req.query.limit);
    res.status(result.statusCode).json({
      success: result.statusCode,
      message: result.message,
      paging: result.paging,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const result = await getProductByIdService(req.params.id);

    res.status(result.statusCode).json({
      success: result.success,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
