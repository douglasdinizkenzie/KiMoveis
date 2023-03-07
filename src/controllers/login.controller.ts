import { Request, Response } from "express";
import { tLogin } from "../interfaces/login.interfaces";
import { loginService } from "../services/login/login.service";

export const loginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data: tLogin = req.body;
  const token: string = await loginService(data);
  return res.status(200).json({
    token: token,
  });
};
