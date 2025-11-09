// import React, { useEffect, useState } from "react"
// import { DetectionCard } from "../components/DetectionHistory_Component/DetectionCard"
// import { DetectionModal } from "../components/DetectionHistory_Component/DetectionModal"
// import { DetectionFilter } from "../components/DetectionHistory_Component/DetectionFilter"
// import { motion } from "framer-motion"

// const DetectionHistory = () => {
//   const [detections, setDetections] = useState([])
//   const [filteredDetections, setFilteredDetections] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [selectedDetection, setSelectedDetection] = useState(null)
//   const [filterType, setFilterType] = useState("date")
//   const [violationType, setViolationType] = useState("All")

//   useEffect(() => {
//     fetchDetectionHistory()
//   }, [])

//   const fetchDetectionHistory = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/detection-history")
//       const data = await response.json()

//       const sorted = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
//       setDetections(sorted)
//       setFilteredDetections(sorted)
//       setLoading(false)
//     } catch (error) {
//       console.error("Error fetching detection history:", error)
//       setLoading(false)
//     }
//   }

//   const handleFilterChange = (type, value) => {
//     setFilterType(type)
//     if (type === "violation") {
//       setViolationType(value)
//       if (value === "All") setFilteredDetections(detections)
//       else {
//         const filtered = detections.filter((d) => d.violationType === value)
//         setFilteredDetections(filtered)
//       }
//     } else if (type === "date") {
//       const sorted = [...detections].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
//       setFilteredDetections(sorted)
//     }
//   }

//   return (
//     <div className="relative min-h-screen bg-background text-foreground overflow-hidden px-6 py-10">
//       {/* Ambient Blobs */}
//       <div className="absolute top-[-10%] left-[-10%] w-[30rem] h-[30rem] rounded-full bg-primary/10 blur-3xl blob-float" />
//       <div className="absolute bottom-[-10%] right-[-10%] w-[25rem] h-[25rem] rounded-full bg-accent/10 blur-3xl blob-float-2" />

//       {/* Page Header */}
//       <div className="text-center mb-10">
//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-4xl font-semibold tracking-wide text-foreground"
//         >
//           Detection History
//         </motion.h1>
//         <p className="text-muted-foreground mt-2 text-sm">
//           Real-time detections logged and categorized automatically
//         </p>
//       </div>

//       {/* Filter Dock */}
//       <DetectionFilter
//         filterType={filterType}
//         violationType={violationType}
//         onFilterChange={handleFilterChange}
//       />

//       {/* Detection Grid */}
//       {loading ? (
//         <p className="text-center mt-20 text-muted-foreground animate-pulse">
//           Fetching detections...
//         </p>
//       ) : filteredDetections.length === 0 ? (
//         <p className="text-center mt-20 text-muted-foreground glow-pulse">
//           No detections found.
//         </p>
//       ) : (
//         <motion.div
//           layout
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8"
//         >
//           {filteredDetections.map((record, index) => (
//             <DetectionCard
//               key={index}
//               record={record}
//               onClick={() => setSelectedDetection(record)}
//             />
//           ))}
//         </motion.div>
//       )}

//       {/* Modal */}
//       {selectedDetection && (
//         <DetectionModal
//           record={selectedDetection}
//           onClose={() => setSelectedDetection(null)}
//         />
//       )}
//     </div>
//   )
// }

// export default DetectionHistory


import React, { useEffect, useState } from "react"
import { DetectionCard } from "../components/DetectionHistory_Component/DetectionCard"
import { DetectionModal } from "../components/DetectionHistory_Component/DetectionModal"
import { DetectionFilter } from "../components/DetectionHistory_Component/DetectionFilter"
import { motion } from "framer-motion"

const DetectionHistory = () => {
  const [detections, setDetections] = useState([])
  const [filteredDetections, setFilteredDetections] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDetection, setSelectedDetection] = useState(null)
  const [filterType, setFilterType] = useState("date")
  const [violationType, setViolationType] = useState("All")

  useEffect(() => {
    fetchDetectionHistory()
  }, [])

  const fetchDetectionHistory = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/detection-history")
      const data = await response.json()

      const sorted = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      setDetections(sorted)
      setFilteredDetections(sorted)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching detection history:", error)
      setLoading(false)
    }
  }

  const handleFilterChange = (type, value) => {
    setFilterType(type)
    if (type === "violation") {
      setViolationType(value)
      if (value === "All") setFilteredDetections(detections)
      else {
        const filtered = detections.filter((d) => d.violationType === value)
        setFilteredDetections(filtered)
      }
    } else if (type === "date") {
      const sorted = [...detections].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      setFilteredDetections(sorted)
    }
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden px-6 py-10">
      {/* Ambient Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[30rem] h-[30rem] rounded-full bg-primary/10 blur-3xl blob-float" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[25rem] h-[25rem] rounded-full bg-accent/10 blur-3xl blob-float-2" />

      {/* Page Header */}
      <div className="text-center mb-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-semibold tracking-wide text-foreground"
        >
          Detection History
        </motion.h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Real-time detections logged and categorized automatically
        </p>
      </div>

      {/* Filter Dock */}
      <DetectionFilter
        filterType={filterType}
        violationType={violationType}
        onFilterChange={handleFilterChange}
      />

      {/* Facial Detections Section */}
      <div className="mt-12 border border-border/60 rounded-2xl p-6 backdrop-blur-sm bg-card/70 shadow-[0_0_25px_var(--color-accent)/10]">
        <h2 className="text-xl font-semibold mb-6 border-b border-border/40 pb-2">
          Facial Detections
        </h2>

        {loading ? (
          <p className="text-center mt-10 text-muted-foreground animate-pulse">
            Fetching detections...
          </p>
        ) : filteredDetections.length === 0 ? (
          <p className="text-center mt-10 text-muted-foreground glow-pulse">
            No detections found.
          </p>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6"
          >
            {filteredDetections.map((record, index) => (
              <DetectionCard
                key={index}
                record={record}
                onClick={() => setSelectedDetection(record)}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Modal */}
      {selectedDetection && (
        <DetectionModal
          record={selectedDetection}
          onClose={() => setSelectedDetection(null)}
        />
      )}
    </div>
  )
}

export default DetectionHistory
