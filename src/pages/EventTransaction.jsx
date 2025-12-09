import React, {useEffect, useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import defaultData from "../json/data.json"; 

export default function EventTransaction () {
    const [events, setEvents] = useState ([]);
    const [selected, setSelected] = useState (null);

    useEffect (() => {
        const saved = localStorage.getItem ("events");

        if (saved) {
            setEvents (JSON.parse (saved));
        } else {
            setEvents (defaultData.events);
        }
    }, []);

    return (
        <div className = "animate-fadeIn">
            <h1 className = "text-2xl font-bold mb-5 tracking-wide">
                Event Transaction
            </h1>

            <motion.div layout className = "grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
                <AnimatePresence>
                    {events.map (ev => (
                        <motion.button
                            key = {ev.id}
                            layout
                            initial = {{opacity: 0, y: 10}}
                            animate = {{opacity: 1, y: 0}}
                            exit = {{opacity: 0}}
                            transition = {{duration: 0.25}}
                            whileHover = {{scale: 1.05}}
                            whileTap = {{scale: 0.97}}
                            onClick = {() => setSelected (ev)}
                            className = "p-3 bg-white shadow rounded text-left hover:bg-gray-100"
                        >
                            <p className = "font-semibold">{ev.name}</p>
                            <p className = "text-sm text-gray-500">{ev.date}</p>
                        </motion.button>
                    ))}
                </AnimatePresence>
            </motion.div>

            <AnimatePresence mode = "wait">
                {selected && (
                    <motion.div
                        key = {selected.id}
                        initial = {{opacity: 0, y: 10}}
                        animate = {{opacity: 1, y: 0}}
                        exit = {{opacity: 0, y: -10}}
                        transition = {{duration: 0.3}}
                        className = "p-4 bg-white shadow rounded"
                    >
                        <h2 className = "text-xl font-bold mb-2">{selected.name}</h2>

                        {selected.participants?.length > 0 ? (
                            <motion.ul
                                initial = "hidden"
                                animate = "show"
                                variants = {{
                                    hidden: {opacity: 0},
                                    show: {
                                        opacity: 1,
                                        transition: {staggerChildren: 0.08}
                                    }
                                }}
                                className = "list-disc pl-5"
                            >
                                {selected.participants.map ((p, i) => (
                                    <motion.li
                                        key = {i}
                                        variants = {{
                                            hidden: {opacity: 0, x: -10},
                                            show: {opacity: 1, x: 0}
                                        }}
                                        className = "text-gray-800"
                                    >
                                        {p}
                                    </motion.li>
                                ))}
                            </motion.ul>
                        ) : (
                            <p className = "text-gray-600">No Participants</p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
