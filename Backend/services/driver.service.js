import driverModule from "../modules/driver.js";

const createDriver = async ({
    firstname,
    lastname,
    email,
    password,
    model,
    plate,
    capacity,
    vehicleType
}) => {
    if (!firstname || !lastname || !email || !password || !model || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }

    return await driverModule.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            model,
            plate,
            capacity,
            vehicleType
        }
    });
}

const findNearbyDrivers = async (ltd, lng, radius) => {
    try {
        return await driverModule.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[ltd, lng], radius / 6378.1],
                },
            },
            status: "active", // Filter by active status
        });
    } catch (error) {
        console.error("Error finding nearby drivers:", error);
        throw error;
    }
};

export default {
    createDriver,
    findNearbyDrivers
}