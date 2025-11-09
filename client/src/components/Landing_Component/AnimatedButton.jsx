import React from "react";

export default function AnimatedButton({ onClick }) {
  return (
    <div className="relative group inline-block">
      <button
        onClick={onClick}
        className="relative z-10 px-7 py-3 rounded-lg font-semibold text-sm bg-card border border-border text-foreground
        transition-all duration-300 hover:shadow-[0_0_20px_var(--accent)]"
      >
        Get Started
      </button>

      {/* Glowing border trace animation */}
      <span className="pointer-events-none absolute inset-0 rounded-lg overflow-hidden before:absolute before:inset-0 before:content-[''] before:border-2 before:border-transparent before:bg-[linear-gradient(90deg,var(--accent)_0%,var(--primary)_50%,transparent_100%)] before:bg-[length:200%_100%] before:animate-[trace_2s_linear_infinite]" />

      <style>{`
        @keyframes trace {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: 0 0;
          }
        }
      `}</style>
    </div>
  );
}
