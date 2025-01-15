import { rideModel } from "../modules/rides.model.js";
import { sendMessageToSocketID } from "../socket.js";
import { getDistanceAndTime } from "./map.service.js";
import crypto from "crypto"

export const makeRide = async ({ userID, pickup, destination, vehicleType, fare }) => {
    if (!userID || !pickup || !destination || !vehicleType || !fare) throw new Error("All fields are required");
    try {
        const getDistance = await getDistanceAndTime(pickup, destination);
        return rideModel.create({
            userID,
            pickup,
            destination,
            fare,
            distance: getDistance.distance.text,
            duration: getDistance.duration.text,
            otp: generateOTP(4)
        });
    } catch (error) {
        console.log(error.message);
    }

}

export const ConfirmRide = async (rideId, driverId) => {
    if (!rideId || !driverId) {
        throw new Error("Ride ID and Driver ID are required");
    }

    try {
        const updatedRide = await rideModel.findByIdAndUpdate(
            rideId,
            { status: "accepted", captain: driverId },
            { new: true }
        );

        if (!updatedRide) {
            throw new Error("Ride not found or update failed");
        }
        return await rideModel.findById(rideId).select("+otp").populate("userID", "socketID").populate("captain", "fullname location vehicle");
    } catch (error) {
        console.error(`Error in ConfirmRide: ${error.message}`);
        throw error;
    }
};


export const StartRide = async (rideId, otp) => {
    if (!rideId || !otp) throw new Error("RideID and OTP are required.");

    try {
        const ride = await rideModel.findById(rideId).select("+otp").populate("userID");
        if (!ride) throw new Error("Ride not found.");
        if (ride.status !== 'accepted') throw new Error("Ride is not in an accepted state.");
        if (ride.otp !== otp) throw new Error("Invalid OTP.");

        ride.status = "ongoing";
        return await ride.save();
    } catch (error) {
        console.error(`Error starting ride: ${error.message}`);
        throw error;
    }
};

export const EndRide = async (rideId, driver) => {
    if (!rideId || !driver) throw new Error("RideID and Driver are required.");
    try {
        const ride = await rideModel.findOne({ _id: rideId, captain: driver._id }).populate("userID");
        if (!ride) throw new Error("Ride not found");
        if (ride.status !== "ongoing") throw new Error("Ride not not started");

        ride.status = "completed";
        return await ride.save();
    } catch (error) {
        console.error(`Error ending ride: ${error.message}`);
        throw error;
    }

}


export const calculateFares = (distance, time) => {
    if (typeof distance !== "number" || typeof time !== "number") {
        throw new Error("Distance (meters) and time (seconds) are required as numbers.");
    }

    // Convert distance to kilometers and time to minutes
    const distanceInKm = distance / 1000; // 1 km = 1000 meters
    const timeInMinutes = time / 60; // 1 minute = 60 seconds

    const fareRates = {
        car: {
            baseFare: 50, // Base fare in currency units
            perKmRate: 10, // Rate per kilometer
            perMinuteRate: 1.0, // Rate per minute
        },
        motorcycle: {
            baseFare: 20,
            perKmRate: 5,
            perMinuteRate: 0.8,
        },
        auto: {
            baseFare: 30,
            perKmRate: 8,
            perMinuteRate: 0.9,
        },
    };

    if (distance < 0 || time < 0) {
        throw new Error("Distance and time must be non-negative numbers.");
    }

    // Calculate fares for all vehicle types
    const fares = {};
    for (const [vehicleType, rates] of Object.entries(fareRates)) {
        const { baseFare, perKmRate, perMinuteRate } = rates;
        const totalFare = baseFare + distanceInKm * perKmRate + timeInMinutes * perMinuteRate;
        fares[vehicleType] = parseFloat(totalFare.toFixed(2)); // Round to 2 decimal places
    }
    return fares;
};

export const generateOTP = (length) => {
    return crypto.randomInt(0, 10 ** length).toString().padStart(length, '0');
};