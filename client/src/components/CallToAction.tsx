import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react";
import InteractiveButton from "./3d/InteractiveButton.tsx";

const CallToAction = () => {
  const benefits = [
    "Access to 500+ verified internship opportunities",
    "Personalized career guidance and mentorship",
    "Exclusive networking events and workshops",
    "Interview preparation and skill development",
    "Portfolio building assistance"
  ];

  return (
    <section id="cta" className="relative py-20 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 via-pink-900/30 to-purple-900/50 backdrop-blur-sm"></div>
      
      {/* Floating Shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-sm text-purple-200">
              Limited Time Offer
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Ready to Start Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              PM Journey?
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Join over 10,000 students who have successfully launched their 
            product management careers through our platform.
          </p>

          {/* Benefits List */}
          <div className="bg-white/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 mb-12 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6">What You Get:</h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start text-left">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-purple-200">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 text-xl px-10 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-2xl animate-pulse-glow"
            >
              Start Your Journey Now
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-purple-200">
            <div className="flex items-center">
              <div className="flex -space-x-2 mr-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full border-2 border-white"
                  ></div>
                ))}
              </div>
              <span className="text-sm">Join 10,000+ students</span>
            </div>
            <div className="text-sm">✨ No credit card required</div>
            <div className="text-sm">🚀 Get started in 2 minutes</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
