import { validationResult } from "express-validator";
import { blackListModule } from "../modules/blackListToken.js";
import { userModule } from "../Modules/User.js";
import { createUser } from "../services/user.service.js";

export const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;
    const isUserAlreadyExists = await userModule.findOne({ email });
    if (isUserAlreadyExists) {
        return res.status(400).json({ message: 'User already exist' });
    }
    const hashedPassword = await userModule.hashPassword(password);

    const user = await createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();
    res.status(201).json({ token, user });
}

export const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await userModule.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const passMatch = await user.comparePassword(password);
    if (!passMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = user.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({ token, user });
}

export const logoutUser = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blackListModule.create({ token });
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out' });
}

export const getUserProfile = async (req, res) => {
    res.status(200).json(req.user);
}