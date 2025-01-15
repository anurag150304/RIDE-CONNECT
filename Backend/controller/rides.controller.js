import { validationResult } from "express-validator"
import { calculateFares, ConfirmRide, EndRide, makeRide, StartRide } from "../services/rides.service.js";
import { getAddressCoordinates, getDistanceAndTime } from "../services/map.service.js";
import { findNearbyDrivers } from "../services/driver.service.js";
import { sendMessageToSocketID } from "../socket.js";
import { rideModel } from "../modules/rides.model.js";

export const createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });

    try {
        const { pickup, destination, vehicleType, fare } = req.body;
        const newRide = await makeRide({ userID: req.user._id, pickup, destination, vehicleType, fare });
        res.status(201).json(newRide);

        const pickupCoordinates = await getAddressCoordinates(pickup);
        const getNearByDrivers = await findNearbyDrivers(pickupCoordinates.latitude, pickupCoordinates.longitude, 2);
        const rideWithUser = await rideModel.findOne({ _id: newRide._id }).populate("userID");

        newRide.otp = "";
        getNearByDrivers.forEach(driver => {
            sendMessageToSocketID(driver.socketID, { event: "new-ride", data: rideWithUser });
        });

    } catch (error) {
        console.error("Error in createRide:", error.message);
        return res.status(400).json({ message: error.message });
    }
};

export const getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) return res.status(400).json({ error: errors.array() });
    const { pickup, destination } = req.query;

    try {
        const getDistance = await getDistanceAndTime(pickup, destination);
        const fares = calculateFares(getDistance.distance.value, getDistance.duration.value);
        return res.status(200).json(fares);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }

}

export const confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) return res.status(400).json({ error: errors.array() });

    try {
        const { rideId } = req.body;
        const confirmedRide = await ConfirmRide(rideId, req.driver._id);
        res.status(200).json(confirmedRide);

        sendMessageToSocketID(confirmedRide.userID.socketID, {
            event: "ride-confirmed",
            data: confirmedRide
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) return res.status(400).json({ error: errors.array() });

    const { rideId, otp } = req.query;

    try {
        const startedRide = await StartRide(rideId, otp);
        res.status(200).json(startedRide);

        sendMessageToSocketID(startedRide.userID.socketID, {
            event: "ride-started",
            data: startedRide
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) return res.status(400).json({ error: errors.array() });

    try {
        const { rideId } = req.body;
        const endedRide = await EndRide(rideId, req.driver);
        res.status(200).json(endedRide);
        console.log(endedRide);
        sendMessageToSocketID(endedRide.userID.socketID, {
            event: "ride-ended",
            data: endedRide
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}