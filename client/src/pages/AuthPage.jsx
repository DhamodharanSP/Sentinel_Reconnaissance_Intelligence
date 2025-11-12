import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedBlobs } from "../components/AuthPage_Component/AnimatedBlobs";
import { AuthForm } from "../components/AuthPage_Component/AuthForm";
import { LeftPanel } from "../components/AuthPage_Component/LeftPanel";
import { RightPanel } from "../components/AuthPage_Component/RightPanel";
import { ThemeToggle } from "../components/ui/theme-toggle";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  const carouselImages = [
    "/assets/carousel/frame1.webp",
    "/assets/carousel/frame2.jpg",
    "/assets/carousel/frame3.webp",
    "/assets/carousel/frame4.avif",
  ];

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatedBlobs />
      <ThemeToggle />

      <motion.div
        className="relative z-10 w-full max-w-6xl bg-card rounded-2xl shadow-2xl overflow-hidden border border-border/50"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col lg:flex-row">
          {!isSignUp && <LeftPanel isSignUp={isSignUp} carouselImages={carouselImages} />}

          <motion.div
            className="w-full flex items-center justify-center lg:w-1/2 p-8 lg:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <AuthForm isSignUp={isSignUp} onToggle={() => setIsSignUp(!isSignUp)} />
          </motion.div>

          {isSignUp && <RightPanel isSignUp={isSignUp} carouselImages={carouselImages} />}
        </div>
      </motion.div>
    </motion.div>
  );
}
