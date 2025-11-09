import React from "react";
import ObjectiveCard from "./ObjectiveCard";


const OBJECTIVES = [
{ id: "face", title: "Face Recognition Technology", img: "/assets/FRT.jpg", bullets: ["Real-time detection using MTCNN + InceptionResNetV1.", "One-shot identification across streams.", "High accuracy modular models."] },
{ id: "weapon", title: "Weapon Detection", img: "/assets/weapon.webp", bullets: ["YOLO-based firearm & knife detection.", "Instant alert & evidence capture."] },
{ id: "anomaly", title: "Behavior Anomaly Detection", img: "/assets/violence.png", bullets: ["Detects violence, loitering, kidnapping.", "Scene-level AI analytics."] },
{ id: "crowd", title: "Crowd Monitoring", img: "/assets/crowd.png", bullets: ["Density heatmaps & movement flow.", "Supports large-scale management."] },
{ id: "cloud", title: "Cloud Integration & Alerts", img: "/assets/alerts.jpg", bullets: ["Real-time Twilio alerts.", "Secure MongoDB cloud logs."] },
];


export default function ObjectiveGrid({ onCardClick, selected }) {
return (
<section className="container mx-auto px-6 lg:px-12 py-12">
<h2 className="text-2xl font-bold mb-6">Key Objectives</h2>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
{OBJECTIVES.map((o) => (
<ObjectiveCard key={o.id} obj={o} onClick={onCardClick} isActive={selected?.id === o.id} />
))}
</div>
</section>
);
}