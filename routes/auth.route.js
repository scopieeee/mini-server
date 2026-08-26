const express = require("express")
const { register, login, fetchUserById, deleteUserById, updateUserById } = require("../controllers/auth.controller")

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/:id", fetchUserById);
authRouter.delete("/:id", deleteUserById);
authRouter.put("/:id", updateUserById);


module.exports = authRouter;