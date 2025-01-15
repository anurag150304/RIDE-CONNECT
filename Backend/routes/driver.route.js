import express from "express";
import { body } from "express-validator";
import { getDriverProfile, loginDriver, logoutDriver, registerDriver } from "../controller/driver.controller.js";
import { Authdriver } from "../middlewares/driverAuth.js";

const router = express.Router();

router.post('/register', [
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invaild Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.model').isLength({ min: 3 }).withMessage('Vehecle model must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Number plate must be at least 3 characters long'),
    body('vehicle.capacity').isLength({ min: 1 }).withMessage('Vehecle capacity must be at least 1'),
    body('vehicle.vehicleType').isIn('car', 'motorcycle', 'auto').withMessage('Invalid vehicle type')
], registerDriver);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], loginDriver)

router.get('/profile', Authdriver, getDriverProfile);
router.get('/logout', Authdriver, logoutDriver);

export default router;