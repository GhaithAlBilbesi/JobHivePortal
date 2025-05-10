import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";

/**
 * RegisterPage Component
 * 
 * Standalone page for user registration
 * Allows users to create new accounts as either Students or Employers
 * Features role selection, form validation, and social login options
 */
const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'student' | 'employer'>('student');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { register } = useUser();
  const [, setLocation] = useLocation();

  // Form validation state
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: ''
  });

  // Set page title
  useEffect(() => {
    document.title = "Create Account - JobHive";
    // Remove any existing user data from localStorage to ensure clean registration
    localStorage.removeItem('jobhive_user');
  }, []);

  // Validate form
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: ''
    };

    if (!name.trim()) {
      newErrors.name = 'Full name is required';
      isValid = false;
    }

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
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the Terms of Service';
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
      const success = await register({
        name,
        email,
        role
      }, password);
      
      if (success) {
        toast({
          title: "Account created successfully",
          description: "Welcome to JobHive!"
        });
        
        // Redirect based on role
        if (role === 'student') {
          setLocation('/dashboard');
        } else if (role === 'employer') {
          setLocation('/dashboard');
        }
      } else {
        toast({
          title: "Registration failed",
          description: "This email might already be registered",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Registration error",
        description: "An error occurred during registration",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Navigate to login page
  const goToLogin = () => {
    setLocation('/login');
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
          
          <h1 className="text-3xl font-bold mb-2">Create account.</h1>
          <p className="text-gray-600 mb-6">
            Already have an account? <button onClick={goToLogin} className="text-[#F6C500] hover:underline">Log in</button>
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Toggle */}
            <div className="flex border rounded-lg overflow-hidden mb-4">
              <button
                type="button"
                className={`flex-1 py-3 text-center transition-colors ${
                  role === 'student'
                    ? 'bg-[#F6C500] text-black font-medium'
                    : 'bg-white text-gray-500'
                }`}
                onClick={() => setRole('student')}
              >
                Students
              </button>
              <button
                type="button"
                className={`flex-1 py-3 text-center transition-colors ${
                  role === 'employer'
                    ? 'bg-[#F6C500] text-black font-medium'
                    : 'bg-white text-gray-500'
                }`}
                onClick={() => setRole('employer')}
              >
                Employers
              </button>
            </div>
            
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                disabled={isLoading}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            
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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                disabled={isLoading}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            
            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                disabled={isLoading}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>
            
            {/* Terms Checkbox */}
            <div className="flex items-start space-x-2 mt-4">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I've read and agree with your <a href="/terms" className="text-[#F6C500] hover:underline">Terms of Service</a>
                </label>
                {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}
              </div>
            </div>
            
            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full py-6"
              style={{ backgroundColor: "#F6C500", color: "#000000" }}
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
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
            <div className="grid grid-cols-1 gap-4">
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center space-x-2"
                onClick={() => toast({ description: "Social login is not implemented yet" })}
              >
                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"></path>
                </svg>
                <span>Sign up with Google</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center space-x-2"
                onClick={() => toast({ description: "Social login is not implemented yet" })}
              >
                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"></path>
                </svg>
                <span>Sign up with LinkedIn</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Right Side - Image/Info */}
      <div className="hidden lg:block lg:w-1/2 bg-[#F0F7FF] p-12 relative">
        <div className="flex flex-col h-full justify-center">
          <img
            src="https://i.imgur.com/Mqq2aDA.png"
            alt="Registration illustration"
            className="mb-8 max-w-md mx-auto"
          />
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">
              Over 1,75,324 candidates
            </h2>
            <p className="text-xl font-medium text-gray-700">
              waiting for good employees.
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

export default RegisterPage;