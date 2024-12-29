import {Router} from "express"
import { createProject, readProject, updateProject,deleteProject, createTask,getDashboardStats,getProjectDetails} from "../controllers/projectController.js"
import { deleteTask } from "../service/projectService.js"

const router=Router()

router.post("/add",createProject)
router.get("/list",readProject)
router.post("/edit/:id",updateProject)
router.get("/delete/:id",deleteProject)
router.post("/create",createTask)
router.post("total",getDashboardStats)
router.delete("/deleteTask/:id",deleteTask)
router.get("/detail/:id",getProjectDetails)

export default router  