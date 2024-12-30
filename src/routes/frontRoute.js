import { Router } from "express";
import { dashboard, detail, index, invitationPage, listProject, loginPage, registerPage, task,updateProfil } from "../controllers/frontController.js";

const router = Router();

router.get("/login", loginPage);
router.get("/", index);
router.get("/register",registerPage)
router.get("/list",listProject)   
router.get("/task",task)
router.get("/dashboard",dashboard)     
router.get("/profil",updateProfil)    
router.get("/detailsProjet",detail)    
router.get("/invitation",invitationPage)                       
export default router; 