import { Router } from "express";
import {  dashboard, detail, index, listProject, loginPage, notificationPage, parametrePage, registerPage, task,updateProfil } from "../controllers/frontController.js";
import { logout } from "../controllers/authController.js";

const router = Router();

router.get("/login", loginPage);
router.get("/", index);
router.get("/register",registerPage)
router.get("/list",listProject)   
router.get("/task",task)
router.get("/dashboard",dashboard)     
router.get("/profil",updateProfil)    
router.get("/detailsProjet",detail) 
router.get("/parametre",parametrePage) 
router.get("/notification",notificationPage)
router.get('/logout',logout);
// router.get("/invitation",invitationPage)   
export default router; 