import { loginService, registerService } from "../services/public.service.js";

export const loginController = async (req, res) => {
  try {
    const result = await loginService(req.body);

    return res.status(result.statusCode).json({
      success: result.success,
      message: result.message,
      token: result.token,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const registerController = async (req, res) => {
  try {
    const result = await registerService(req.body);

    return res
      .status(result.statusCode)
      .json({ success: result.success, message: result.message });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
