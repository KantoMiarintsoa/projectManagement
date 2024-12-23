import { Router } from "express";
import { dashboard, index, listProject, loginPage, registerPage, task } from "../controllers/frontController.js";

const router = Router();

router.get("/login", loginPage);
router.get("/", index);
router.get("/register",registerPage)
router.get("/list",listProject)   
router.get("/task",task)
router.get("/dashboard",dashboard)                                    
export default router;