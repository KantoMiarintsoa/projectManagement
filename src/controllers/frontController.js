import { getListProjects, readProject } from "../service/projectService.js"
import { getDashboardStats } from "../service/projectService.js"
import {updateUserProfileService} from "../service/authService.js"

export async function loginPage(req, res){
    return res.render("login")
}

export const index=async(req,res)=>{
    res.redirect("/list")
}

export async function registerPage(req,res){
    return res.render("register")
}

export async function listProject(req,res){
    const projects = await readProject({
        owner:req.session.user._id
    })
    return res.render("listProject", {projects})
}

export async function task(req,res){
    return res.render("task")
}
export async function dashboard(req, res) {
    try {
        const stats = await getDashboardStats();

        return res.render("dashboard", {
            totalUsers: stats.totalUsers,
            totalProjects: stats.totalProjects,
            totalTasks: stats.totalTasks,
            completedTasks: stats.completedTasks,
            incompleteTasks: stats.incompleteTasks,
        });
    } catch (error) {
        console.error("Erreur dans le contrôleur dashboard:", error);
        res.status(500).send("Erreur lors du chargement du tableau de bord");
    }
}

export async function updateProfil(req,res){
    const users=await updateUserProfimleService({
        owner:req.session.user._id
    })
    return res.render("profilUser", {users})

}

// export async function editProject(req,res){
//     return res.render("")
    
// }
