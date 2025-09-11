import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  Users, 
  TrendingUp, 
  Award, 
  MessageCircle, 
  Shield,
  Zap,
  Target,
  BookOpen
} from "lucide-react";
import ParticleSystem from "./3d/ParticleSystem.tsx";
import SafeCanvas from "./3d/SafeCanvas.tsx";
import { SectionTransition, CardHover, TextReveal, StaggerContainer, StaggerItem } from "./PageTransition.tsx";

const Features = () => {
  const features = [
    {
      icon: Search,
      title: "Smart Job Matching",
      description: "AI-powered algorithm matches you with internships that align with your skills, interests, and career goals.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Users,
      title: "Networking Hub",
      description: "Connect with fellow PM interns, mentors, and industry professionals to build valuable relationships.",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: BookOpen,
      title: "Learning Resources",
      description: "Access curated courses, case studies, and resources to enhance your product management skills.",
      color: "from-green-500 to-blue-500"
    },
    {
      icon: TrendingUp,
      title: "Career Analytics",
      description: "Track your application progress and get insights on market trends and salary expectations.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: MessageCircle,
      title: "Interview Prep",
      description: "Practice with mock interviews, case study workshops, and feedback from experienced PMs.",
      color: "from-pink-500 to-purple-500"
    },
    {
      icon: Shield,
      title: "Verified Companies",
      description: "All companies are verified and vetted to ensure legitimate internship opportunities.",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Fast Application Process",
      description: "Apply to multiple internships with one click using our streamlined application system."
    },
    {
      icon: Target,
      title: "Personalized Recommendations",
      description: "Get tailored internship suggestions based on your profile and preferences."
    },
    {
      icon: Award,
      title: "Success Guarantee",
      description: "95% of our users secure internships within 60 days of active searching."
    }
  ];

  return (
    <section id="features" className="relative py-20 overflow-hidden">
      {/* 3D Particle Background - CSS Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/40 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Why Choose Our Platform?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We provide everything you need to find and secure the perfect PM internship
          </p>
        </div>

        {/* Main Features Grid */}
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <StaggerItem key={index}>
                <CardHover>
                  <Card className="bg-white/10 backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group h-full">
                    <CardContent className="p-8">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </CardHover>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Your Success Is Our Priority
            </h3>
            <p className="text-lg text-purple-200">
              Join thousands of students who have launched their PM careers with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-4">
                  {benefit.title}
                </h4>
                <p className="text-purple-200">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
