import { motion } from "framer-motion"
import { ImageCarousel } from "./ImageCarousel"

export function RightPanel({ isSignUp, carouselImages = [] }) {
  const hasCarouselImages = carouselImages.length > 0

  return (
    <motion.div
      className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-secondary/20 to-accent/10 rounded-r-2xl relative overflow-hidden w-full lg:w-1/2"
      key={isSignUp ? "signup-right-panel" : "signin-right-panel"}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      {hasCarouselImages ? (
        <ImageCarousel images={carouselImages} />
      ) : (
        <div className="relative z-10">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-secondary-foreground">🚀</span>
            </div>
          </motion.div>

          <motion.h2
            className="text-4xl font-bold text-foreground mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Ready to Launch?
          </motion.h2>

          <motion.p
            className="text-lg text-foreground/80 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Create your account today and unlock unlimited possibilities. Join thousands of users already experiencing
            the future.
          </motion.p>
        </div>
      )}

      {!hasCarouselImages && (
        <motion.div
          className="relative z-10 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {[
            { icon: "💡", text: "Innovative Ideas" },
            { icon: "🎯", text: "Goal Oriented" },
            { icon: "⭐", text: "Premium Quality" },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + idx * 0.1, duration: 0.5 }}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-foreground font-medium">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
