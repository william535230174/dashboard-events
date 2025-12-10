import React, {useState, useEffect} from "react";
import {Pencil, Trash2, ArrowUpDown} from "lucide-react";
import {motion, AnimatePresence} from "framer-motion";
import defaultJson from "../json/data.json";

export default function EventList () {
    const [events, setEvents] = useState ([]);
    const [form, setForm] = useState ({
        name: "",
        date: "",
        location: "",
        description: "",
        start: "",
        end: "",
        status: ""
    });
    const [editId, setEditId] = useState (null);
    const [search, setSearch] = useState ("");
    const [sortType, setSortType] = useState ("date");
    const [toast, setToast] = useState (null);

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

    const showToast = (msg, type) => {
        setToast ({msg, type});
        setTimeout (() => setToast (null), 2000);
    };

    const add = () => {
        if (!form.name || !form.date || !form.location || !form.description || !form.start || !form.end || !form.status) {
            showToast ("Isi semua form!", "error");
            return;
        }

        setEvents ([
            ...events,
            {
                id: Date.now (),
                name: form.name,
                date: form.date,
                location: form.location,
                description: form.description,
                start: form.start,
                end: form.end,
                status: form.status,
                participants: []
            }
        ]);

        setForm ({name: "", date: "", location: "", description: "", start: "", end: "", status: ""});
        showToast ("Event berhasil ditambahkan!", "success");
    };

    const update = () => {
        if (!form.name || !form.date || !form.location || !form.description || !form.start || !form.end || !form.status) {
            showToast ("Isi semua form!", "error");
            return;
        }

        setEvents (
            events.map (ev =>
                ev.id === editId ? {...ev, ...form} : ev
            )
        );

        setEditId (null);
        setForm ({name: "", date: "", location: "", description: "", start: "", end: "", status: ""});
        showToast ("Event berhasil diperbarui!", "success");
    };

    const edit = (ev) => {
        setEditId (ev.id);
        setForm ({
            name: ev.name,
            date: ev.date,
            location: ev.location,
            description: ev.description,
            start: ev.start,
            end: ev.end,
            status: ev.status
        });
    };

    const updateStatus = (id, status) => {
        setEvents (
            events.map (ev =>
                ev.id === id ? {...ev, status} : ev
            )
        );
        showToast ("Status diperbarui", "success");
    };

    const openDelete = (id) => {
        setDeleteId (id);
        setConfirmDelete (true);
    };

    const del = () => {
        setEvents (events.filter (ev => ev.id !== deleteId));
        setConfirmDelete (false);
        setDeleteId (null);
        showToast ("Event dihapus!", "success");
    };

    const filtered = events
        .filter (ev => ev.name.toLowerCase ().includes (search.toLowerCase ()))
        .sort ((a, b) => {
            if (sortType === "az") return a.name.localeCompare (b.name);
            if (sortType === "za") return b.name.localeCompare (a.name);
            return new Date (a.date) - new Date (b.date);
        });

    const badge = (st) => {
        if (st === "scheduled") return "px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs";
        if (st === "on going") return "px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs";
        if (st === "finished") return "px-2 py-1 bg-green-100 text-green-700 rounded text-xs";
        return "px-2 py-1 bg-red-100 text-red-700 rounded text-xs";
    };

    return (
        <div className = "animate-fadeIn">
            <h1 className = "text-2xl font-bold mb-5 tracking-wide">
                List Events
            </h1>

            <div className = "flex gap-3 mb-4">
                <input
                    className = "border p-2 rounded w-64"
                    placeholder = "Search event..."
                    value = {search}
                    onChange = {(e) => setSearch (e.target.value)}
                />

                <button
                    className = "px-3 py-2 bg-gray-200 rounded flex items-center gap-2"
                    onClick = {() =>
                        setSortType (sortType === "az" ? "za" : sortType === "za" ? "date" : "az")
                    }
                >
                    <ArrowUpDown size = {16} />
                    {sortType === "az" ? "A-Z" : sortType === "za" ? "Z-A" : "Tanggal"}
                </button>
            </div>

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

                <input 
                    className = "border p-2 w-full mb-2"
                    placeholder = "Location"
                    value = {form.location}
                    onChange = {(e) => setForm ({...form, location: e.target.value})}
                />

                <input 
                    className = "border p-2 w-full mb-2"
                    placeholder = "Description"
                    value = {form.description}
                    onChange = {(e) => setForm ({...form, description: e.target.value})}
                />

                <div className = "flex gap-2">
                    <input 
                        type = "time"
                        className = "border p-2 w-full mb-2"
                        value = {form.start}
                        onChange = {(e) => setForm ({...form, start: e.target.value})}
                    />

                    <input 
                        type = "time"
                        className = "border p-2 w-full mb-2"
                        value = {form.end}
                        onChange = {(e) => setForm ({...form, end: e.target.value})}
                    />
                </div>

                <select
                    className = "border p-2 w-full mb-3 rounded"
                    value = {form.status}
                    onChange = {(e) => setForm ({...form, status: e.target.value})}
                >
                    <option value = "">Pilih Status</option>
                    <option value = "scheduled">Scheduled</option>
                    <option value = "on going">On Going</option>
                    <option value = "finished">Finished</option>
                    <option value = "canceled">Canceled</option>
                </select>

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
                        <th className = "p-2">Status</th>
                        <th className = "p-2">Action</th>
                    </tr>
                </thead>

                <motion.tbody
                    layout
                    transition = {{staggerChildren: 0.1}}
                >
                    <AnimatePresence>
                        {filtered.map (ev => (
                            <motion.tr 
                                key = {ev.id}
                                layout
                                initial = {{opacity: 0, y: 10}}
                                animate = {{opacity: 1, y: 0}}
                                exit = {{opacity: 0, y: -10, scale: 0.9}}
                                transition = {{duration: 0.25}}
                                className = "text-center border-b"
                            >
                                <td className = "p-2 text-left">
                                    <div className = "font-semibold">{ev.name}</div>
                                    <div className = "text-sm text-gray-600">{ev.location}</div>
                                    <div className = "text-xs text-gray-500">{ev.description}</div>
                                    <div className = "text-xs text-gray-500">{ev.start} - {ev.end}</div>
                                </td>

                                <td className = "p-2">{ev.date}</td>

                                <td className = "p-2">
                                    <motion.div
                                        initial = {{opacity: 0}}
                                        animate = {{opacity: 1}}
                                        transition = {{duration: 0.2}}
                                        className = "flex flex-col items-center gap-1"
                                    >
                                        <span className = {badge(ev.status)}>
                                            {ev.status}
                                        </span>

                                        <select
                                            className = "border px-2 py-1 text-xs rounded bg-white"
                                            value = {ev.status}
                                            onChange = {(e) => updateStatus(ev.id, e.target.value)}
                                        >
                                            <option value = "scheduled">Scheduled</option>
                                            <option value = "on going">On Going</option>
                                            <option value = "finished">Finished</option>
                                            <option value = "canceled">Canceled</option>
                                        </select>
                                    </motion.div>
                                </td>

                                <td className = "p-2 flex flex-col items-center gap-2">
                                    <motion.button  
                                        whileHover = {{scale: 1.2}}
                                        onClick = {() => edit (ev)}
                                        className = "text-blue-600 hover:text-blue-800"
                                    >
                                        <Pencil size = {18} />
                                    </motion.button>

                                    <motion.button 
                                        whileHover = {{scale: 1.2}}
                                        onClick = {() => openDelete (ev.id)}
                                        className = "text-red-600 hover:text-red-800"
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

            {toast && (
                <motion.div
                    initial = {{opacity: 0, y: 20}}
                    animate = {{opacity: 1, y: 0}}
                    exit = {{opacity: 0, y: 20}}
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
