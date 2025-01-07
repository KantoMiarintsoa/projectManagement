import {Router} from "express"
import { createProject, readProject, updateProject,deleteProject, createTask,getDashboardStats,getProjectDetails, addMember, assignMembersToTask} from "../controllers/projectController.js"
import { deleteTask } from "../service/projectService.js"
// import { searchInvitationsController, sendInvitationController } from "../controllers/invitationController.js"

const router=Router()

router.post("/add",createProject)
router.get("/list",readProject)
router.post("/edit/:id",updateProject)
router.get("/delete/:id",deleteProject)
router.post("/detail/:id/createTask",createTask)
router.post("total",getDashboardStats)
router.delete("/deleteTask/:id",deleteTask)
router.get("/detail/:id",getProjectDetails)
router.post("/detail/:id/addMember",addMember)
router.post("/detail/:id/assigneMember", assignMembersToTask)
// router.post('/send', sendInvitationController);
// router.get('/search', searchInvitationsController);

export default router