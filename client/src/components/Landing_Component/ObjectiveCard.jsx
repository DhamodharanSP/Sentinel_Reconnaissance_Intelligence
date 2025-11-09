import React from "react";
import { motion } from "framer-motion";


export default function ObjectiveCard({ obj, onClick, isActive }) {
return (
<motion.div
layoutId={`card-container-${obj.id}`}
whileHover={{ scale: 1.03 }}
className={`cursor-pointer rounded-xl p-4 border border-border bg-card ${isActive ? "ring-2" : ""}`}
onClick={() => onClick(obj)}
>
<motion.img layoutId={`card-image-${obj.id}`} src={obj.img} alt={obj.title} className="w-full h-36 object-cover rounded-md mb-3" />
<motion.h3 layoutId={`card-title-${obj.id}`} className="text-lg font-semibold mb-1">{obj.title}</motion.h3>
<p className="text-sm text-muted-foreground">{obj.bullets[0]}</p>
</motion.div>
);
}