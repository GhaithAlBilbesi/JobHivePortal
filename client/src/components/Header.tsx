import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-mobile";
import { useUser } from "@/contexts/UserContext";
import LoginModal from "./auth/LoginModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/**
 * Header Component
 * 
 * Main navigation bar for the application
 * Features responsive design with mobile menu toggle
 * Implements scroll behavior for header shrinking
 * Displays different navigation options based on user role
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const { user, isAuthenticated, logout, isRole } = useUser();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginAction, setLoginAction] = useState<'login' | 'register'>('login');

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

  const openLoginModal = (action: 'login' | 'register' = 'login') => {
    setLoginAction(action);
    setIsLoginModalOpen(true);
  };

  const handleLogout = () => {
    logout();
  };

  // Get the user's initials for avatar fallback
  const getUserInitials = () => {
    if (!user || !user.name) return "U";
    return user.name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Determine which navigation links to show based on user role
  const renderNavigationLinks = () => {
    const commonLinks = (
      <>
        <Link href="/" className={`font-medium ${isActive("/")} hover:text-[#F6C500] transition-colors duration-200`}>
          Home
        </Link>
        <Link href="/jobs" className={`font-medium ${isActive("/jobs")} hover:text-[#F6C500] transition-colors duration-200`}>
          Jobs
        </Link>
      </>
    );

    // Additional links based on roles
    if (!isAuthenticated) {
      return commonLinks;
    }

    if (isRole('student')) {
      return (
        <>
          {commonLinks}
          <Link href="/resume-builder" className={`font-medium ${isActive("/resume-builder")} hover:text-[#F6C500] transition-colors duration-200`}>
            Resume Builder
          </Link>
          <Link href="/dashboard" className={`font-medium ${isActive("/dashboard")} hover:text-[#F6C500] transition-colors duration-200`}>
            Dashboard
          </Link>
        </>
      );
    }

    if (isRole('employer')) {
      return (
        <>
          {commonLinks}
          <Link href="/dashboard" className={`font-medium ${isActive("/dashboard")} hover:text-[#F6C500] transition-colors duration-200`}>
            Dashboard
          </Link>
          <Link href="/post-job" className={`font-medium ${isActive("/post-job")} hover:text-[#F6C500] transition-colors duration-200`}>
            Post Job
          </Link>
        </>
      );
    }

    if (isRole('admin')) {
      return (
        <>
          {commonLinks}
          <Link href="/admin" className={`font-medium ${isActive("/admin")} hover:text-[#F6C500] transition-colors duration-200`}>
            Admin Panel
          </Link>
        </>
      );
    }

    return commonLinks;
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full bg-white z-50 transition-all duration-300 ${isScrolled ? 'header-shrink h-[70px]' : 'h-20'}`}>
        <div className="container h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-10 h-10 bg-[#F6C500] rounded-lg flex items-center justify-center mr-2">
              <span role="img" aria-label="bee" className="text-xl">🐝</span>
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
              {renderNavigationLinks()}
              
              {/* Auth Buttons or User Menu */}
              {!isAuthenticated ? (
                <div className="flex space-x-3">
                  <Button 
                    style={{ backgroundColor: "#F6C500", color: "#000000" }} 
                    className="rounded-full transition-colors duration-200"
                    asChild
                  >
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-2 border-[#F6C500] text-black rounded-full hover:bg-[#FFFBEA] transition-colors duration-200"
                    asChild
                  >
                    <Link href="/register">Sign Up</Link>
                  </Button>
                </div>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center space-x-2 focus:outline-none">
                      <Avatar className="h-9 w-9 border border-[#F6C500]">
                        <AvatarImage src={user?.profilePicture} />
                        <AvatarFallback className="bg-[#FFFBEA] text-[#F6C500]">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{user?.name}</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem className="cursor-pointer" asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" asChild>
                      <Link href="/profile">My Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer text-red-600" onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </nav>
          )}
        </div>
        
        {/* Mobile Navigation */}
        {isMobile && (
          <nav className={`bg-white w-full border-t border-gray-200 transition-all duration-300 ${isMenuOpen ? 'block' : 'hidden'}`}>
            <div className="container px-4 py-3 flex flex-col space-y-3">
              {/* Home and Jobs links always visible */}
              <Link href="/" className={`font-medium ${isActive("/")} hover:text-[#F6C500] py-2 transition-colors duration-200`}>
                Home
              </Link>
              <Link href="/jobs" className={`font-medium ${isActive("/jobs")} hover:text-[#F6C500] py-2 transition-colors duration-200`}>
                Jobs
              </Link>
              
              {/* Conditional links based on authentication and role */}
              {isAuthenticated && (
                <>
                  {isRole('student') && (
                    <>
                      <Link href="/resume-builder" className={`font-medium ${isActive("/resume-builder")} hover:text-[#F6C500] py-2 transition-colors duration-200`}>
                        Resume Builder
                      </Link>
                      <Link href="/dashboard" className={`font-medium ${isActive("/dashboard")} hover:text-[#F6C500] py-2 transition-colors duration-200`}>
                        Dashboard
                      </Link>
                    </>
                  )}
                  
                  {isRole('employer') && (
                    <>
                      <Link href="/dashboard" className={`font-medium ${isActive("/dashboard")} hover:text-[#F6C500] py-2 transition-colors duration-200`}>
                        Dashboard
                      </Link>
                      <Link href="/post-job" className={`font-medium ${isActive("/post-job")} hover:text-[#F6C500] py-2 transition-colors duration-200`}>
                        Post Job
                      </Link>
                    </>
                  )}
                  
                  {isRole('admin') && (
                    <Link href="/admin" className={`font-medium ${isActive("/admin")} hover:text-[#F6C500] py-2 transition-colors duration-200`}>
                      Admin Panel
                    </Link>
                  )}
                  
                  <Link href="/profile" className={`font-medium ${isActive("/profile")} hover:text-[#F6C500] py-2 transition-colors duration-200`}>
                    My Profile
                  </Link>
                  
                  <button 
                    onClick={handleLogout}
                    className="font-medium text-red-600 hover:text-red-700 py-2 text-left transition-colors duration-200"
                  >
                    Logout
                  </button>
                </>
              )}
              
              {/* Auth buttons for logged out users */}
              {!isAuthenticated && (
                <div className="flex flex-col space-y-2 pt-2">
                  <Button 
                    style={{ backgroundColor: "#F6C500", color: "#000000" }} 
                    className="rounded-full w-full transition-colors duration-200"
                    asChild
                  >
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-2 border-[#F6C500] text-black rounded-full w-full hover:bg-[#FFFBEA] transition-colors duration-200"
                    asChild
                  >
                    <Link href="/register">Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>
          </nav>
        )}
      </header>
      
      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)}
        action={loginAction}
      />
    </>
  );
};

export default Header;
