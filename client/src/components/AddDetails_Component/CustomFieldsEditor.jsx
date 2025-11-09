// components/AddDetails_Component/CustomFieldsEditor.jsx
import React, { useState } from "react"

export default function CustomFieldsEditor({ fields, setFields }) {
  const [label, setLabel] = useState("")

  function addField() {
    if (!label.trim()) return
    setFields([...fields, { id: Date.now(), label: label.trim(), value: "" }])
    setLabel("")
  }

  return (
    <div className="mt-4">
      <div className="flex gap-2">
        <input
          className="flex-1 rounded-md border border-border px-3 py-2 bg-input"
          placeholder="New field label (e.g., Relative Contact)"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addField()}
        />
        <button
          onClick={addField}
          className="px-4 py-2 rounded-md bg-primary text-primary-foreground"
        >
          Add
        </button>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-2">
        {fields.map((f) => (
          <input
            key={f.id}
            className="rounded-md border border-border px-3 py-2 bg-input"
            placeholder={f.label}
            value={f.value}
            onChange={(e) =>
              setFields(
                fields.map((x) =>
                  x.id === f.id ? { ...x, value: e.target.value } : x
                )
              )
            }
          />
        ))}
      </div>
    </div>
  )
}
