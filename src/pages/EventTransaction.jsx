import React, {useEffect, useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {Pencil, Trash2} from "lucide-react";
import defaultData from "../json/data.json";

export default function EventTransaction () {
    const [events, setEvents] = useState ([]);
    const [selected, setSelected] = useState (null);
    const [toast, setToast] = useState (null);
    const [confirmDelete, setConfirmDelete] = useState (false);
    const [deleteId, setDeleteId] = useState (null);

    useEffect (() => {
        const saved = localStorage.getItem ("events");

        if (saved) {
            setEvents (JSON.parse (saved));
        } else {
            setEvents (defaultData.events);
        }
    }, []);

    const showToast = (msg, type) => {
        setToast ({msg, type});
        setTimeout (() => setToast (null), 2000);
    };

    const badge = (st) => {
        if (st === "scheduled") return "px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs";
        if (st === "on going") return "px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs";
        if (st === "finished") return "px-2 py-1 bg-green-100 text-green-700 rounded text-xs";
        return "px-2 py-1 bg-red-100 text-red-700 rounded text-xs";
    };

    const updateStatus = (id, status) => {
        setEvents (
            events.map (ev =>
                ev.id === id ? {...ev, status} : ev
            )
        );
        localStorage.setItem ("events", JSON.stringify (
            events.map (ev =>
                ev.id === id ? {...ev, status} : ev
            )
        ));
        showToast ("Status Updated!", "Success!");
    };

    const openDelete = (id) => {
        setDeleteId (id);
        setConfirmDelete (true);
    };

    const del = () => {
        const updated = events.filter (ev => ev.id !== deleteId);
        setEvents (updated);
        localStorage.setItem ("events", JSON.stringify(updated));
        setConfirmDelete (false);
        setDeleteId (null);
        setSelected (null);
        showToast("Event deleted", "success");
    };

    return (
        <div className="animate-fadeIn">
            <h1 className="text-2xl font-bold mb-5 tracking-wide">
                Event Transaction
            </h1>

            <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
                <AnimatePresence>
                    {events.map(ev => (
                        <motion.button
                            key={ev.id}
                            layout
                            initial={{opacity: 0, y: 10}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.25}}
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.97}}
                            onClick={() => setSelected(ev)}
                            className="p-3 bg-white shadow rounded text-left hover:bg-gray-100"
                        >
                            <p className="font-semibold">{ev.name}</p>
                            <p className="text-sm text-gray-500">{ev.date}</p>

                            <div className="mt-1">
                                <span className={badge(ev.status)}>
                                    {ev.status}
                                </span>
                            </div>
                        </motion.button>
                    ))}
                </AnimatePresence>
            </motion.div>

            <AnimatePresence mode="wait">
                {selected && (
                    <motion.div
                        key={selected.id}
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -10}}
                        transition={{duration: 0.3}}
                        className="p-4 bg-white shadow rounded"
                    >
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-xl font-bold">{selected.name}</h2>

                            <div className="flex gap-3">
                                <select
                                    className="border p-1 rounded text-sm"
                                    value={selected.status}
                                    onChange={(e) => updateStatus(selected.id, e.target.value)}
                                >
                                    <option value="scheduled">Scheduled</option>
                                    <option value="on going">On Going</option>
                                    <option value="finished">Finished</option>
                                    <option value="canceled">Canceled</option>
                                </select>

                                <motion.button
                                    whileHover={{scale: 1.1}}
                                    onClick={() => openDelete(selected.id)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    <Trash2 size={20} />
                                </motion.button>
                            </div>
                        </div>

                        <p className = "text-gray-700 mb-1">
                            <b>Date:</b> {selected.date}
                        </p> 

                        <p className = "text-gray-700 mb-1"><b>Status:</b> {selected.status}</p>
                        <p className = "text-gray-700 mb-3"><b>Participants:</b></p>

                        {selected.participants?.length > 0 ? (
                            <motion.ul
                                initial = "hidden"
                                animate = "show"
                                variants = {{
                                    hidden: {opacity: 0},
                                    show: {opacity: 1, transition: {staggerChildren: 0.08}}
                                }}
                                className = "list-disc pl-5"
                            >
                                {selected.participants.map((p, i) => (
                                    <motion.li
                                        key={i}
                                        variants={{
                                            hidden: {opacity: 0, x: -10},
                                            show: {opacity: 1, x: 0}
                                        }}
                                        className="text-gray-800"
                                    >
                                        {p}
                                    </motion.li>
                                ))}
                            </motion.ul>
                        ) : (
                            <p className="text-gray-600">No Participants</p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {confirmDelete && (
                <motion.div
                    initial = {{opacity: 0}}
                    animate = {{opacity: 1}}
                    exit = {{opacity: 0}}
                    transition = {{duration: 0.25}}
                    className = "fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    
                    <motion.div
                        initial = {{scale: 0.7, opacity: 0}}
                        animate = {{scale: 1, opacity: 1}}
                        transition = {{duration: 0.25}}
                        className = "bg-white rounded-lg shadow-xl p-6 w-80 text-center">
                        <p className = "text-lg font-semibold mb-4">
                            Delete this event?
                        </p>

                        <div className = "flex justify-center gap-4">
                            <motion.button
                                whileHover = {{scale: 1.05}}
                                whileTap = {{scale: 0.95}}
                                className = "px-4 py-2 bg-gray-200 rounded"
                                onClick = {() => setConfirmDelete(false)}
                            >
                                Cancel
                            </motion.button>

                            <motion.button
                                whileHover = {{scale: 1.05}}
                                whileTap = {{scale: 0.95}}
                                className = "px-4 py-2 bg-red-600 text-white rounded"
                                onClick = {del}
                            >
                                Delete
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {toast && (
                <motion.div
                    initial = {{opacity: 0, y: 20}}
                    animate = {{opacity: 1, y: 0}}
                    exit  = {{opacity: 0, y: 20}}
                    className = {
                        toast.type === "success"
                        ? "fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow"
                        : "fixed bottom-5 right-5 bg-red-600 text-white px-4 py-2 rounded shadow"
                    }
                >
                    {toast.msg}
                </motion.div>
            )}
        </div>
    );
}
