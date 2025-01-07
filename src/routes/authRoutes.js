import { Router } from "express";
import { registerSchema, registerUser, loginUser, loginSchema, getUser,updateUserProfile, modifierProfilSchema } from "../controllers/authController.js";
import { validateData } from "../middlewares/validateData.js";

const router = Router()

router.post('/register', validateData(registerSchema), registerUser)
router.post('/login', validateData(loginSchema),loginUser)
router.get("/test", getUser)
router.post("/profil",validateData(modifierProfilSchema, false),updateUserProfile)

export default router