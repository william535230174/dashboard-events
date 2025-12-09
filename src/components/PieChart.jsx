import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";

export default function PieChart ({percent, color}) {

    const [value, setValue] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setValue(percent), 100);
        return () => clearTimeout(timer);
    }, [percent]);

    return (
        <motion.div
            initial = {{opacity: 0, scale: 0.8}}
            animate = {{opacity: 1, scale: 1}}
            transition = {{duration: 0.4, ease: "easeOut"}}
            className = "flex flex-col items-center"
        >
            <motion.div 
                animate = {{
                    background: `conic-gradient(${color} ${value}%, #ddd 0)`
                }}
                transition = {{duration: 1, ease: "easeOut"}}
                className = "w-32 h-32 rounded-full"
            >
            </motion.div>

            <motion.p
                initial = {{opacity: 0, y: 10}}
                animate = {{opacity: 1, y: 0}}
                transition = {{duration: 0.4, ease: "easeOut"}}
                className = "mt-2 font-semibold"
            >
                {value}%
            </motion.p>
        </motion.div>
    );
}
