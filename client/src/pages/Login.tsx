import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Link, useLocation } from 'wouter';
import logo from '@/assets/logo.svg';

/**
 * Login Page Component
 * 
 * Dedicated login page with form and statistics display
 * Follows the design from provided mockups
 */
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [, navigate] = useLocation();

  // Set page title
  useEffect(() => {
    document.title = "Sign In - JobHive";
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would normally handle authentication
    // For now, just redirect to the homepage
    navigate('/');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Login Form */}
      <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col">
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2">
            <img src={logo} alt="JobHive Logo" className="w-8 h-8" />
            <span className="text-xl font-bold">JobHive</span>
          </Link>
        </div>

        <div className="flex-grow flex flex-col justify-center max-w-md mx-auto w-full">
          <h1 className="text-2xl font-bold mb-6">Sign in</h1>
          
          <p className="text-gray-600 text-sm mb-6">
            Don't have account?{' '}
            <Link href="/register" className="text-[#F6C500] hover:underline">
              Create Account
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12"
              />
            </div>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <i className="fas fa-eye-slash"></i>
                ) : (
                  <i className="fas fa-eye"></i>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember Me
                </label>
              </div>
              <Link href="/forgot-password" className="text-sm text-[#F6C500] hover:underline">
                Forgot password?
              </Link>
            </div>
            
            <div className="text-xs text-gray-500 mt-4 mb-4">
              <p>For testing, use these credentials:</p>
              <p>• student@jobhive.com / password123</p>
              <p>• employer@jobhive.com / password123</p>
              <p>• admin@jobhive.com / password123</p>
            </div>

            <Button
              type="submit"
              className="w-full h-12 font-medium"
              style={{ backgroundColor: "#F6C500", color: "#000000" }}
            >
              GET STARTED <i className="fas fa-arrow-right ml-2"></i>
            </Button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-sm text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-12">
              <i className="fab fa-facebook-f mr-2 text-blue-600"></i> Sign in with Facebook
            </Button>
            <Button variant="outline" className="h-12">
              <i className="fab fa-google mr-2 text-red-500"></i> Sign in with Google
            </Button>
          </div>
        </div>
      </div>

      {/* Right Section - Statistics and Image */}
      <div className="hidden md:flex md:w-1/2 bg-[#F5F7FF] p-12 lg:p-16 flex-col">
        <div className="flex-grow flex flex-col justify-center items-center">
          <div className="max-w-md">
            <h2 className="text-2xl font-bold mb-12">
              Over 1,75,324 candidates waiting for good employees.
            </h2>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-4 rounded-md flex flex-col items-center">
                <div className="w-10 h-10 bg-[#F5F7FF] rounded-md flex items-center justify-center mb-2">
                  <i className="fas fa-briefcase text-gray-600"></i>
                </div>
                <div className="font-bold">1,75,324</div>
                <div className="text-xs text-gray-500">Live Jobs</div>
              </div>
              <div className="bg-white p-4 rounded-md flex flex-col items-center">
                <div className="w-10 h-10 bg-[#F5F7FF] rounded-md flex items-center justify-center mb-2">
                  <i className="fas fa-building text-gray-600"></i>
                </div>
                <div className="font-bold">97,354</div>
                <div className="text-xs text-gray-500">Companies</div>
              </div>
              <div className="bg-white p-4 rounded-md flex flex-col items-center">
                <div className="w-10 h-10 bg-[#F5F7FF] rounded-md flex items-center justify-center mb-2">
                  <i className="fas fa-briefcase text-gray-600"></i>
                </div>
                <div className="font-bold">7,532</div>
                <div className="text-xs text-gray-500">New Jobs</div>
              </div>
            </div>

            <div className="mt-8">
              <img 
                src="https://cdn.pixabay.com/photo/2018/07/26/09/56/people-3563028_1280.png" 
                alt="People collaborating" 
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;