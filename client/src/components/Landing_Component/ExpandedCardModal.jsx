import React from "react";
import { motion, AnimatePresence } from "framer-motion";


export default function ExpandedCardModal({ obj, onClose }) {
if (!obj) return null;
return (
<AnimatePresence>
<motion.div className="fixed inset-0 z-50 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
<motion.div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
<motion.div layoutId={`card-container-${obj.id}`} className="relative w-11/12 md:w-2/3 lg:w-1/2 p-6 rounded-2xl bg-card border border-border shadow-2xl z-10" initial={{ scale: 0.92, rotateY: -12 }} animate={{ scale: 1, rotateY: 0 }} exit={{ scale: 0.96, rotateY: 8, opacity: 0 }}>
<div className="grid md:grid-cols-2 gap-6 items-start">
<motion.img layoutId={`card-image-${obj.id}`} src={obj.img} alt={obj.title} className="w-full h-64 object-cover rounded-lg" />
<div>
<motion.h3 layoutId={`card-title-${obj.id}`} className="text-2xl font-bold mb-3">{obj.title}</motion.h3>
<div className="space-y-2 text-sm text-muted-foreground">{obj.bullets.map((b, i) => (<p key={i}>• {b}</p>))}</div>
<div className="mt-6 flex gap-3">
<button onClick={onClose} className="px-4 py-2 rounded-md border border-border">Close</button>
<button className="px-4 py-2 rounded-md bg-primary text-primary-foreground">Explore</button>
</div>
</div>
</div>
</motion.div>
</motion.div>
</AnimatePresence>
);
}