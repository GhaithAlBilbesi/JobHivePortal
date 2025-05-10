import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/**
 * Hero Component
 * 
 * Main landing banner showcasing the core value proposition
 * Implements a responsive design that adapts to different screen sizes
 */
const Hero = () => {
  const { ref: heroRef } = useScrollAnimation();
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);

  // Set initial visibility and trigger animations
  useEffect(() => {
    if (heroContentRef.current) {
      heroContentRef.current.classList.add("fade-in-up");
    }
    if (heroImageRef.current) {
      heroImageRef.current.classList.add("fade-in-up", "animate-delay-200");
    }
  }, []);

  return (
    <section className="relative bg-[#F8F9FA] py-12 lg:py-20 overflow-hidden pt-32" ref={heroRef}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Column - Text Content */}
          <div 
            className="w-full lg:w-1/2 mb-10 lg:mb-0 z-10 opacity-0" 
            ref={heroContentRef}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 relative">
              <span className="block">Career opportunities</span>
              <span className="block text-[#3B82F6] relative" ref={titleRef}>
                for your future!
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl">
              Find the perfect job opportunities tailored for students and fresh graduates. 
              Start building your career today!
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                className="btn-pulse rounded-full"
                style={{ backgroundColor: "#3B82F6", color: "#FFFFFF" }}
                asChild
              >
                <Link href="/jobs">Explore Jobs</Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-[#3B82F6] text-black rounded-full"
                asChild
              >
                <Link href="/post-job">Post a Job</Link>
              </Button>
            </div>
          </div>
          
          {/* Right Column - Hero Image */}
          <div 
            className="w-full lg:w-1/2 relative opacity-0" 
            ref={heroImageRef}
          >
            <img 
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Young professional looking for job opportunities" 
              className="rounded-lg shadow-xl mx-auto lg:ml-auto float-animation" 
            />
          </div>
        </div>
      </div>
      
      {/* Background Grid Pattern */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
        <div className="w-full h-full" style={{ backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZyBmaWxsPSIjM0I4MkY2IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6TTIwIDIwaDIwdjIwSDIwVjIweiIgb3BhY2l0eT0iLjUiLz4KICAgIDxwYXRoIGQ9Ik0wIDIwaDIwdjIwSDBWMjB6TTE1IDE1aDEwdjEwSDE1VjE1eiIgb3BhY2l0eT0iLjMiLz4KICA8L2c+Cjwvc3ZnPg==")`, backgroundRepeat: "repeat" }}></div>
      </div>
    </section>
  );
};

export default Hero;
