// pages/AddDetails.jsx
import React from "react"
import { ThemeProvider } from "../components/ui/theme-provider"
import { ThemeToggle } from "../components/ui/theme-toggle"
import AddDetails from "../components/AddDetails_Component"

export default function AddDetailsPage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground p-6 relative">
        <ThemeToggle />
        <AddDetails />
      </div>
    </ThemeProvider>
  )
}
