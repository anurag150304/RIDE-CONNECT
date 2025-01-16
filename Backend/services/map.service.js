import axios from "axios";

const getAddressCoordinates = async (address) => {
    if (!address) throw new Error("Address is required");
    try {
        const response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
            params: {
                address,
                key: process.env.GOOGLE_MAPS_API,
            },
        });

        if (response.data.status === "OK" && response.data.results.length > 0) {
            const location = response.data.results[0].geometry.location;
            return {
                latitude: location.lat,
                longitude: location.lng,
            };
        }
        throw new Error("No results found for the given address.");
    } catch (error) {
        console.error("Error getting coordinates:", error.message);
        throw new Error("Failed to fetch coordinates. Please check the address or API key.");
    }
};

const getDistanceAndTime = async (origin, destination) => {
    if (!origin || !destination) throw new Error("origin & destination are required");
    try {
        const response = await axios.get("https://maps.googleapis.com/maps/api/distancematrix/json", {
            params: {
                origins: origin,
                destinations: destination,
                key: process.env.GOOGLE_MAPS_API,
            },
        });

        if (response.data.status === "OK" && response.data.rows.length > 0) {
            const DATA = response.data.rows[0].elements[0];

            if (DATA.status === "OK") return DATA;
            throw new Error(`Distance Matrix API Error: ${element.status}`);
        } else {
            throw new Error("No valid response from the Distance Matrix API.");
        }
    } catch (error) {
        console.error("Error fetching distance and time:", error.message);
        throw new Error("Failed to fetch distance and time. Please check the inputs or API key.");
    }
};

const getAutocompleteSuggestions = async (input) => {
    if (!input) throw new Error("Query is required");
    try {
        const response = await axios.get("https://maps.googleapis.com/maps/api/place/autocomplete/json", {
            params: {
                input,
                key: process.env.GOOGLE_MAPS_API,
                types: "geocode",
            },
        });

        if (response.data.status === "OK" && response.data.predictions.length > 0) {
            const suggestions = response.data.predictions.map((prediction) => ({
                description: prediction.description,
                place_id: prediction.place_id,
            }));
            return { suggestions };
        } else if (response.data.status === "ZERO_RESULTS") {
            return { suggestions: [] };
        } else {
            throw new Error(`Autocomplete API Error: ${response.data.status}`);
        }
    } catch (error) {
        console.error("Error fetching autocomplete suggestions:", error.message);
        throw new Error("Failed to fetch autocomplete suggestions. Please check the input or API key.");
    }
};

export default {
    getAddressCoordinates,
    getDistanceAndTime,
    getAutocompleteSuggestions
}