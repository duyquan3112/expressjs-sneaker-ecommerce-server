import { IUserRepository } from "../interfaces/user-repository.interface";
import { CreateUserDTO } from "../dtos/request/create-user.dto";
import { UpdateUserDTO } from "../dtos/request/update-user.dto";
import { IUserService } from "../interfaces/user-service.interface";
import { User } from "../entities/user.entity";
import { plainToInstance } from "class-transformer";
import { UserHelper } from "../helpers/user.helper";
import { AppError } from "../../../utils/app-error.util";
import {
  ErrorCode,
  HttpStatusCode,
} from "../../../constants/http-status-code.constant";

export class UserService implements IUserService {
  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(user: CreateUserDTO) {
    const createUserData = UserHelper.buildCreateUserFromDTO(user);
    return this.userRepository.create(createUserData);
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError(
        HttpStatusCode.NOT_FOUND,
        ErrorCode.NOT_FOUND,
        "User not found!"
      );
    }

    return user;
  }

  async getUsers() {
    return await this.userRepository.findAll();
  }

  async updateUser(id: string, user: UpdateUserDTO) {
    const currentUserData = await this.getUserById(id);
    const currentUser = plainToInstance(User, currentUserData);
    const updateUserData = UserHelper.buildUpdateUserFromDTO(user, currentUser);
    return this.userRepository.update(id, updateUserData);
  }

  async deleteUser(id: string) {
    return this.userRepository.delete(id);
  }
}
