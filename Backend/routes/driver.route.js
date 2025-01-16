import express from "express";
import { body } from "express-validator";
import driverController from "../controller/driver.controller.js";
import Authdriver from "../middlewares/driverAuth.js";

const router = express.Router();

router.post('/register', [
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.model').isLength({ min: 3 }).withMessage('Vehicle model must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Number plate must be at least 3 characters long'),
    body('vehicle.capacity').isLength({ min: 1 }).withMessage('Vehicle capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type')
], driverController.registerDriver);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], driverController.loginDriver)

router.get('/profile', Authdriver, driverController.getDriverProfile);
router.get('/logout', Authdriver, driverController.logoutDriver);

export default router;