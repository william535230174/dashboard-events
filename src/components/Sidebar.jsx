import React, {useState} from "react";
import {motion} from "framer-motion";

export default function Sidebar ({onNavigate, onLogout}) {

    const [confirm, setConfirm] = useState(false);

    return (
        <motion.div
            initial = {{x: -80, opacity: 0}}
            animate = {{x: 0, opacity: 1}}
            transition = {{duration: 0.4, ease: "easeOut"}}
            className = "w-64 bg-white shadow-md p-5 relative"
        >
            <h1 className = "text-xl font-bold mb-5">Testing Panel</h1>

            <motion.button
                whileHover = {{scale: 1.05}}
                whileTap = {{scale: 0.98}}
                className = "block mb-3 transition-all"
                onClick = {() => onNavigate("dashboard")}
            >
                Dashboard
            </motion.button>

            <div>
                <p className = "font-semibold">Event</p>

                <motion.button
                    whileHover = {{scale: 1.05}}
                    whileTap = {{scale: 0.98}}
                    className = "block ml-4 mt-2 transition-all"
                    onClick = {() => onNavigate("event-list")}
                >
                    List Event
                </motion.button>

                <motion.button
                    whileHover = {{scale: 1.05}}
                    whileTap = {{scale: 0.98}}
                    className = "block ml-4 mt-2 transition-all"
                    onClick = {() => onNavigate("event-transaction")}
                >
                    Event Transaction
                </motion.button>
            </div>

            <motion.button
                whileHover = {{scale: 1.07}}
                whileTap = {{scale: 0.97}}
                onClick = {() => setConfirm(true)}
                className = "mt-10 text-red-600 font-semibold transition-all"
            >
                Logout
            </motion.button>

            {confirm && (
                <motion.div
                    initial = {{opacity: 0}}
                    animate = {{opacity: 1}}
                    exit = {{opacity: 0}}
                    transition = {{duration: 0.25}}
                    className = "fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
                >
                    <motion.div
                        initial = {{scale: 0.7, opacity: 0}}
                        animate = {{scale: 1, opacity: 1}}
                        transition = {{duration: 0.25, ease: "easeOut"}}
                        className = "bg-white rounded-lg shadow-xl p-6 w-80 text-center"
                    >
                        <p className = "text-lg font-semibold mb-4">Yakin ingin logout?</p>

                        <div className = "flex justify-center gap-4">
                            <motion.button
                                whileHover = {{scale: 1.05}}
                                whileTap = {{scale: 0.95}}
                                className = "px-4 py-2 bg-gray-200 rounded"
                                onClick = {() => setConfirm(false)}
                            >
                                Cancel
                            </motion.button>

                            <motion.button
                                whileHover = {{scale: 1.05}}
                                whileTap = {{scale: 0.95}}
                                className = "px-4 py-2 bg-red-600 text-white rounded"
                                onClick = {onLogout}
                            >
                                Logout
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </motion.div>
    );
}
