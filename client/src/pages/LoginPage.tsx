import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";

/**
 * LoginPage Component
 * 
 * Standalone page for user login
 * Allows existing users to log in with their credentials
 * Features email/password login and social login options
 * Redirects users to appropriate dashboard based on role after login
 */
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { login, isRole } = useUser();
  const [, setLocation] = useLocation();

  // Form validation state
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  // Set page title
  useEffect(() => {
    document.title = "Sign In - JobHive";
  }, []);

  // Validate form
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: '',
      password: ''
    };

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome back to JobHive!"
        });
        
        // Navigate based on role
        if (isRole('student')) {
          setLocation('/dashboard');
        } else if (isRole('employer')) {
          setLocation('/dashboard');
        } else if (isRole('admin')) {
          setLocation('/dashboard');
        } else {
          setLocation('/dashboard');
        }
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An error occurred during login",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Navigate to register page
  const goToRegister = () => {
    setLocation('/register');
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          {/* Logo */}
          <div className="mb-8">
            <a href="/" className="flex items-center">
              <div className="w-10 h-10 bg-[#F6C500] rounded-lg flex items-center justify-center mr-2">
                <span role="img" aria-label="bee" className="text-xl">🐝</span>
              </div>
              <span className="text-2xl font-bold">Job<span className="text-[#F6C500]">Hive</span></span>
            </a>
          </div>
          
          <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
          <p className="text-gray-600 mb-6">
            Don't have an account? <button onClick={goToRegister} className="text-[#F6C500] hover:underline">Create one</button>
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                disabled={isLoading}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            
            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <a href="/forgot-password" className="text-sm text-[#F6C500] hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={isLoading}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            
            {/* Test account info */}
            <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
              <p className="text-sm text-gray-600 font-medium mb-1">Test accounts:</p>
              <p className="text-xs text-gray-500">• student@jobhive.com / password123</p>
              <p className="text-xs text-gray-500">• employer@jobhive.com / password123</p>
              <p className="text-xs text-gray-500">• admin@jobhive.com / password123</p>
            </div>
            
            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full py-6"
              style={{ backgroundColor: "#F6C500", color: "#000000" }}
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
            
            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>
            
            {/* Social Login Options */}
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center space-x-2"
              onClick={() => toast({ description: "Social login is not implemented yet" })}
            >
              <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"></path>
              </svg>
              <span>Sign in with Google</span>
            </Button>
          </form>
        </div>
      </div>
      
      {/* Right Side - Image/Info */}
      <div className="hidden lg:block lg:w-1/2 bg-[#F0F7FF] p-12 relative">
        <div className="flex flex-col h-full justify-center">
          <img
            src="https://i.imgur.com/Mqq2aDA.png"
            alt="Login illustration"
            className="mb-8 max-w-md mx-auto"
          />
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">
              Access your JobHive account
            </h2>
            <p className="text-xl font-medium text-gray-700">
              to explore career opportunities.
            </p>
          </div>
          
          {/* Feature Icons */}
          <div className="flex justify-center space-x-6 mt-8">
            <div className="w-12 h-12 bg-[#1A2C55] rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="w-12 h-12 bg-[#1A2C55] rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="w-12 h-12 bg-[#1A2C55] rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;