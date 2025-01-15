import { useRef, useEffect } from "react";
import { AuthString } from "./authString";

export const AuthHeader = ({ clicked, setClicked, Auth }) => {
    const ref = useRef();

    useEffect(() => {
        if (!ref.current) return;

        // Apply styles dynamically
        ref.current.style.transition = "margin-top 0.2s linear, opacity 0.5s linear";
        ref.current.style.marginTop = clicked ? "0px" : "-510px";
        ref.current.style.opacity = clicked ? "1" : "0";
    }, [clicked]);

    return (
        <div
            ref={ref}
            className={`h-screen flex flex-col justify-start items-center p-20 relative ${clicked ? "visible" : "invisible"
                }`}
        >
            <span>
                <i
                    onClick={() => setClicked(false)}
                    className="fa-solid fa-xmark text-3xl absolute right-7 top-6 cursor-pointer"
                />
            </span>
            <div className="flex flex-row justify-start items-center flex-wrap gap-28">
                <AuthString
                    text={
                        Auth === "Log in"
                            ? "Sign in to drive & deliver"
                            : "Sign up to drive & deliver"
                    }
                    link={Auth === "Log in" ? "/driver-login" : "/driver-signup"}
                />
                <AuthString
                    text={
                        Auth === "Log in"
                            ? "Sign in to ride"
                            : "Create a rider account"
                    }
                    link={Auth === "Log in" ? "/user-login" : "/user-signup"}
                />
                <AuthString
                    text={
                        Auth === "Log in"
                            ? "Sign in to order delivery with Uber Eats"
                            : "Order delivery with Uber Eats"
                    }
                    link={"/#"}
                />
                <AuthString
                    text={
                        Auth === "Log in"
                            ? "Sign in for Uber for Business"
                            : "Sign up for Uber for Business"
                    }
                    link={"/#"}
                />
            </div>
        </div>
    );
};