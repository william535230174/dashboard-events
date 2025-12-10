import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";

export default function PieChart({value, total, color}) { 
    const percentage = total === 0 ? 0 : Math.round((value / total) * 100); 
    const [progress, setProgress] = useState(0);

    useEffect(() => { 
        const timer = setTimeout(() => setProgress(percentage), 150); 
        return () => clearTimeout(timer); 
    }, [percentage]);

    return ( 
        <div className = "relative flex items-center justify-center">
            <motion.div 
                initial = {{opacity: 0, scale: 0.8}}
                animate = {{opacity: 1, scale: 1}}
                transition = {{duration: 0.4, ease: "easeOut"}}
                className = "w-32 h-32 rounded-full"
                style = {{
                    background: `conic-gradient(${color} ${progress}%, #e5e7eb 0)`
                }}
            />

            <div className = "absolute text-center">
                <p className = "text-xl font-bold">{value}</p>
                <p className = "text-sm text-gray-600">total</p>
            </div>
        </div>
    );
}
