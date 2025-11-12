import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function ImageCarousel({ images, autoplay = true, autoplayInterval = 5000 }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!autoplay || images.length === 0) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, autoplayInterval)

    return () => clearInterval(timer)
  }, [autoplay, autoplayInterval, images.length])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  if (images.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/10 rounded-lg">
        <p className="text-muted-foreground">No images added yet</p>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors backdrop-blur-sm"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors backdrop-blur-sm"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {images.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all ${
                  idx === currentIndex ? "bg-white w-8 h-2" : "bg-white/50 w-2 h-2 hover:bg-white/70"
                }`}
                style={{ borderRadius: "9999px" }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
