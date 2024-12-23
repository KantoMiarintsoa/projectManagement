import { Router } from "express";
import { registerSchema, registerUser, loginUser, loginSchema, getUser } from "../controllers/authController.js";
import { validateData } from "../middlewares/validateData.js";

const router = Router()

router.post('/register', validateData(registerSchema), registerUser)
router.post('/login', validateData(loginSchema),loginUser)
router.get("/test", getUser)

export default router