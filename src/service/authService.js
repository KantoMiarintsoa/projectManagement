import User from "../models/User.js";

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

export async function updateUserProfileService(username, email, password) {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error("Utilisateur non trouvé.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.email = email;
    user.password = hashedPassword;
    await user.save();

    return { username: user.username, email: user.email };
}