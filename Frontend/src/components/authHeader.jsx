import { motion, AnimatePresence } from "framer-motion";
import { AuthString } from "./authString";

export const AuthHeader = ({ clicked, setClicked, Auth }) => {

    return (
        <AnimatePresence>
            {clicked && (
                <motion.div
                    initial={{ y: "-100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    className="h-fit w-fit flex flex-row justify-center items-center p-16 absolute z-50 bg-white rounded-xl shadow-inner shadow-black my-2 mx-6">
                    <span>
                        <i
                            onClick={() => setClicked(false)}
                            className="fa-solid fa-xmark text-2xl opacity-60 hover:opacity-100 absolute right-7 top-6 cursor-pointer"
                        />
                    </span>
                    <div className="flex flex-row justify-center items-center gap-20 w-fit max-[1060px]:flex-wrap">
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
                    </div>
                </motion.div>)}
        </AnimatePresence>
    );
};