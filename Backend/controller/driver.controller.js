import { validationResult } from "express-validator";
import driverModule from "../modules/driver.js";
import driverService from "../services/driver.service.js";
import blackListModule from "../modules/blackListToken.js";

const registerDriver = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const isDriverAlreadyExists = await driverModule.findOne({ email });
    if (isDriverAlreadyExists) {
        return res.status(400).json({ message: 'Driver already exist' });
    }
    const hashedPassword = await driverModule.hashPassword(password);

    const driver = await driverService.createDriver({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        status: "active",
        model: vehicle.model,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
    });

    const token = driver.generateAuthToken();
    res.status(201).json({ token, driver });
};

const loginDriver = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const driver = await driverModule.findOne({ email }).select('+password');

    if (!driver) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const passMatch = await driver.comparePassword(password);
    if (!passMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    driver.status = "active";
    await driver.save();

    const token = driver.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({ token, driver });
};

const logoutDriver = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await driverModule.findByIdAndUpdate(req.driver._id, { status: "inactive" });
    await blackListModule.create({ token });
    res.clearCookie('token');

    res.status(200).json({ message: 'Logged out' });
};

const getDriverProfile = (req, res) => {
    res.status(200).json(req.driver);
};

export default {
    registerDriver,
    loginDriver,
    logoutDriver,
    getDriverProfile
};