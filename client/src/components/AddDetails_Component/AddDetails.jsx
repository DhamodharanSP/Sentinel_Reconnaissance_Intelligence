import React, { useState, useRef, useEffect, useContext } from "react"
import { motion } from "framer-motion"
import { ThemeContext } from "../ui/theme-provider"
import Stepper from "./Stepper"
import ImageZone from "./ImageZone"
import CustomFieldsEditor from "./CustomFieldsEditor"
import { dataUrlToBlob } from "./utils"

export default function AddDetails() {
  const { isDark } = useContext(ThemeContext)
  const steps = ["Personal", "Photo", "Case Details", "Review"]

  const [active, setActive] = useState(0)
  const [mode, setMode] = useState(null)
  const [lockedMode, setLockedMode] = useState(false)
  const [imageData, setImageData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)
  const [customFields, setCustomFields] = useState([])

  const [form, setForm] = useState({
    fullName: "",
    alias: "",
    gender: "",
    estimatedAge: "",
    height: "",
    weight: "",
    bodyType: "",
    skinTone: "",
    hair: "",
    facialHair: "",
    eyeColor: "",
    scarsTattoos: "",
    crimeType: "",
    lastSeen: "",
    reportedBy: "",
    notes: "",
  })

  const fieldRefs = useRef([])
  useEffect(() => {
    fieldRefs.current = fieldRefs.current.slice(0, 40)
  }, [])

  const goNext = () => setActive((p) => Math.min(p + 1, steps.length - 1))
  const goPrev = () => setActive((p) => Math.max(p - 1, 0))

  const handleKeyDown = (e, idx) => {
    if (e.key === "Enter") {
      e.preventDefault()
      const next = fieldRefs.current[idx + 1]
      if (next) next.focus()
      else goNext()
    }
  }

  const handleDataEntry = () => {
    if (!lockedMode && mode) setLockedMode(true)
  }

  const clearForm = () => {
    setForm({
      fullName: "",
      alias: "",
      gender: "",
      estimatedAge: "",
      height: "",
      weight: "",
      bodyType: "",
      skinTone: "",
      hair: "",
      facialHair: "",
      eyeColor: "",
      scarsTattoos: "",
      crimeType: "",
      lastSeen: "",
      reportedBy: "",
      notes: "",
    })
    setCustomFields([])
    setImageData(null)
    setLockedMode(false)
  }

  async function handleSubmit() {
    setLoading(true)
    try {
      const payload = {
        mode,
        ...form,
        scarsTattoos: form.scarsTattoos
          ? form.scarsTattoos.split(",").map((s) => s.trim())
          : [],
        customFields: customFields.map((f) => ({
          label: f.label,
          value: f.value,
        })),
      }

      const body = new FormData()
      body.append("payload", JSON.stringify(payload))
      if (imageData) {
        const blob = dataUrlToBlob(imageData)
        body.append("photo", blob, "photo.png")
      }

      const res = await fetch("http://localhost:5000/api/criminals", {
        method: "POST",
        body,
      })
      if (!res.ok) throw new Error("Save failed")

      setToast({ type: "success", message: "Record saved successfully" })
      clearForm()
      setLockedMode(false)
      setMode(null)
      setActive(0)
    } catch (err) {
      console.error(err)
      setToast({ type: "error", message: "Error saving record" })
    } finally {
      setLoading(false)
      setTimeout(() => setToast(null), 3000)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-xl p-6 shadow-lg border border-border relative overflow-hidden"
      >
        {/* Mode Selector */}
        <div className="relative flex items-center justify-center gap-3 mb-10">
          {["criminal", "missing"].map((type) => {
            const isActive = mode === type
            const isDisabled = lockedMode && mode !== type

            return (
              <motion.button
                key={type}
                disabled={isDisabled}
                onClick={() => {
                  if (!lockedMode) setMode(type)
                }}
                whileHover={!isDisabled ? { scale: 1.05 } : {}}
                whileTap={!isDisabled ? { scale: 0.97 } : {}}
                className={`relative px-5 py-2 font-semibold rounded-full transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground"
                } ${isDisabled ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                {type === "criminal" ? "Criminal Data" : "Missing Person"}

                {/* Animated Gradient Connector */}
                {isActive && (
                  <motion.div
                    layoutId="mode-connector"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-[5px] h-12 rounded-b-full gradient-shift glow-pulse"
                    style={{
                      backgroundImage:
                        "linear-gradient(to bottom, var(--primary), var(--accent))",
                    }}
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    exit={{ opacity: 0, scaleY: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>

        <Stepper steps={steps} active={active} />

        {/* Step 1 */}
        {active === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid grid-cols-2 gap-4">
              {[
                "fullName",
                "alias",
                "gender",
                "estimatedAge",
                "height",
                "weight",
                "bodyType",
                "skinTone",
                "hair",
                "facialHair",
                "eyeColor",
                "scarsTattoos",
              ].map((field, i) => (
                <input
                  key={i}
                  ref={(el) => (fieldRefs.current[i] = el)}
                  value={form[field]}
                  onChange={(e) => {
                    setForm({ ...form, [field]: e.target.value })
                    handleDataEntry()
                  }}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  placeholder={
                    field === "scarsTattoos"
                      ? "Scars/Tattoos (comma separated)"
                      : field
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())
                  }
                  className="rounded-md border border-border px-3 py-2 bg-input"
                />
              ))}
            </div>

            <textarea
              placeholder="Notes (optional)"
              value={form.notes}
              onChange={(e) => {
                setForm({ ...form, notes: e.target.value })
                handleDataEntry()
              }}
              className="mt-4 w-full rounded-md border border-border px-3 py-2 bg-input"
            />

            <div className="flex justify-between mt-4">
              <button
                onClick={clearForm}
                className="px-4 py-2 rounded-md bg-muted text-muted-foreground"
              >
                Clear
              </button>
              <button
                onClick={goNext}
                disabled={!mode}
                className={`px-4 py-2 rounded-md ${
                  mode
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                Next
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2 - Photo */}
        {active === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ImageZone
              imageData={imageData}
              setImageData={(img) => {
                setImageData(img)
                if (img) handleDataEntry()
              }}
            />

            <div className="flex justify-between mt-4">
              <button
                onClick={goPrev}
                className="px-4 py-2 rounded-md bg-muted text-muted-foreground"
              >
                Back
              </button>
              <button
                onClick={goNext}
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3 - Case Details */}
        {active === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid grid-cols-2 gap-4">
              {mode === "criminal" ? (
                <>
                  <input
                    value={form.crimeType}
                    onChange={(e) => {
                      setForm({ ...form, crimeType: e.target.value })
                      handleDataEntry()
                    }}
                    placeholder="Crime Type"
                    className="rounded-md border border-border px-3 py-2 bg-input"
                  />
                  <input
                    value={form.reportedBy}
                    onChange={(e) => {
                      setForm({ ...form, reportedBy: e.target.value })
                      handleDataEntry()
                    }}
                    placeholder="Reported By"
                    className="rounded-md border border-border px-3 py-2 bg-input"
                  />
                </>
              ) : (
                <>
                  <input
                    value={form.lastSeen}
                    onChange={(e) => {
                      setForm({ ...form, lastSeen: e.target.value })
                      handleDataEntry()
                    }}
                    placeholder="Last Seen Location"
                    className="rounded-md border border-border px-3 py-2 bg-input"
                  />
                  <input
                    value={form.reportedBy}
                    onChange={(e) => {
                      setForm({ ...form, reportedBy: e.target.value })
                      handleDataEntry()
                    }}
                    placeholder="Contact (Reporter)"
                    className="rounded-md border border-border px-3 py-2 bg-input"
                  />
                </>
              )}
            </div>

            <CustomFieldsEditor
              fields={customFields}
              setFields={(fields) => {
                setCustomFields(fields)
                if (fields.length) handleDataEntry()
              }}
            />

            <div className="flex justify-between mt-4">
              <button
                onClick={goPrev}
                className="px-4 py-2 rounded-md bg-muted text-muted-foreground"
              >
                Back
              </button>
              <button
                onClick={goNext}
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 4 - Review */}
        {active === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 className="text-lg font-semibold mb-3">Review</h3>
            <div className="rounded-md border border-border p-3 bg-input">
              <strong>Name:</strong> {form.fullName || "—"}
              <br />
              <strong>Mode:</strong> {mode}
            </div>
            {imageData && (
              <img
                src={imageData}
                alt="preview"
                className="max-h-64 object-contain rounded-md shadow-md mt-3"
              />
            )}
            <div className="flex gap-3 mt-3">
              <button
                onClick={goPrev}
                className="px-4 py-2 rounded-md bg-muted text-muted-foreground"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 rounded-md bg-accent text-accent-foreground"
              >
                {loading ? "Saving..." : "Save Record"}
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Toast */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`fixed bottom-8 right-8 rounded-md px-4 py-2 ${
            toast.type === "success"
              ? "bg-accent text-accent-foreground"
              : "bg-destructive text-destructive-foreground"
          }`}
        >
          {toast.message}
        </motion.div>
      )}
    </div>
  )
}
