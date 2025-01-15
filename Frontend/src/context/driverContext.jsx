import React, { createContext, useState } from 'react';

export const driverContextData = createContext();
export const DriverContext = ({ children }) => {
    const [driver, setDriver] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const updateDriver = (newDriver) => setDriver(newDriver);

    return (
        <driverContextData.Provider value={{ driver, setDriver, loading, setLoading, error, setError, updateDriver }}>
            <>{children}</>
        </driverContextData.Provider>
    );
};
