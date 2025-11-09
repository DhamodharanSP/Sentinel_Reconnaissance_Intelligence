import React from "react";
import AnimatedButton from "./AnimatedButton";

export default function HeroSection({ onGetStarted }) {
  return (
    <header className="relative overflow-hidden pb-12 pt-24">
      {/* animated background gradient */}
      <div className="absolute inset-0 -z-10 gradient-shift opacity-30" />

      <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* LEFT SECTION */}
        <div className="max-w-2xl">
          {/* Animated gradient headline */}
          <h1
            className="text-4xl lg:text-6xl font-extrabold leading-tight mb-4 bg-clip-text text-transparent 
            bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--primary)] animate-[gradientFlow_6s_ease_infinite]"
          >
            Sentinel Reconnaissance Intelligence
          </h1>

          <p className="text-lg lg:text-xl text-muted-foreground mb-10">
            AI-powered real-time monitoring — Face recognition, weapon detection,
            behavior anomaly alerts, and crowd analytics.
          </p>

          {/* Repositioned CTAs aligned right */}
          <div className="flex justify-end items-center gap-4">
            <AnimatedButton onClick={onGetStarted} />
            <button
              className="px-5 py-3 bg-card/60 border border-border rounded-lg text-sm font-medium 
              hover:scale-105 transition-transform hover:shadow-[0_0_12px_var(--accent)]"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* RIGHT: Video Section */}
        <div className="hidden lg:block w-1/2">
          <div className="relative h-72 rounded-2xl p-6 shadow-2xl border border-border bg-card/60 backdrop-blur-md overflow-hidden">
            <div className="absolute -left-10 -top-10 w-56 h-56 rounded-full bg-[var(--accent)] opacity-30 blob-float mix-blend-screen" />
            <div className="absolute right-0 -bottom-10 w-48 h-48 rounded-full bg-[var(--primary)] opacity-20 blob-float-2 mix-blend-screen" />
            <div className="relative z-10 h-full w-full flex items-center justify-center">
              <video
                src="/assets/Intro.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="rounded-xl border border-border object-cover w-full h-full shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating CTA (visible when scrolling) */}
      {/* <button
        onClick={onGetStarted}
        className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-full bg-[var(--accent)] text-background 
        shadow-[0_0_20px_var(--accent)] hover:scale-110 transition-transform duration-300"
      >
        Get Started
      </button> */}

      <style>{`
        @keyframes gradientFlow {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </header>
  );
}
