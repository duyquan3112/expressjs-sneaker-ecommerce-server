import { NextFunction, Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { UserResponseDTO } from "../dtos/response/user-response.dto";
import { sendSuccessResponse } from "../../../utils/response.util";
import { IUserService } from "../interfaces/user-service.interface";

export class UserController {
  private readonly userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    const users = await this.userService.getUsers();
    const response = plainToInstance(UserResponseDTO, users, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });
    return sendSuccessResponse(res, response);
  }
}
