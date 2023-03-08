import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { tCreateUser, tUser } from "../../interfaces/users.interfaces";
import { userSchema } from "../../schemas/users.schema";

export const createUserService = async (data: tCreateUser): Promise<tUser> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const user: User = userRepository.create(data);
  await userRepository.save(user);
  const newUser: tUser = userSchema.parse(user);
  return newUser;
};
