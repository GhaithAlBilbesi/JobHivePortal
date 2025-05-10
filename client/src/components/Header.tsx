import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-mobile";

/**
 * Header Component
 * 
 * Main navigation bar for the application
 * Features responsive design with mobile menu toggle
 * Implements scroll behavior for header shrinking
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const isMobile = useMediaQuery("(max-width: 1023px)");

  // Handle scroll event to shrink header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location === path ? "text-[#F6C500]" : "text-black";
  };

  return (
    <header className={`fixed top-0 left-0 w-full bg-white z-50 transition-all duration-300 ${isScrolled ? 'header-shrink h-[70px]' : 'h-20'}`}>
      <div className="container h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="w-10 h-10 bg-[#F6C500] rounded-lg flex items-center justify-center mr-2">
            <i className="fas fa-bug text-black text-xl"></i>
          </div>
          <span className="text-2xl font-bold">Job<span className="text-[#F6C500]">Hive</span></span>
        </Link>
        
        {/* Mobile Menu Button */}
        {isMobile && (
          <button 
            className="text-black p-2"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        )}
        
        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="flex items-center space-x-8">
            <Link href="/" className={`font-medium ${isActive("/")} hover:text-[#F6C500] transition-colors duration-200`}>
              Home
            </Link>
            <Link href="/jobs" className={`font-medium ${isActive("/jobs")} hover:text-[#F6C500] transition-colors duration-200`}>
              Jobs
            </Link>
            <Link href="/resume-builder" className={`font-medium ${isActive("/resume-builder")} hover:text-[#F6C500] transition-colors duration-200`}>
              Resume Builder
            </Link>
            <Link href="/for-employers" className={`font-medium ${isActive("/for-employers")} hover:text-[#F6C500] transition-colors duration-200`}>
              For Employers
            </Link>
            <div className="flex space-x-3">
              <Button style={{ backgroundColor: "#F6C500", color: "#000000" }} className="rounded-full transition-colors duration-200">
                Sign In
              </Button>
              <Button variant="outline" className="border-2 border-[#F6C500] text-black rounded-full hover:bg-[#FFFBEA] transition-colors duration-200">
                Sign Up
              </Button>
            </div>
          </nav>
        )}
      </div>
      
      {/* Mobile Navigation */}
      {isMobile && (
        <nav className={`bg-white w-full border-t border-gray-200 transition-all duration-300 ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="container px-4 py-3 flex flex-col space-y-3">
            <Link href="/" className={`font-medium ${isActive("/")} hover:text-[#F6C500] py-2 transition-colors duration-200`}>
              Home
            </Link>
            <Link href="/jobs" className={`font-medium ${isActive("/jobs")} hover:text-[#F6C500] py-2 transition-colors duration-200`}>
              Jobs
            </Link>
            <Link href="/resume-builder" className={`font-medium ${isActive("/resume-builder")} hover:text-[#F6C500] py-2 transition-colors duration-200`}>
              Resume Builder
            </Link>
            <Link href="/for-employers" className={`font-medium ${isActive("/for-employers")} hover:text-[#F6C500] py-2 transition-colors duration-200`}>
              For Employers
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              <Button style={{ backgroundColor: "#F6C500", color: "#000000" }} className="rounded-full w-full transition-colors duration-200">
                Sign In
              </Button>
              <Button variant="outline" className="border-2 border-[#F6C500] text-black rounded-full w-full hover:bg-[#FFFBEA] transition-colors duration-200">
                Sign Up
              </Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
