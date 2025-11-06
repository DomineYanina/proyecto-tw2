import { Router } from "express";
import { UserController } from "../../controllers/user.controller.js";

const userRouter = Router();
const userController = new UserController();

userRouter.get("/", userController.findAllUsers.bind(userController));
userRouter.get("/:id", userController.getUserById.bind(userController));
userRouter.post("/", userController.createUser.bind(userController));
userRouter.put("/:id", userController.updateUser.bind(userController));
userRouter.delete("/:id", userController.deleteUser.bind(userController));
userRouter.post("/login", userController.login.bind(userController));

export default userRouter;
