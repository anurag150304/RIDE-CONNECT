import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export const LiveTracking = () => {
    const [userPosition, setUserPosition] = useState({ lat: 28.7041, lng: 77.1025 }); // Default position (e.g., Delhi)
    const [mapLoaded, setMapLoaded] = useState(false);

    const mapContainerStyle = {
        width: "100%",
        height: "100%",
        borderRadius: "0.5em"
    };

    useEffect(() => {
        let intervalId;

        // Function to fetch the user's location
        const fetchLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setUserPosition({ lat: latitude, lng: longitude });
                    },
                    (error) => {
                        console.error("Error fetching location:", error);
                    },
                    { enableHighAccuracy: true }
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
            }
        };

        // Fetch the location every 10 seconds
        fetchLocation(); // Fetch initially
        intervalId = setInterval(fetchLocation, 5000); // Fetch every 10 seconds

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_BASE_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={userPosition}
                zoom={15}
                onLoad={() => setMapLoaded(true)}
            >
                {/* Marker for the user's current location */}
                {mapLoaded && <Marker position={userPosition} />}
            </GoogleMap>
        </LoadScript>
    );
};