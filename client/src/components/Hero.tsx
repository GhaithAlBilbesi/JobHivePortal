import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import AnimatedBee from "./AnimatedBee";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/**
 * Hero Component
 * 
 * Main landing banner showcasing the core value proposition
 * Features animated bee elements and a call-to-action
 * Implements a responsive design that adapts to different screen sizes
 */
const Hero = () => {
  const { ref: heroRef } = useScrollAnimation();
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

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
    <section className="relative bg-[#FFFBEA] py-12 lg:py-20 overflow-hidden pt-32" ref={heroRef}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Column - Text Content */}
          <div 
            className="w-full lg:w-1/2 mb-10 lg:mb-0 z-10 opacity-0" 
            ref={heroContentRef}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              <span className="block">Sweet opportunities</span>
              <span className="block text-[#F6C500]">for the NewBees!</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl">
              Find the perfect job opportunities tailored for students and fresh graduates. 
              Start building your career today!
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                className="btn-pulse rounded-full"
                style={{ backgroundColor: "#F6C500", color: "#000000" }}
                asChild
              >
                <Link href="/jobs">Explore Jobs</Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-[#F6C500] text-black rounded-full"
                asChild
              >
                <Link href="/for-employers">For Employers</Link>
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
            
            {/* Animated Bees */}
            <AnimatedBee style={{ top: "10%", left: "10%" }} />
            <AnimatedBee style={{ top: "70%", left: "20%" }} />
            <AnimatedBee style={{ top: "30%", right: "10%" }} />
            <AnimatedBee style={{ top: "60%", right: "20%" }} />
          </div>
        </div>
      </div>
      
      {/* Background Hexagon Pattern */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
        <div className="w-full h-full" style={{ backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4NiIgaGVpZ2h0PSIxMDAiPgogIDxwYXRoIGZpbGw9IiNGNkM1MDAiIGQ9Ik00MyAwbDQzIDI1djUwbC00MyAyNUwwIDc1VjI1eiI+PC9wYXRoPgo8L3N2Zz4=")`, backgroundRepeat: "repeat" }}></div>
      </div>
    </section>
  );
};

export default Hero;
