import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

/**
 * User role types supported by the application
 */
export type UserRole = 'student' | 'employer' | 'admin' | null;

/**
 * User interface defining the structure of a user
 */
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  profilePicture?: string;
}

/**
 * Context interface defining the shape of the user context
 */
interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Partial<User>, password: string) => Promise<boolean>;
  isRole: (role: UserRole) => boolean;
}

/**
 * Default/initial state for the user context
 */
const defaultUserContext: UserContextType = {
  user: null,
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
  register: async () => false,
  isRole: () => false,
};

/**
 * Create the user context with default values
 */
const UserContext = createContext<UserContextType>(defaultUserContext);

/**
 * Props for the UserProvider component
 */
interface UserProviderProps {
  children: ReactNode;
}

/**
 * Mock user data for testing different roles
 */
const MOCK_USERS = [
  {
    id: '1',
    email: 'student@jobhive.com',
    name: 'Student User',
    password: 'password123',
    role: 'student' as UserRole,
    profilePicture: 'https://i.pravatar.cc/150?u=student'
  },
  {
    id: '2',
    email: 'employer@jobhive.com',
    name: 'Employer User',
    password: 'password123',
    role: 'employer' as UserRole,
    profilePicture: 'https://i.pravatar.cc/150?u=employer'
  },
  {
    id: '3',
    email: 'admin@jobhive.com',
    name: 'Admin User',
    password: 'password123',
    role: 'admin' as UserRole,
    profilePicture: 'https://i.pravatar.cc/150?u=admin'
  }
];

/**
 * UserProvider Component
 * 
 * This provider encapsulates user authentication and role management functionality
 * Provides login, logout, and registration methods
 * Persists user state in localStorage
 */
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check for existing user session in localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('jobhive_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('jobhive_user');
      }
    }
  }, []);

  /**
   * Login function - authenticates a user with email and password
   * In a real application, this would make an API call
   * Here we're using mock data for testing
   */
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Find user with matching email and password
    const matchedUser = MOCK_USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (matchedUser) {
      // Create user object without password
      const { password, ...safeUser } = matchedUser;
      
      // Update state and localStorage
      setUser(safeUser);
      setIsAuthenticated(true);
      localStorage.setItem('jobhive_user', JSON.stringify(safeUser));
      
      return true;
    }
    
    return false;
  };

  /**
   * Logout function - removes user session
   */
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('jobhive_user');
  };

  /**
   * Register function - creates a new user account
   * In a real application, this would make an API call
   * Here we're just simulating the process
   */
  const register = async (userData: Partial<User>, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if email is already used
    if (MOCK_USERS.some(u => u.email.toLowerCase() === userData.email?.toLowerCase())) {
      return false;
    }

    // In a real application, this would create a user in the database
    console.log('User registered:', { ...userData, password: '******' });
    
    // Auto-login after registration
    if (userData.email) {
      return login(userData.email, password);
    }
    
    return false;
  };

  /**
   * Helper function to check if user has a specific role
   */
  const isRole = (role: UserRole): boolean => {
    return user?.role === role;
  };

  // Create the context value object
  const contextValue: UserContextType = {
    user,
    isAuthenticated,
    login,
    logout,
    register,
    isRole
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

/**
 * Custom hook to use the user context
 * Provides easy access to user data and authentication functions
 */
export const useUser = () => {
  const context = useContext(UserContext);
  
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  return context;
};