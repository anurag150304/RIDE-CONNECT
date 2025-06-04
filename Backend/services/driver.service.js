import driverModule from "../modules/driver.js";

const createDriver = async ({ firstname, lastname, email, password, model, plate, capacity, vehicleType }) => {
    if (!firstname || !lastname || !email || !password || !model || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }

    return await driverModule.create({
        fullname: { firstname, lastname },
        email,
        password,
        vehicle: { model, plate, capacity, vehicleType }
    });
}

const findNearbyDrivers = async (ltd, lng, radius) => {
    return await driverModule.find({
        location: {
            $geoWithin: {
                $centerSphere: [[ltd, lng], radius / 6378.1],
            },
        },
        status: "active",
    });
};

export default {
    createDriver,
    findNearbyDrivers
}