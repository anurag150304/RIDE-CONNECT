import express from "express";
import { body, query } from "express-validator";
import { authUser } from "../middlewares/userAuth.js";
import { confirmRide, createRide, endRide, getFare, startRide } from "../controller/rides.controller.js";
import { Authdriver } from "../middlewares/driverAuth.js";

const router = express.Router();

router.post('/create', authUser,
    body("pickup").isString().isLength({ min: 3 }).withMessage("Invalid pickup address"),
    body("destination").isString().isLength({ min: 3 }).withMessage("Invalid destination address"),
    body("vehicleType").isString().isIn(["car", "motorcycle", "auto"]).withMessage("Invalid vehicle type"),
    body("fare").isString().withMessage("Invalid vehicle fare"),
    createRide);

router.get('/get-fares', authUser,
    query("pickup").isString().isLength({ min: 3 }).withMessage("Invalid pickup address"),
    query("destination").isString().isLength({ min: 3 }).withMessage("Invalid destination address"),
    getFare);

router.post('/confirm-ride', Authdriver,
    body('rideId').isMongoId().withMessage("Invalid ride ID"),
    confirmRide);

router.get('/start-ride', Authdriver,
    query("rideId").isMongoId().withMessage("Invalid ride ID"),
    query("otp").isString().isLength({ min: 4, max: 4 }).withMessage("Invalid 4 digit code"),
    startRide);

router.post('/end-ride', Authdriver,
    body("rideId").isMongoId().withMessage("Invalid ride ID"),
    endRide);

export default router;