import { getListProjects, readProject } from "../service/projectService.js"
import { getDashboardStats } from "../service/projectService.js"
import {updateUserProfileService} from "../service/authService.js"
import Task from "../models/Task.js"
import User from "../models/User.js"

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
    return res.render("dashboard")
}
export async function parametrePage(req, res) {
    return res.render("settings")
}
export async function notificationPage(req,res) {
    return res.render("notification")
    
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
    const user = req.session.user;
    return res.render("profilUser", {user, errors:{}, successMessage: undefined})

}

export  async function detail(req,res){
        try {
            const projectId = req.params.id;
    
            const project = await readProject({ _id: projectId });
    
            if (!project) {
                return res.status(404).send("Projet non trouvé");
            }
            const users = await User.find({}, "email"); 
            console.log( users);
            
            return res.render("detailsProject", { project,users});
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
