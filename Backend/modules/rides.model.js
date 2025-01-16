import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "driver"
    },
    pickup: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    fare: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
        default: "pending"
    },
    duration: { type: String },
    distance: { type: String },
    paymentID: { type: String },
    orderID: { type: String },
    signature: { type: String },
    otp: { type: String, required: true, select: false }
});

const rideModel = mongoose.model("rides", rideSchema);

export default rideModel;