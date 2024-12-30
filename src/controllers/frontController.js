import { getListProjects, readProject } from "../service/projectService.js"
import { getDashboardStats } from "../service/projectService.js"
import {updateUserProfileService} from "../service/authService.js"
import Task from "../models/Task.js"

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

export async function updateTask(req,res){
    try{
        const tasks=await Task.find()
    console.log(tasks)
    return res.render("task",{tasks})
}
catch(error){
    res.status(500).send('Erreur serveur');


}
    }

export async function deleteTask(req,res){

}
export async function updateProfil(req,res){
    const users=await updateUserProfileService({
        owner:req.session.user._id
    })
    return res.render("profilUser", {users})

}

export  async function detail(req,res){
        try {
            const projectId = req.params.id;
    
            const project = await readProject({ _id: projectId });
    
            if (!project) {
                return res.status(404).send("Projet non trouvé");
            }
    
            return res.render("detailsProject", { project });
        } catch (error) {
            console.error("Erreur dans le contrôleur detail:", error);
            return res.status(500).send("Erreur lors du chargement des détails du projet");
        }
    }

    export async function invitationPage(req, res) {
        const session = req.session;
        return res.render("detailsProject", { session });
    }
    

// export async function editProject(req,res){
//     return res.render("")
    
// }
