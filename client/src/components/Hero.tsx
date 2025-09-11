import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Users, Briefcase } from "lucide-react";
import AdvancedScene from "./3d/AdvancedScene.tsx";
import SafeCanvas from "./3d/SafeCanvas.tsx";
import { SectionTransition, ButtonHover, TextReveal, StaggerContainer, StaggerItem } from "./PageTransition.tsx";

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Interactive Objects */}
      <SafeCanvas 
        className="absolute inset-0 z-0"
        camera={{ position: [0, 1, 8], fov: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        frameloop="always"
        dpr={[1, 1.5]}
        fallback={
          <div className="absolute inset-0 z-0">
            <div className="absolute top-20 left-10 w-16 h-16 bg-purple-500/30 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
            <div className="absolute top-40 right-20 w-12 h-12 bg-pink-500/40 rounded-lg animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
            <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-blue-500/20 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '3.5s'}}></div>
          </div>
        }
      >
        <AdvancedScene />
      </SafeCanvas>

      <SectionTransition className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Hero Badge */}
          <TextReveal delay={0.2}>
            <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full mb-8 backdrop-blur-sm">
              <Star className="w-4 h-4 text-yellow-400 mr-2" />
              <span className="text-sm text-purple-200">
                #1 Platform for PM Internships
              </span>
            </div>
          </TextReveal>

          {/* Main Heading */}
          <TextReveal delay={0.4}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Launch Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                PM Career
              </span>
            </h1>
          </TextReveal>

          {/* Subtitle */}
          <TextReveal delay={0.6}>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Connect with top companies offering Product Management internships. 
              Build your portfolio, gain real experience, and kickstart your journey 
              in product management.
            </p>
          </TextReveal>

          {/* Stats */}
          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <StaggerItem>
                <div className="bg-white/10 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-center justify-center mb-4">
                    <Briefcase className="w-8 h-8 text-purple-400" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">500+</div>
                  <div className="text-purple-200">Active Internships</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="bg-white/10 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-center justify-center mb-4">
                    <Users className="w-8 h-8 text-pink-400" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">10k+</div>
                  <div className="text-purple-200">Students Placed</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="bg-white/10 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-center justify-center mb-4">
                    <Star className="w-8 h-8 text-yellow-400" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">4.9</div>
                  <div className="text-purple-200">Average Rating</div>
                </div>
              </StaggerItem>
            </div>
          </StaggerContainer>

          {/* CTA Buttons */}
          <TextReveal delay={0.8}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <ButtonHover>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 text-lg px-8 rounded-xl transition-all duration-300"
                >
                  Find Internships
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </ButtonHover>
              <ButtonHover>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-2 border-purple-500 text-purple-300 hover:bg-purple-500/20 hover:text-white text-lg px-8 rounded-xl transition-all duration-300"
                >
                  Learn More
                </Button>
              </ButtonHover>
            </div>
          </TextReveal>
        </div>
      </SectionTransition>

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
