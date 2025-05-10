import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";

/**
 * Props for LoginModal component
 */
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  action?: 'login' | 'register';
  afterLogin?: () => void;
}

/**
 * LoginModal Component
 * 
 * Provides a dialog for user login and registration
 * Handles authentication via the UserContext
 * Supports two modes: login and register
 * 
 * @param isOpen - Controls visibility of the modal
 * @param onClose - Function to call when modal is closed
 * @param action - Sets the initial tab: login or register
 * @param afterLogin - Optional callback to run after successful login
 */
const LoginModal: React.FC<LoginModalProps> = ({ 
  isOpen, 
  onClose, 
  action = 'login',
  afterLogin
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(action);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { login, register } = useUser();

  // Form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerRole, setRegisterRole] = useState<'student' | 'employer'>('student');

  /**
   * Handle login form submission
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(loginEmail, loginPassword);
      
      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome back to JobHive!"
        });
        onClose();
        if (afterLogin) afterLogin();
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

  /**
   * Handle registration form submission
   */
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await register({
        name: registerName,
        email: registerEmail,
        role: registerRole
      }, registerPassword);
      
      if (success) {
        toast({
          title: "Registration successful",
          description: "Welcome to JobHive!"
        });
        onClose();
        if (afterLogin) afterLogin();
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

  /**
   * Helper to switch between login and register tabs
   */
  const switchTab = (tab: 'login' | 'register') => {
    setActiveTab(tab);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {activeTab === 'login' ? 'Sign In' : 'Create Account'}
          </DialogTitle>
        </DialogHeader>

        {/* Tab buttons */}
        <div className="flex border-b mb-4">
          <button
            className={`flex-1 py-2 text-center font-medium ${
              activeTab === 'login' 
                ? 'text-[#F6C500] border-b-2 border-[#F6C500]' 
                : 'text-gray-500'
            }`}
            onClick={() => switchTab('login')}
          >
            Sign In
          </button>
          <button
            className={`flex-1 py-2 text-center font-medium ${
              activeTab === 'register' 
                ? 'text-[#F6C500] border-b-2 border-[#F6C500]' 
                : 'text-gray-500'
            }`}
            onClick={() => switchTab('register')}
          >
            Register
          </button>
        </div>

        {/* Login Form */}
        {activeTab === 'login' && (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Your email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <div className="mb-6">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Your password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <div className="text-xs text-gray-500 mb-4">
              <p>For testing, use these credentials:</p>
              <p>• student@jobhive.com / password123</p>
              <p>• employer@jobhive.com / password123</p>
              <p>• admin@jobhive.com / password123</p>
            </div>
            <Button 
              type="submit" 
              className="w-full"
              style={{ backgroundColor: "#F6C500", color: "#000000" }}
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        )}

        {/* Register Form */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <Label htmlFor="register-name">Full Name</Label>
              <Input
                id="register-name"
                placeholder="Your full name"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="register-email">Email</Label>
              <Input
                id="register-email"
                type="email"
                placeholder="Your email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="register-password">Password</Label>
              <Input
                id="register-password"
                type="password"
                placeholder="Create a password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <div className="mb-6">
              <Label>I am a</Label>
              <div className="flex gap-4 mt-2">
                <label className={`flex-1 border rounded-md p-3 cursor-pointer ${
                  registerRole === 'student' ? 'border-[#F6C500] bg-[#FFFBEA]' : ''
                }`}>
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={registerRole === 'student'}
                    onChange={() => setRegisterRole('student')}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="font-medium">Student/Job Seeker</div>
                  </div>
                </label>
                <label className={`flex-1 border rounded-md p-3 cursor-pointer ${
                  registerRole === 'employer' ? 'border-[#F6C500] bg-[#FFFBEA]' : ''
                }`}>
                  <input
                    type="radio"
                    name="role"
                    value="employer"
                    checked={registerRole === 'employer'}
                    onChange={() => setRegisterRole('employer')}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="font-medium">Employer</div>
                  </div>
                </label>
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full"
              style={{ backgroundColor: "#F6C500", color: "#000000" }}
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>
        )}

        <DialogFooter className="mt-4 text-center flex justify-center text-sm text-gray-500">
          {activeTab === 'login' ? (
            <p>Don't have an account? <button type="button" onClick={() => switchTab('register')} className="text-[#F6C500] hover:underline">Register</button></p>
          ) : (
            <p>Already have an account? <button type="button" onClick={() => switchTab('login')} className="text-[#F6C500] hover:underline">Sign In</button></p>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;