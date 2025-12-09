import React, {useState, useEffect} from "react";
import {Pencil, Trash2} from "lucide-react";
import {motion, AnimatePresence} from "framer-motion";
import defaultJson from "../json/data.json";

export default function EventList () {
    const [events, setEvents] = useState ([]);
    const [form, setForm] = useState ({name: "", date: ""});
    const [editId, setEditId] = useState (null);

    // state untuk konfirmasi delete
    const [confirmDelete, setConfirmDelete] = useState (false);
    const [deleteId, setDeleteId] = useState (null);

    useEffect (() => {
        const saved = localStorage.getItem ("events");

        if (saved) {
            setEvents (JSON.parse (saved));
        } else {
            setEvents (defaultJson.events);
            localStorage.setItem ("events", JSON.stringify (defaultJson.events));
        }
    }, []);

    useEffect (() => {
        if (events.length > 0) {
            localStorage.setItem ("events", JSON.stringify (events));
        }
    }, [events]);

    const add = () => {
        if (!form.name || !form.date) return;

        setEvents ([
            ...events,
            {
                id: Date.now (),
                name: form.name,
                date: form.date,
                participants: []
            }
        ]);

        setForm ({name: "", date: ""});
    };

    const update = () => {
        setEvents (
            events.map (ev =>
                ev.id === editId ? {...ev, ...form} : ev
            )
        );

        setEditId (null);
        setForm ({name: "", date: ""});
    };

    const edit = (ev) => {
        setEditId (ev.id);
        setForm ({name: ev.name, date: ev.date});
    };

    const openDelete = (id) => {
        setDeleteId (id);
        setConfirmDelete (true);
    };

    const del = () => {
        setEvents (events.filter (ev => ev.id !== deleteId));
        setConfirmDelete (false);
        setDeleteId (null);
    };

    return (
        <div className = "animate-fadeIn">
            <h1 className = "text-2xl font-bold mb-5 tracking-wide">
                List Events
            </h1>

            <motion.div 
                initial = {{opacity: 0, y: -10}}
                animate = {{opacity: 1, y: 0}}
                transition = {{duration: 0.4}}
                className = "p-4 bg-white shadow rounded w-96"
            >
                <input 
                    className = "border p-2 w-full mb-2"
                    placeholder = "Event Name"
                    value = {form.name}
                    onChange = {(e) => setForm ({...form, name: e.target.value})}
                />

                <input 
                    type = "date"
                    className = "border p-2 w-full mb-2"
                    value = {form.date}
                    onChange = {(e) => setForm ({...form, date: e.target.value})}
                />

                {editId ? (
                    <motion.button 
                        whileHover = {{scale: 1.05}}
                        whileTap = {{scale: 0.95}}
                        className = "bg-yellow-600 text-white px-4 py-2 rounded"
                        onClick = {update}
                    >
                        Update
                    </motion.button>
                ) : (
                    <motion.button 
                        whileHover = {{scale: 1.05}}
                        whileTap = {{scale: 0.95}}
                        className = "bg-blue-600 text-white px-4 py-2 rounded"
                        onClick = {add}
                    >
                        + Add
                    </motion.button>
                )}
            </motion.div>

            <table className = "mt-5 w-full bg-white shadow rounded overflow-hidden">
                <thead>
                    <tr className = "bg-gray-100">
                        <th className = "p-2">Event</th>
                        <th className = "p-2">Tanggal</th>
                        <th className = "p-2">Action</th>
                    </tr>
                </thead>

                <motion.tbody
                    layout
                    transition = {{staggerChildren: 0.1}}
                >
                    <AnimatePresence>
                        {events.map (ev => (
                            <motion.tr 
                                key = {ev.id}
                                layout
                                initial = {{opacity: 0, y: 10}}
                                animate = {{opacity: 1, y: 0}}
                                exit = {{opacity: 0, y: -10, scale: 0.9}}
                                transition = {{duration: 0.25}}
                                className = "text-center border-b"
                            >
                                <td className = "p-2 text-left">{ev.name}</td>
                                <td className = "p-2">{ev.date}</td>

                                <td className = "p-2 flex justify-center gap-4">
                                    <motion.button  
                                        whileHover = {{scale: 1.2}}
                                        onClick = {() => edit (ev)}
                                        className = "text-blue-600 hover:text-blue-800"
                                        title = "Edit"
                                    >
                                        <Pencil size = {18} />
                                    </motion.button>

                                    <motion.button 
                                        whileHover = {{scale: 1.2}}
                                        onClick = {() => openDelete (ev.id)}
                                        className = "text-red-600 hover:text-red-800"
                                        title = "Delete"
                                    >
                                        <Trash2 size = {18} />
                                    </motion.button>
                                </td>
                            </motion.tr>
                        ))}
                    </AnimatePresence>
                </motion.tbody>
            </table>

            {confirmDelete && (
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
                        <p className = "text-lg font-semibold mb-4">
                            Yakin ingin menghapus event ini?
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
        </div>
    );
}
