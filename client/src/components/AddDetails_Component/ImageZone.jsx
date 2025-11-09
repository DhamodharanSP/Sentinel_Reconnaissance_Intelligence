// components/AddDetails_Component/ImageZone.jsx
import React, { useRef, useState } from "react"
import CameraModal from "./CameraModal"
import { enhanceImageDataUrl } from "./utils"

export default function ImageZone({ imageData, setImageData }) {
  const inputRef = useRef(null)
  const [dragActive, setDragActive] = useState(false)
  const [cameraOpen, setCameraOpen] = useState(false)

  function handleFiles(files) {
    if (!files || files.length === 0) return
    const file = files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      enhanceImageDataUrl(e.target.result).then((enhanced) => setImageData(enhanced))
    }
    reader.readAsDataURL(file)
  }

  function onDrop(e) {
    e.preventDefault()
    setDragActive(false)
    handleFiles(e.dataTransfer.files)
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragActive(true)
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={onDrop}
        className={`w-full rounded-lg p-6 flex flex-col items-center justify-center gap-4 transition-all ${
          dragActive
            ? "border-accent border-2 shadow-lg glow-pulse"
            : "border-dashed border-border/60 hover:border-accent/60 hover:shadow-md"
        }`}
      >
        {imageData ? (
          <div className="w-full flex flex-col items-center gap-3">
            <img
              alt="preview"
              src={imageData}
              className="max-h-64 object-contain rounded-md shadow-lg"
              style={{ filter: "contrast(1.05) saturate(1.03)" }}
            />
            <div className="flex gap-3 w-full">
              <button
                type="button"
                onClick={() => setImageData(null)}
                className="flex-1 py-2 rounded-md bg-muted text-muted-foreground"
              >
                Remove
              </button>
              <button
                type="button"
                onClick={() => setCameraOpen(true)}
                className="flex-1 py-2 rounded-md bg-accent text-accent-foreground"
              >
                Retake
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full text-center text-muted-foreground">
            <p className="mb-2">Drag and drop an image here, or</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => inputRef.current?.click()}
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground"
              >
                Upload Image
              </button>
              <button
                onClick={() => setCameraOpen(true)}
                className="px-4 py-2 rounded-md border border-border bg-card"
              >
                Open Camera
              </button>
            </div>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleFiles(e.target.files)}
              className="hidden"
            />
          </div>
        )}
      </div>

      {cameraOpen && (
        <CameraModal
          onClose={() => setCameraOpen(false)}
          onCapture={(dataUrl) => {
            enhanceImageDataUrl(dataUrl).then((enh) => setImageData(enh))
            setCameraOpen(false)
          }}
        />
      )}
    </div>
  )
}
