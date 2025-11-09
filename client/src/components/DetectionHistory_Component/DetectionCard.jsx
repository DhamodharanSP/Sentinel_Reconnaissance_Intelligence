// import React from "react"
// import { motion } from "framer-motion"

// export const DetectionCard = ({ record, onClick }) => {
//   return (
//     <motion.div
//       whileHover={{ scale: 1.02, y: -5 }}
//       transition={{ duration: 0.2 }}
//       onClick={onClick}
//       className="group relative bg-card/80 border border-border hover:border-accent/60 backdrop-blur-xl rounded-xl overflow-hidden shadow-sm hover:shadow-[0_0_25px_var(--color-accent)/25] cursor-pointer transition-all"
//     >
//       <div className="relative overflow-hidden">
//         <img
//           src={record.photo}
//           alt={record.name || record.violationType}
//           className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
//           loading="lazy"
//         />
//         <div className="absolute bottom-0 w-full bg-gradient-to-t from-background/80 to-transparent p-3">
//           <span className="text-xs font-medium text-accent uppercase tracking-wide">
//             {record.violationType}
//           </span>
//         </div>
//       </div>

//       <div className="p-4 space-y-2 text-sm">
//         <h3 className="font-medium text-lg text-foreground truncate">
//           {record.name || "Unknown Subject"}
//         </h3>
//         <p className="text-muted-foreground text-sm leading-tight">
//           📍{" "}
//           <a
//             href={`https://www.google.com/maps?q=${record.latitude},${record.longitude}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-secondary hover:underline"
//           >
//             {record.location}
//           </a>
//         </p>
//         <p className="text-muted-foreground text-xs">
//           🕒 {new Date(record.timestamp).toLocaleString()}
//         </p>
//       </div>
//     </motion.div>
//   )
// }

import React from "react"
import { motion } from "framer-motion"

export const DetectionCard = ({ record, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="group relative bg-card border border-border hover:border-accent/60 rounded-xl overflow-hidden shadow-md hover:shadow-[0_0_20px_var(--color-accent)/25] cursor-pointer transition-all"
    >
      <div className="relative overflow-hidden">
        <img
          src={record.photo}
          alt={record.name || record.violationType}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Removed blur overlay entirely */}
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-background/50 via-background/20 to-transparent p-3">
          <span className="text-xs font-medium text-accent uppercase tracking-wide drop-shadow">
            {record.violationType}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-2 text-sm">
        <h3 className="font-medium text-lg text-foreground truncate">
          {record.name || "Unknown Subject"}
        </h3>
        <p className="text-muted-foreground text-sm leading-tight">
          📍{" "}
          <a
            href={`https://www.google.com/maps?q=${record.latitude},${record.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:underline"
          >
            {record.location}
          </a>
        </p>
        <p className="text-muted-foreground text-xs">
          🕒 {new Date(record.timestamp).toLocaleString()}
        </p>
      </div>
    </motion.div>
  )
}
