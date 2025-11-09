// components/AddDetails_Component/Stepper.jsx
import React from "react"
import { motion } from "framer-motion"

export default function Stepper({ steps, active }) {
  return (
    <div className="w-full flex items-center gap-4 mb-6">
      {steps.map((s, i) => (
        <div key={s} className="flex-1 relative">
          {/* Step line */}
          <div
            className={`h-1 rounded-full transition-colors ${
              i <= active ? "bg-accent/80" : "bg-border/40"
            }`}
          />

          {/* Step circle */}
          <motion.div
            layout
            className={`absolute left-1/2 -translate-x-1/2 -top-3 w-8 h-8 rounded-full flex items-center justify-center border border-border bg-card text-card-foreground ${
              i === active ? "ring-4 ring-accent/25 glow-pulse" : ""
            }`}
          >
            <span className="text-sm font-semibold">{i + 1}</span>
          </motion.div>

          {/* Label */}
          <p className="text-center mt-6 text-xs text-muted-foreground">{s}</p>
        </div>
      ))}
    </div>
  )
}
