import { z } from "zod";
import Project from "../models/Project.js";
import { addTask, updateProject as updateProjectInService, readProject as getProject, getProjectByid, createMember} from "../service/projectService.js";
import Task from "../models/Task.js";
import User from "../models/User.js";
import { task } from "./frontController.js";


export const createProjectSchema=z.object({
    title:z.string(),
    description:z.string(),
    dateStart:z.string().date(),
    dueDate:z.string().date(),
})

async function createProject(req, res) {   
    console.log('eto')
    const {title,description,dateStart,dueDate}=req.body
    const user=req.session.user

    const project=new Project({
        title,
        description,
        dateStart,
        dueDate,
        progression:0,
        owner:user._id
    });
    await project.save();
    res.redirect("/list");
}


async function readProject(req, res) {
    const { status, sort } = req.query; 
    const session=await mongoose.startSession();

    try{
        session.startTransanction();
        const filter={};
        if(status){
            filter.status=status
        }
        const sortOption={};
        if (sort){
            const [key,order]=sort.split(";");
            sortOptionp[key]=order ==="desc"? -1 : 1;
        }

        const projects= await Project.find(filter)
            sort(sortOption)
            session(session);

        await session.commitTransanction();
        session.endSession();

        return res.status(200).json({
            succes:true,
            data:projects,
        });
    }


    catch(error){
        await session.aborttransanction();
        session.endSession();

        console.log("erreur lors de l affichage",error)
        return res.status(500).json({
            succes:false,
            message:"erreur lors de l affichage de liste de projet",
            error:error.message
        })
    }
}
 
 async function updateProject(req, res) {
    // console.log(req.params)
    // const { id } = req.params;
    // const updateData = req.body; 

    // try {
    //     await updateProject(id, updateData);
    //     // return res.status(200).json({
    //     //     message: "Projet mis à jour avec succès",
    //     //     data: updatedProject,
    //     // });
    //     return res.redirect("/list");
    // } catch (error) {
    //     return res.status(500).json({
    //         message: "Échec de la mise à jour du projet",
    //         error: error.message,
    //     });
    // }

    try{
        const {id}=req.params;
        if(!id){
            return res.status(400).json({
                message:"aucone message selectionne"
            })
        }
        const updateData=req.body
        await updateProjectInService(id, updateData);

        return res.redirect("/list")
    }
    catch(error){
        return res.status(500).json({
            message:"echec de la mis a jour",
            error:error.message
        })
    }
}


async function deleteProject(req, res) {
    const { id } = req.params; 

    if (!id) {
        return res.status(400).json({ error: 'ID du projet manquant' });
    }

    try {
        const projectToDelete = await Project.findById(id);
    
        if (!projectToDelete) {
            return res.status(404).json({ error: 'Projet non trouvé' });
        }

        await Project.findByIdAndDelete(id); 
    
        return res.redirect("/list");
    } catch (error) {
        console.error("Erreur lors de la suppression du projet", error);
        return res.status(500).json({ error: 'Échec de la suppression du projet', message: error.message });
    }
}

export const userSchema = z.object({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});



async function getDashboardStats(req,res){
    try {
        if (!req.session || !req.session.user) {
            return res.status(403).send('Vous devez être connecté pour accéder au tableau de bord.');
        }

        const stats = await StatsService.getDashboardStats();

        // res.render('dashboard', stats);
    } catch (error) {
        console.error('Erreur dans StatsController:', error);
        res.status(500).send('Erreur serveur');
    }
}

export const createTaskSchema=z.object({
    name:z.string(),
    descriptions:z.string(),
})

async function createTask(req,res){
    const {name,description, dueDate}=req.body

    console.log(name, description, dueDate)

    const {id}=req.params;
    const user=req.session.user;

    const project = await getProject({_id:id});
    if(!project){
        res.redirect(`/list`);
    }

    await addTask(id, {name, description, dueDate});
    return res.redirect(`/project/detail/${id}`);
}

async function updateTask(req,res){
    try{
        const {id}=req.params;
        if(!id){
            return res.status(400).json({
                message:"aucone message selectionne"
            })
        }
        const updateData=req.body
        await updateProjectInService(id, updateDataTask);

        return res.redirect("/task")
    }
    catch(error){
        return res.status(500).json({
            message:"echec de la mis a jour",
            error:error.message
        })
    }
}

async function deleteTask(req, res) {
    const { id } = req.params; 

    if (!id) {
        return res.status(400).json({ error: 'ID du tache manquant' });
    }

    try {
        const taskToDelete = await Project.findById(id);
    
        if (!taskToDelete) {
            return res.status(404).json({ error: 'tache non trouvé' });
        }

        await Task.findByIdAndDeleteTask(id); 
    
        return res.redirect("/task");
    } catch (error) {
        console.error("Erreur lors de la suppression du tache", error);
        return res.status(500).json({ error: 'Échec de la suppression du tache', message: error.message });
    }
}

async function getProjectDetails(req, res) {
    const { id } = req.params;
    
    console.log('Requête reçue pour /project/detail/:id avec ID :', id);
    if (!id) {
        return res.status(400).send('ID du projet manquant');
    }
    try {
        const project = await getProjectByid(id);
        if (!project) {
            return res.status(404).send('Projet non trouvé');
        }
        const users = await User.find({}, "email"); 
        const tasks = await Task.find({ project: id }).populate("assigned_to", "selectedMembers");

        req.session.projectDetails = {
            project,
            tasks: project.tasks,
            users:project.users,

        };

        return res.render('detailsProject', { project,users,tasks});
    } catch (error) {
        console.error("Erreur lors de la récupération des détails du projet", error);
        return res.status(500).send('Erreur lors de la récupération des détails du projet');
    }
}

export const addMemberSchema=z.object({
       email:z.string().email(),

})
async function addMember(req,res){
    const {email}=req.body

    console.log(email)

    const {id}=req.params;
    const user=req.session.user;

    const project = await getProject({_id:id});
    if(!project){
        res.redirect(`/list`);
    }
    await createMember(id,{email})
    return res.redirect(`/project/detail/${id}`);
}


//  @param {Object} req - 
//  @param {Object} res - 
export const assigneMemmberSchema=z.object({
    selectedMembers: z.array(z.string().email()),
    email:z.string().email(),
})

async function assignMembersToTask(req, res) {
    const { id } = req.params;
    const { taskId } = req.body;
    let { selectedMembers } = req.body; 

    console.log(selectedMembers);

    if (typeof selectedMembers === 'string') {
        console.log("Un seul élément est sélectionné :", selectedMembers);
        selectedMembers = [selectedMembers]; 
    }

    if (!id || !taskId || !selectedMembers || selectedMembers.length === 0) {
        return res.status(400).send('Données incomplètes pour l’assignation');
    }

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).send('Tâche non trouvée');
        }

        const members = await User.find({ email: { $in: selectedMembers } });
        if (members.length < selectedMembers.length) {
            return res.status(400).send('Certains membres sélectionnés n’existent pas');
        }

        task.assigned_to = members.map((member) => member._id);
        await task.save();

        console.log('Membres assignés avec succès à la tâche :', task._id);

        return res.redirect(`/project/detail/${id}`);
    } catch (error) {
        console.error("Erreur lors de l’assignation des membres à la tâche :", error);
        return res.status(500).send('Erreur lors de l’assignation des membres à la tâche');
    }
}



export { createProject, readProject, updateProject, deleteProject, createTask, getDashboardStats, getProjectDetails,addMember ,assignMembersToTask};

