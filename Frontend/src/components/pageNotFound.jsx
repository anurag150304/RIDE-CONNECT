import React from "react";
import { useNavigate } from "react-router-dom";
import not_found from "../assets/png/not_found.jpg"

export const PageNotFound = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate("/");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="max-w-lg text-center flex flex-col justify-center items-center">
                <img
                    src={not_found}
                    alt="Page Not Found Illustration"
                    className="w-[50%] rounded-lg mix-blend-darken"
                />
                <h2 className="text-2xl font-semibold text-gray-800 mt-2">
                    Oops! Page Not Found
                </h2>
                <p className="text-gray-600 mt-3">
                    We can't seem to find the page you're looking for. It might have been moved or no longer exists.
                </p>
                <button
                    onClick={handleGoBack}
                    className="mt-6 px-6 py-3 text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};