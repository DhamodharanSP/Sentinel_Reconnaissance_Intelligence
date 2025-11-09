import React from "react"
import { motion } from "framer-motion"

export const DetectionFilter = ({
  filterType,
  violationType,
  onFilterChange,
}) => {
  const violationOptions = [
    "All",
    "FRT",
    "Weapon Detection",
    "Behavior anomaly Detection",
    "Congestion Detection",
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap justify-center gap-4 mb-6"
    >
      {/* Filter Controls */}
      <div className="flex items-center gap-3 bg-card/60 border border-border rounded-xl backdrop-blur-md px-4 py-2 shadow-sm">
        <button
          onClick={() => onFilterChange("date")}
          className={`px-3 py-1 rounded-md text-sm transition-all ${
            filterType === "date"
              ? "bg-accent/20 text-accent font-medium"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Date-wise
        </button>
        <button
          onClick={() => onFilterChange("violation", violationType)}
          className={`px-3 py-1 rounded-md text-sm transition-all ${
            filterType === "violation"
              ? "bg-accent/20 text-accent font-medium"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Violation Type
        </button>

        {filterType === "violation" && (
          <select
            value={violationType}
            onChange={(e) => onFilterChange("violation", e.target.value)}
            className="ml-2 border border-border rounded-lg px-3 py-1 bg-background text-foreground text-sm"
          >
            {violationOptions.map((opt, idx) => (
              <option key={idx} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        )}
      </div>
    </motion.div>
  )
}
