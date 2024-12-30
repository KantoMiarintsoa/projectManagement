import { Router } from "express";
import { dashboard, detail, index, listProject, loginPage, registerPage, task,updateProfil } from "../controllers/frontController.js";

const router = Router();

router.get("/login", loginPage);
router.get("/", index);
router.get("/register",registerPage)
router.get("/list",listProject)   
router.get("/task",task)
router.get("/dashboard",dashboard)     
router.get("/profil",updateProfil)    
router.get("/detailsProjet",detail)                           
export default router; 