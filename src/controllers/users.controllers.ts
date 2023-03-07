import { Request, Response } from "express";
import {
  tCreateUser,
  tUser,
  tUserArray,
  tUserUpdate,
} from "../interfaces/users.interfaces";
import { createUserService } from "../services/users/createUser.service";
import { softDeleteUserService } from "../services/users/deleteUser.service";
import { listAllUsersService } from "../services/users/listAllUsers.service";
import { updateUserService } from "../services/users/updateUser.service";

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const requestData: tCreateUser = req.body;

  const newUser = await createUserService(requestData);

  return res.status(201).json(newUser);
};

export const listAllUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const readUsers: tUserArray = await listAllUsersService();
  return res.status(200).json(readUsers);
};

export const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data: tUserUpdate = req.body;
  const id: number = Number(req.params.id);
  const newUser = await updateUserService(id, data);

  return res.status(200).json(newUser);
};

export const softDeleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const idParams = Number(req.params.id);
  await softDeleteUserService(idParams);

  return res.status(204).json();
};
