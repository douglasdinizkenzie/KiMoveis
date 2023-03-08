import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { tUserArray } from "../../interfaces/users.interfaces";
import { userSchemaArray } from "../../schemas/users.schema";

export const listAllUsersService = async (): Promise<tUserArray> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const users: tUserArray = await userRepository.find();
  const newUsers = userSchemaArray.parse(users);
  return newUsers;
};
