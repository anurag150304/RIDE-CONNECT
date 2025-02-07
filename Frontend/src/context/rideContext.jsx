import { createContext, useState } from "react"

export const rideContextData = createContext(null);
export const RideContext = ({ children }) => {
    const [rideData, setRideData] = useState({ pickup: "", drop: "", vehicleType: "Standard", date: "", time: "", fare: "" });
    const [error, setError] = useState(null);
    return (
        <rideContextData.Provider value={{ rideData, setRideData, error, setError }}>
            {children}
        </rideContextData.Provider>
    )
}
