import React from 'react';
import Button from '../../../components/ui/Button';

const AuthToggle = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex bg-muted rounded-lg p-1 mb-8">
      <Button
        variant={activeTab === 'login' ? 'default' : 'ghost'}
        size="sm"
        fullWidth
        onClick={() => onTabChange('login')}
        className="rounded-md"
      >
        Login
      </Button>
      <Button
        variant={activeTab === 'register' ? 'default' : 'ghost'}
        size="sm"
        fullWidth
        onClick={() => onTabChange('register')}
        className="rounded-md"
      >
        Register
      </Button>
    </div>
  );
};

export default AuthToggle;