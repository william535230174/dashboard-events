import React, {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";

export default function Login ({onLogin}) {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");

    const submit = () => {
        if (!user && !pass) {
            setError("Username dan Password is Empty!");
            return;
        }

        if (!user) {
            setError("Username is Empty!");
            return;
        }

        if (!pass) {
            setError("Password is Empty!");
            return;
        }

        if (user !== "admin" && pass !== "admin") {
            setError("Username dan Password Incorrect!");
            return;
        }

        if (user !== "admin") {
            setError("Username Incorrect!");
            return;
        }

        if (pass !== "admin") {
            setError("Password Incorrect!");
            return;
        }


        if (user !== "admin") {
            setError("Username Incorrect!");
            return;
        }

        if (pass !== "admin") {
            setError("Password Incorrect!");
            return;
        }

        setError("");
        onLogin();
    };

    return (
        <div className = "flex items-center justify-center h-screen bg-gray-200">

            <motion.div
                initial = {{opacity: 0, y: 40}}
                animate = {{opacity: 1, y: 0}}
                transition = {{duration: 0.4}}
                className = "w-80 p-5 bg-white shadow rounded"
            >
                <h1 className = "text-xl font-bold mb-4 text-center">
                    Login
                </h1>

                <motion.input
                    whileFocus = {{scale: 1.02}}
                    transition = {{duration: 0.15}}
                    className = "border w-full p-2 mb-3 rounded"
                    placeholder = "Username"
                    onChange = {(e) => setUser(e.target.value)}
                />

                <motion.input
                    type = "password"
                    whileFocus = {{scale: 1.02}}
                    transition = {{duration: 0.15}}
                    className = "border w-full p-2 mb-3 rounded"
                    placeholder = "Password"
                    onChange = {(e) => setPass(e.target.value)}
                />

                <AnimatePresence>
                    {error && (
                        <motion.p
                            initial = {{opacity: 0, y: -10}}
                            animate = {{opacity: 1, y: 0}}
                            exit = {{opacity: 0, y: -10}}
                            transition = {{duration: 0.2}}
                            className = "text-red-500 mb-2"
                        >
                            {error}
                        </motion.p>
                    )}
                </AnimatePresence>

                <motion.button
                    whileHover = {{scale: 1.05}}
                    whileTap = {{scale: 0.95}}
                    onClick = {submit}
                    className = "w-full bg-blue-600 text-white p-2 rounded btn-gradient"
                >
                    Confirm
                </motion.button>

            </motion.div>
        </div>
    );
}
