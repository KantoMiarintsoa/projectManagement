// import { connectDB } from "../db.js";
import {z} from 'zod'
import { createUser, findUserByEmail, userExists, verifyOldPassword, updateUserProfileService } from '../service/authService.js';
import bcrypt from 'bcrypt';

export const registerSchema = z.object({
    email:z.string().email(),
    password:z.string().min(6),
    contact:z.string().regex(/^[0-9]{10}$/),
    username:z.string()
})



async function registerUser(req,res){
    const {username,email,password}=req.body;

    // const userExists=users.find((user)=> user.username==username ||user.email==email);
    const isUserExist = await userExists(username)

    if(isUserExist){
        return res.status(400).json({message: "l utilisateur est deja existé"})
    }

    try{
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser = await createUser({username, email, password:hashedPassword});
        // res.status(200).json({user: newUser});

        req.session.user = newUser;
        return res.redirect("/");
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"erreur server:".error})
    }
}

export const loginSchema=z.object({
    email:z.string().email(),
    password:z.string().min(6),
})

async function loginUser(req, res) {
    const { email, password } = req.body;
 

    try {
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "Utilisateur introuvable" });
        }
        if (!user.password) {
            return res.status(500).json({ message: "Mot de passe manquant dans la base de données." });
          }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Mot de passe incorrect" });
        }

        // req.session.userId = user.id;  
        req.session.user = user;

        // const redirectUrl = req.session.redirectUrl || '/'; // Par défaut, la page d'accueil
        // delete req.session.redirectUrl; // Nettoyer l'URL de redirection après l'avoir utilisée
        return res.redirect("/");
      
        //  res.json({ message: 'Connexion réussie', redirectUrl });

        // return res.status(200).json({ message: "Connexion réussie", user: { email: user.email } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
}


export const getUser = (req, res)=>{
    const user = req.session.user
    console.log(user)
    res.redirect("/")
}

export const modifierProfilSchema = z.object({
    password:z.string().min(6).optional(), 
    username:z.string(),
    confirmPassword:z.string().min(6).optional(),
    oldPassword:z.string().min(6).optional()
    
}).refine((data) => {
    return data.password === data.confirmPassword || !data.password;
  }, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"]

}).refine(
    (data) => !(data.oldPassword && !data.password),{
        path:['password']
    }
    
) 
async function updateUserProfile(req, res) {
    const userId = req.session.user ? req.session.user._id : null;
    if (!userId) {
        return res.redirect("/login")
    }

    const { currentpassword, password, confirmpassword } = req.body;

    let errors = {};
    let successMessage = undefined;


    if (password && password !== confirmpassword) { 
        errors.password = "Les mots de passe ne correspondent pas.";
    }

    const updateProfilData = { ...req.body, userId };

    if (currentpassword) {
        try {
            const isOldPasswordValid = await verifyOldPassword(userId, currentpassword);
            if (!isOldPasswordValid) {
                errors.currentpassword = "L'ancien mot de passe est incorrect.";
            }
        } catch (error) {
            errors.currentpassword = "Erreur lors de la vérification de l'ancien mot de passe.";
        }
    }

    if (Object.keys(errors).length > 0) {
        return res.render('profilUser', {
            user: req.session.user,
            errors: errors || [],
            successMessage
        });
    }

    try {
        const result = await updateUserProfileService(updateProfilData);
    
        if (result.success) {
            successMessage = "Profil mis à jour avec succès.";
            return res.render('profilUser', {
                user: req.session.user,
                successMessage, 
                errors:{}
            });
        }

        return res.status(400).render('profilUser', {
            user: req.session.user,
            errors: { general: "Une erreur est survenue lors de la mise à jour." },
            successMessage
        });

    } catch (error) {
        return res.status(500).render('profilUser', {
            user: req.session.user,
            errors: { general: "Une erreur interne est survenue." },
            successMessage
        });
    }
}

  export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Erreur serveur lors de la déconnexion" });
        }
        res.redirect('/login');  
    });
};

  

export{registerUser,loginUser,updateUserProfile}