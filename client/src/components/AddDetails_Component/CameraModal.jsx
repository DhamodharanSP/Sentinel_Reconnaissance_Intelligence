// components/AddDetails_Component/CameraModal.jsx
import React, { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function CameraModal({ onClose, onCapture }) {
  const videoRef = useRef(null)
  const streamRef = useRef(null)

  useEffect(() => {
    let mounted = true
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        })
        streamRef.current = stream
        if (mounted && videoRef.current) videoRef.current.srcObject = stream
      } catch (err) {
        console.error("Camera access error:", err)
      }
    }
    startCamera()
    return () => {
      mounted = false
      if (streamRef.current)
        streamRef.current.getTracks().forEach((t) => t.stop())
    }
  }, [])

  const handleCapture = () => {
    const video = videoRef.current
    if (!video) return
    const canvas = document.createElement("canvas")
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext("2d")
    ctx.drawImage(video, 0, 0)
    const dataUrl = canvas.toDataURL("image/png")
    onCapture(dataUrl)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-card rounded-lg p-5 w-[90%] max-w-3xl shadow-2xl border border-border"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full rounded-md bg-black"
        />
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleCapture}
            className="flex-1 py-2 rounded-md bg-accent text-accent-foreground"
          >
            Capture
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-md bg-muted text-muted-foreground"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  )
}
