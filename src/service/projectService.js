import Project from "../models/Project.js";
import User from "../models/User.js";
import { task } from "../controllers/frontController.js";
import Task from "../models/Task.js";

export async function createTask(taskData){
    const newTask=await Project.create(taskData)
    return newTask
}
export async function createProject(projectData){
    const newProject=await Project.create(projectData)
    return newProject
}

export async function readProject(projectData){
    try{
        const listProjects=await Project.find(projectData);
        return listProjects;
    }
    catch(error){
        console.error("erreur lors de l affichage des donnes",error);
        throw error;
    }
}

export async function updateProject(id, updateData) {
        try {
            const projectToUpdate = await Project.findById(id);
    
            if (!projectToUpdate) {
                throw new Error("Projet non trouvé");
            }
    
            const updatedProject = await Project.findByIdAndUpdate(id, updateData, {
                new: true, 
                runValidators: true, 
            });
    
            return updatedProject;
        } catch (error) {
            console.error("Erreur lors de la mise à jour du projet", error);
            throw error; 
        }
    }

    export async function deleteProject(id) {
        try {
            if (!id) {
                throw new Error("ID du projet manquant");
            }
    
            const projectToDelete = await Project.findById(id);
        
            if (!projectToDelete) {
                throw new Error("Projet non trouvé");
            }
        
            await Project.findByIdAndDelete(id);
        
            return { success: true, message: "Projet supprimé avec succès" };
        } catch (error) {
            console.error("Erreur lors de la suppression du projet", error);
            throw error; 
        }
    }
    export async function getDashboardStats() {
        try {
            const totalUsers = await User.countDocuments();
            const totalProjects = await Project.countDocuments();
            const totalTasks = await task.countDocuments();
            const completedTasks = await task.countDocuments({ status: 'completed' });
            const incompleteTasks = totalTasks - completedTasks;
    
            return {
                totalUsers,
                totalProjects,
                totalTasks,
                completedTasks,
                incompleteTasks,
            };
        } catch (error) {
            console.error('Erreur dans StatsService:', error);
            throw new Error('Impossible de récupérer les statistiques');
        }
    }

    export async function getListProjects(owner){
        const projects = await Project.find({
            owner:user._id
        });
        return projects;
    }

    export async function addTask(projectId, taskData){
        try{
            const task = await Task.create(taskData);
            const project = await Project.findOne({
                _id:projectId
            }).select("+tasks");
            // add task to array tasks of project
            project.tasks.push(task);
            project.save();

        }catch(error){
            console.log(error);
        }
    }

    export async function updateTask(id, updateDataTask) {
        try {
            const taskToUpdate = await Project.findById(id);
    
            if (!taskToUpdate) {
                throw new Error("Projet non trouvé");
            }
    
            const updatedTask = await Project.findByIdAndUpdate(id, updateDataTask, {
                new: true, 
                runValidators: true, 
            });
    
            return updatedTask;
        } catch (error) {
            console.error("Erreur lors de la mise à jour du projet", error);
            throw error; 
        }
    }

    export async function deleteTask(id) {
        try {
            if (!id) {
                throw new Error("ID du tache manquant");
            }
    
            const taskToDelete = await Project.findById(id);
        
            if (!taskToDelete) {
                throw new Error("Tache non trouvé");
            }
        
            await Task.findByIdAndDeleteTask(id);
        
            return { success: true, message: "Tache supprimé avec succès" };
        } catch (error) {
            console.error("Erreur lors de la suppression du tache", error);
            throw error; 
        }
    }

    export async function getProjectDetails(id) {
        try {
            if (!id) {
                throw new Error("ID du projet manquant");
            }
    
            const project = await Project.findById(id)
                .populate('tasks')    
                .populate('messages'); 
    
            if (!project) {
                throw new Error("Projet non trouvé");
            }
    
            return {
                project,
                tasks: project.tasks,
                messages: project.messages,
            };
        } catch (error) {
            console.error("Erreur lors de la récupération des détails du projet", error);
            throw new Error('Impossible de récupérer les détails du projet');
        }
    }
    
    export async function getProjectByid(id){
        
    }