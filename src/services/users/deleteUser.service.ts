import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";

export const softDeleteUserService = async (idParam: number): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const user: User | null = await userRepository.findOne({
    where: {
      id: idParam,
    },
  });

  await userRepository.softRemove(user!);
  return;
};
