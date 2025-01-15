import { userModule } from "../Modules/User.js";

export const createUser = async ({ firstname, lastname, email, password }) => {
    if (!firstname || !email || !password) {
        throw new Error('All fields are required');
    }

    return await userModule.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    });
}