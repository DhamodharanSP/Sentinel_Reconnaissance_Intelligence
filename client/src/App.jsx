import { ThemeProvider } from "./components/ui/theme-provider";
import Landing from "./pages/Landing";
import AddDetails from "./pages/AddDetails";
import DetectionHistory from "./pages/DetectionHistory";    

export default function App() {
  return (
    <ThemeProvider>
      <Landing />
      {/* <AddDetails /> */}
      {/* <DetectionHistory /> */}
    </ThemeProvider>
  );
}
