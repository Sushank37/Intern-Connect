import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Users, Briefcase } from "lucide-react";
import FloatingObjects from "./3d/FloatingObjects.tsx";
import SafeCanvas from "./3d/SafeCanvas.tsx";

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Floating Objects - CSS Animation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-16 h-16 bg-purple-500/30 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-pink-500/40 rounded-lg animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-blue-500/20 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '3.5s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-14 h-14 bg-emerald-500/35 rounded-lg animate-bounce" style={{animationDelay: '0.5s', animationDuration: '4.5s'}}></div>
        <div className="absolute bottom-20 right-10 w-18 h-18 bg-yellow-500/25 rounded-full animate-bounce" style={{animationDelay: '1.5s', animationDuration: '3.2s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Hero Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full mb-8 backdrop-blur-sm">
            <Star className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-sm text-purple-200">
              #1 Platform for PM Internships
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Launch Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              PM Career
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Connect with top companies offering Product Management internships. 
            Build your portfolio, gain real experience, and kickstart your journey 
            in product management.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
              <div className="flex items-center justify-center mb-4">
                <Briefcase className="w-8 h-8 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-purple-200">Active Internships</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
              <div className="flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-pink-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">10k+</div>
              <div className="text-purple-200">Students Placed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
              <div className="flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-yellow-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">4.9</div>
              <div className="text-purple-200">Average Rating</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 text-lg px-8 rounded-xl transition-all duration-300 hover:scale-105 glow-on-hover"
            >
              Find Internships
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-purple-500 text-purple-300 hover:bg-purple-500/20 hover:text-white text-lg px-8 rounded-xl transition-all duration-300"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-purple-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
