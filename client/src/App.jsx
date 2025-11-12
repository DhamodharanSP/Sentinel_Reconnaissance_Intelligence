import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ui/theme-provider";
import { ThemeToggle } from "./components/ui/theme-toggle";

import Landing from "./pages/Landing";
import AuthPage from "./pages/AuthPage";
// import Dashboard from "./pages/Dashboard";
import AddDetails from "./pages/AddDetails";
// import DetectionHistory from "./pages/DetectionHistory";
// import LiveAlerts from "./pages/LiveAlerts";
// import Analytics from "./pages/Analytics";
// import Settings from "./pages/Settings";
// import NotFound from "./pages/NotFound"; // Optional

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <ThemeToggle />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<AuthPage />} />

          {/* Protected / Post-login routes */}
          {/* <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-details" element={<AddDetails />} />
          <Route path="/detection-history" element={<DetectionHistory />} />
          <Route path="/live-alerts" element={<LiveAlerts />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} /> */}

          {/* Catch-all */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
