import { validationResult } from "express-validator";
import rideService from "../services/rides.service.js";
import mapService from "../services/map.service.js";
import driverService from "../services/driver.service.js";
import socket from "../socket.js";
import rideModel from "../modules/rides.model.js";

const createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });

    try {
        const { pickup, destination, vehicleType, fare } = req.body;
        const newRide = await rideService.makeRide({ userID: req.user._id, pickup, destination, vehicleType, fare });
        res.status(201).json(newRide);

        const pickupCoordinates = await mapService.getAddressCoordinates(pickup);
        const getNearByDrivers = await driverService.findNearbyDrivers(pickupCoordinates.latitude, pickupCoordinates.longitude, 2);
        const rideWithUser = await rideModel.findOne({ _id: newRide._id }).populate("userID");

        console.log("Nearby Drivers : ", getNearByDrivers)
        console.log("Ride with user : ", rideWithUser)

        newRide.otp = "";
        getNearByDrivers.forEach(driver => {
            socket.sendMessageToSocketID(driver.socketID, { event: "new-ride", data: rideWithUser });
        });

    } catch (error) {
        console.error("Error in createRide:", error.message);
        return res.status(400).json({ message: error.message });
    }
};

const getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });
    const { pickup, destination } = req.query;

    try {
        const getDistance = await mapService.getDistanceAndTime(pickup, destination);
        const fares = rideService.calculateFares(getDistance.distance.value, getDistance.duration.value);
        res.status(200).json(fares);
    } catch (error) {
        console.error("Error in getFare:", error.message);
        return res.status(400).json({ message: error.message });
    }
};

const confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });

    try {
        const { rideId } = req.body;
        const confirmedRide = await rideService.ConfirmRide(rideId, req.driver._id);
        res.status(200).json(confirmedRide);

        socket.sendMessageToSocketID(confirmedRide.userID.socketID, {
            event: "ride-confirmed",
            data: confirmedRide
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });

    const { rideId, otp } = req.query;

    try {
        const startedRide = await rideService.StartRide(rideId, otp);
        res.status(200).json(startedRide);

        socket.sendMessageToSocketID(startedRide.userID.socketID, {
            event: "ride-started",
            data: startedRide
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });

    try {
        const { rideId } = req.body;
        const endedRide = await rideService.EndRide(rideId, req.driver);
        res.status(200).json(endedRide);
        socket.sendMessageToSocketID(endedRide.userID.socketID, {
            event: "ride-ended",
            data: endedRide
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default {
    createRide,
    getFare,
    confirmRide,
    startRide,
    endRide
};