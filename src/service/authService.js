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