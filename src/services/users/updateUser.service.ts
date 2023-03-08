import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { tUser, tUserUpdate } from "../../interfaces/users.interfaces";
import { userSchema } from "../../schemas/users.schema";

export const updateUserService = async (
  idParams: number,
  data: tUserUpdate
): Promise<tUser> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const OldUser: User | null = await userRepository.findOne({
    where: {
      id: idParams,
    },
  });

  const updateUser: User = userRepository.create({
    ...OldUser,
    ...data,
  });

  await userRepository.save(updateUser);
  const newUser: tUser = userSchema.parse(updateUser);
  return newUser;
};
