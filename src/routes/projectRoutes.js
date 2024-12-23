import {Router} from "express"
import { createProject, readProject, updateProject,deleteProject, createTask,getDashboardStats} from "../controllers/projectController.js"

const router=Router()

router.post("/add",createProject)
router.get("/list",readProject)
router.post("/edit/:id",updateProject)
router.get("/delete/:id",deleteProject)
router.post("/create",createTask)
router.get("/task",createTask)
router.post("total",getDashboardStats)

export default router   