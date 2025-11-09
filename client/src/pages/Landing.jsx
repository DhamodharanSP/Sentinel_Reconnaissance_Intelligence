import React, { useState } from "react";
import HeroSection from "../components/Landing_Component/HeroSection";
import ObjectiveGrid from "../components/Landing_Component/ObjectiveGrid";
import ExpandedCardModal from "../components/Landing_Component/ExpandedCardModal";
// import ThemeToggle from "../components/ui/theme-toggle";
import { ThemeToggle } from "../components/ui/theme-toggle"
import { ThemeProvider } from "../components/ui/theme-provider"

export default function Landing() {
const [selected, setSelected] = useState(null);


const openCard = (obj) => {
    setSelected(obj);
    document.documentElement.style.overflow = 'hidden';
};


const closeCard = () => {
    setSelected(null);
    document.documentElement.style.overflow = '';
};


return (
<div className="min-h-screen bg-background text-foreground">
    <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
    <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">SS</div>
    <div className="font-semibold">Smart Surveillance</div>
    </div>
    <div className="flex items-center gap-4">
    <div className="hidden md:block text-sm text-muted-foreground">Docs</div>
    <div className="hidden md:block text-sm text-muted-foreground">Contact</div>
    <ThemeToggle />
    </div>
    </nav>


    <HeroSection onGetStarted={() => { window.location.href = '/auth'; }} />
    <ObjectiveGrid onCardClick={openCard} selected={selected} />


    <footer className="container mx-auto px-6 py-8 text-sm text-muted-foreground">
    Built with ❤️ — AI modules: Face Recognition, YOLO Weapon Detection, Behavior Anomaly Detection.
    </footer>


    <ExpandedCardModal obj={selected} onClose={closeCard} />
</div>
);
}