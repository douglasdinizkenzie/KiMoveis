import { compare } from "bcryptjs";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";
import { tLogin } from "../../interfaces/login.interfaces";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const loginService = async (data: tLogin): Promise<string> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const userInfos: User | null = await userRepository.findOne({
    where: {
      email: data.email,
    },
  });

  if (!userInfos) {
    throw new AppError("Invalid credentials", 401);
  }

  const comparePassword: boolean = await compare(
    data.password,
    userInfos.password
  );

  if (!comparePassword) {
    throw new AppError("Invalid credentials", 401);
  }

  const token: string = jwt.sign(
    {
      admin: userInfos.admin,
    },
    String(process.env.SECRET_KEY!),
    {
      expiresIn: process.env.EXPIRES_IN,
      subject: userInfos.id.toString(),
    }
  );

  return token;
};
