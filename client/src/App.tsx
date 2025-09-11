import { Suspense } from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Features from "./components/Features";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import AnimatedBackground from "./components/3d/AnimatedBackground.tsx";
import SafeCanvas from "./components/3d/SafeCanvas.tsx";
import "@fontsource/inter";

function App() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* 3D Background - CSS Fallback */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-purple-900/20">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/20 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-pink-500/20 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-500/10 rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-cyan-500/15 rounded-full animate-pulse delay-700"></div>
          <div className="absolute top-1/3 right-1/3 w-36 h-36 bg-emerald-500/10 rounded-full animate-pulse delay-300"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <Features />
        <CallToAction />
        <Footer />
      </div>
    </div>
  );
}

export default App;
