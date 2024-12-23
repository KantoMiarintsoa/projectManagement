// import { connectDB } from "../db.js";
import {z} from 'zod'
import { createUser, findUserByEmail, userExists } from '../service/authService.js';
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

        const isMatch = bcrypt.compare(password, user.password);
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

export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Erreur serveur lors de la déconnexion" });
        }
        res.redirect('/login');  
    });
};

export const getUser = (req, res)=>{
    const user = req.session.user
    console.log(user)
    res.redirect("/")
}

export{registerUser,loginUser}