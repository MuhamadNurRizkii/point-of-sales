import { loginService } from "../services/login.service";

export const loginController = async (req, res) => {
  try {
    const result = await loginService(req.body);

    console.log(result);
  } catch (error) {}
};
