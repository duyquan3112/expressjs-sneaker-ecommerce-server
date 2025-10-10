import { Router } from "express";
import { catchAsync } from "../../../middlewares/error-handler.middleware";
import userController from "../modules/user.module";
const usersRouter = Router();

usersRouter.get(
  "/get-all",
  catchAsync(userController.getAllUsers.bind(userController))
);
