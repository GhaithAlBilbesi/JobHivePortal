import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

export const LoginButton = () => {
  const handleLogin = () => {
    window.location.href = '/api/login';
  };

  return (
    <Button onClick={handleLogin} variant="default">
      Log In
    </Button>
  );
};

export const LogoutButton = () => {
  const handleLogout = () => {
    window.location.href = '/api/logout';
  };

  return (
    <Button onClick={handleLogout} variant="outline">
      Log Out
    </Button>
  );
};

export const AuthButton = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Button disabled>Loading...</Button>;
  }

  return isAuthenticated ? <LogoutButton /> : <LoginButton />;
};