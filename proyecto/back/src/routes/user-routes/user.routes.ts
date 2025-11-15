import { Router } from "express";
import { UserController } from "../../controllers/user.controller.js";
import { verificarToken } from "../../middlewares/auth.middleware.js";

const userRouter = Router();
const userController = new UserController();

// 🔐 Ruta protegida — va primero
userRouter.get("/perfil", verificarToken, (req, res) => {
  res.json({
    message: "Sesión válida ✅",
    user: (req as any).user,
  });
});


userRouter.get("/:id", userController.getUserById.bind(userController));
userRouter.post("/", userController.createUser.bind(userController));
userRouter.put("/:id", userController.updateUser.bind(userController));
userRouter.post("/login", userController.login.bind(userController));

export default userRouter;
