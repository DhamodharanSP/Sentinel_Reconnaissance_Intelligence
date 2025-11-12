import { motion } from "framer-motion"

export function AnimatedBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary blob */}
      <motion.div
        className="absolute w-96 h-96 bg-gradient-to-br from-primary/40 to-secondary/20 rounded-full blur-3xl blob-float"
        animate={{
          x: [0, 30, -20],
          y: [0, -50, 20],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          top: "-10%",
          left: "-5%",
        }}
      />

      {/* Secondary blob */}
      <motion.div
        className="absolute w-80 h-80 bg-gradient-to-br from-accent/30 to-primary/10 rounded-full blur-3xl blob-float-2"
        animate={{
          x: [-40, 20, -30],
          y: [30, -30, 50],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          top: "10%",
          right: "-10%",
        }}
      />

      {/* Tertiary blob */}
      <motion.div
        className="absolute w-72 h-72 bg-gradient-to-br from-secondary/25 to-accent/20 rounded-full blur-3xl"
        animate={{
          x: [20, -30, 10],
          y: [-20, 40, -10],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          bottom: "-5%",
          right: "10%",
        }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  )
}
