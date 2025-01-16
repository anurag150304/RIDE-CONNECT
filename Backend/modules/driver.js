import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const driverSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minLength: [3, 'First name must be at least 3 characters']
        },
        lastname: {
            type: String,
            minLength: [3, 'Last name must be at least 3 characters']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
        minLength: [5, 'Email must be at least 5 characters']
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketID: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle: {
        model: {
            type: String,
            required: true,
            minLength: [3, 'Color must be at least 3 characters long']
        },
        plate: {
            type: String,
            required: true,
            minLength: [3, 'Plate number must be at least 3 characters long']
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1']
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto']
        }
    },
    location: {
        ltd: {
            type: Number
        },
        lng: {
            type: Number
        }
    }
});

driverSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

driverSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

driverSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

const driverModule = mongoose.model('driver', driverSchema);

export default driverModule;