import React from "react"
import { motion } from "framer-motion"

export const DetectionModal = ({ record, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="relative bg-card/90 border border-accent/40 rounded-2xl shadow-lg max-w-lg w-full overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-muted-foreground hover:text-destructive transition-colors"
        >
          ✕
        </button>

        {/* Image */}
        <div className="overflow-hidden">
          <img
            src={record.photo}
            alt={record.name || record.violationType}
            className="w-full h-64 object-cover"
          />
        </div>

        {/* Details */}
        <div className="p-6 space-y-3 text-sm">
          <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
            {record.name || "Unknown Individual"}
          </h2>
          <div className="space-y-2 text-muted-foreground">
            <p>
              <strong className="text-foreground">📍 Location:</strong>{" "}
              <a
                href={`https://www.google.com/maps?q=${record.latitude},${record.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:underline"
              >
                {record.location}
              </a>
            </p>
            <p>
              <strong className="text-foreground">🕒 Time:</strong>{" "}
              {new Date(record.timestamp).toLocaleString()}
            </p>
            <p>
              <strong className="text-foreground">⚙️ Type:</strong>{" "}
              {record.violationType}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
