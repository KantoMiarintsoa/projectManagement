import User from "../models/User.js";
import bcrypt from 'bcrypt';


export async function createUser(userData){
    const newUser = await User.create(userData)
    return newUser
}

export async function userExists(username){
    return await User.findOne({username:username})
}

export async function findUserByEmail(email) {
    return await User.findOne({ email: email }).select("+password");
}

export async function verifyPassword(user, password) {
    return user ? await bcrypt.compare(password, user.password) : false;
}

export async function verifyOldPassword(userId, password){
  const user = await User.findById(userId).select("+password");
  return bcrypt.compare(password, user.password);
}

export async function updateUserProfileService(updateProfilData) {
      const { username, email, password, contact, userId } = updateProfilData;
      console.log(updateProfilData)
  
      if (!username || typeof username !== 'string' || username.trim() === '') {
      }
  
      if (!email || typeof email !== 'string' || email.trim() === '') {
      }
  
      const updateData = { username, email, contact };
  
      if (password && password.trim()) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateData.password = hashedPassword;
      }
  
      const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
      if (!updatedUser) {
      }
  
      return {
        success: true,
        message: "Profil mis à jour avec succès.",
        user: updatedUser,
      };
    }

    async function comparePAssword(currentPassword,hashedPassword, newPassword){
      try {
        const isMatch = await bcrypt.compare(currentPassword, hashedPassword);
        if (!isMatch) {
          return "L'ancien mot de passe est incorrect.";
        }
    
        if (await bcrypt.compare(newPassword, hashedPassword)) {
          return "Le nouveau mot de passe ne peut pas être le même que l'ancien.";
        }
    
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        return `Le mot de passe a été mis à jour avec succès : ${hashedNewPassword}`;
      } catch (error) {
        console.error(error);
        return "Une erreur s'est produite lors de la mise à jour du mot de passe.";
      }
    }
    export async function destroySession(req) {
        try {
          return new Promise((resolve, reject) => {
            if (!req.session) {
              return reject(new Error("Aucune session trouvée à détruire."));
            }
      
            req.session.destroy((err) => {
              if (err) {
                console.error("Erreur lors de la destruction de la session :", err);
                return reject(new Error("Échec de la déconnexion."));
              }
              resolve({ success: true, message: "Session détruite avec succès." });
            });
          });
        } catch (error) {
          console.error("Erreur dans destroySession :", error);
          throw new Error("Erreur interne lors de la destruction de la session.");
        }
      }
      
  
  
      
  
  
