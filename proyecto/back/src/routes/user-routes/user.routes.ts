import { Router } from "express";
import { UserController } from "../../controllers/user.controller.js";
import { verificarToken } from "../../middlewares/auth.middleware.js"; // 👈 importa el middleware

const userRouter = Router();
const userController = new UserController();

userRouter.get("/", userController.findAllUsers.bind(userController));
userRouter.get("/:id", userController.getUserById.bind(userController));
userRouter.post("/", userController.createUser.bind(userController));
userRouter.put("/:id", userController.updateUser.bind(userController));
userRouter.delete("/:id", userController.deleteUser.bind(userController));
userRouter.post("/login", userController.login.bind(userController));

// 🔐 Ruta protegida
userRouter.get("/perfil", verificarToken, (req, res) => {
  res.json({
    message: "Sesión válida ✅",
    user: (req as any).user,
  });
});

export default userRouter;
