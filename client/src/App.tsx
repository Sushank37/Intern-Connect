import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Features from "./components/Features";
import InternshipSearch from "./components/InternshipSearch.tsx";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import AdvancedScene from "./components/3d/AdvancedScene.tsx";
import SafeCanvas from "./components/3d/SafeCanvas.tsx";
import InternshipWizard from "./components/InternshipWizard";
import { WizardProvider } from "./contexts/WizardContext";
import "@fontsource/inter";

function App() {
  return (
    <WizardProvider>
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Advanced 3D Background */}
        <SafeCanvas 
          className="fixed inset-0 z-0"
          camera={{ position: [0, 2, 10], fov: 60 }}
          gl={{ 
            antialias: true, 
            alpha: true, 
            powerPreference: "high-performance"
          }}
          dpr={[1, 2]}
          fallback={
            <div className="fixed inset-0 z-0 bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-purple-900/20">
              <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/20 rounded-full animate-pulse"></div>
                <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-pink-500/20 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-500/10 rounded-full animate-pulse delay-500"></div>
              </div>
            </div>
          }
        >
          <AdvancedScene />
        </SafeCanvas>

        {/* Main Content */}
        <div className="relative z-10">
          <Navigation />
          <Hero />
          <Features />
          <InternshipSearch />
          <CallToAction />
          <Footer />
        </div>

        {/* Wizard Modal */}
        <InternshipWizard />
      </div>
    </WizardProvider>
  );
}

export default App;
