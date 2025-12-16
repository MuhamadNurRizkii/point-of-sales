import { loginService, registerService } from "../services/public.service.js";

export const loginController = async (req, res) => {
  try {
    const result = await loginService(req.body);

    console.log(result);
  } catch (error) {}
};

export const registerController = async (req, res) => {
  try {
    const result = await registerService(req.body);
    console.log(result);

    res
      .status(result.statusCode)
      .json({ success: result.success, message: result.message });
  } catch (error) {}
};
