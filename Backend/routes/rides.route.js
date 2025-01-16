import express from "express";
import { body, query } from "express-validator";
import authUser from "../middlewares/userAuth.js";
import ridesController from "../controller/rides.controller.js";
import authDriver from "../middlewares/driverAuth.js";

const router = express.Router();

router.post('/create', authUser,
    body("pickup").isString().isLength({ min: 3 }).withMessage("Invalid pickup address"),
    body("destination").isString().isLength({ min: 3 }).withMessage("Invalid destination address"),
    body("vehicleType").isString().isIn(["car", "motorcycle", "auto"]).withMessage("Invalid vehicle type"),
    body("fare").isString().withMessage("Invalid vehicle fare"),
    ridesController.createRide);

router.get('/get-fares', authUser,
    query("pickup").isString().isLength({ min: 3 }).withMessage("Invalid pickup address"),
    query("destination").isString().isLength({ min: 3 }).withMessage("Invalid destination address"),
    ridesController.getFare);

router.post('/confirm-ride', authDriver,
    body('rideId').isMongoId().withMessage("Invalid ride ID"),
    ridesController.confirmRide);

router.get('/start-ride', authDriver,
    query("rideId").isMongoId().withMessage("Invalid ride ID"),
    query("otp").isString().isLength({ min: 4, max: 4 }).withMessage("Invalid 4 digit code"),
    ridesController.startRide);

router.post('/end-ride', authDriver,
    body("rideId").isMongoId().withMessage("Invalid ride ID"),
    ridesController.endRide);

export default router;