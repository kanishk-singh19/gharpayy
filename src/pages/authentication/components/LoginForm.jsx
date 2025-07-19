import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';


const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for testing
  const mockCredentials = {
    email: 'user@gharpayy.com',
    phone: '+919876543210',
    password: 'password123'
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.emailOrPhone.trim()) {
      newErrors.emailOrPhone = 'Email or phone number is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock authentication check
      const isValidCredentials = 
        (formData.emailOrPhone === mockCredentials.email || 
         formData.emailOrPhone === mockCredentials.phone) &&
        formData.password === mockCredentials.password;

      if (isValidCredentials) {
        // Store auth token
        localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
        localStorage.setItem('userEmail', formData.emailOrPhone);
        
        // Redirect to dashboard
        navigate('/user-dashboard');
      } else {
        setErrors({
          emailOrPhone: 'Invalid credentials. Use user@gharpayy.com or +919876543210',
          password: 'Invalid credentials. Use password123'
        });
      }
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    // Mock social login
    localStorage.setItem('authToken', `mock-${provider}-token-` + Date.now());
    navigate('/user-dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.general && (
        <div className="bg-error/10 border border-error/20 rounded-md p-3">
          <p className="text-error text-sm">{errors.general}</p>
        </div>
      )}

      <Input
        label="Email or Phone Number"
        type="text"
        name="emailOrPhone"
        placeholder="Enter email or +91 phone number"
        value={formData.emailOrPhone}
        onChange={handleInputChange}
        error={errors.emailOrPhone}
        required
      />

      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleInputChange}
        error={errors.password}
        required
      />

      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          name="rememberMe"
          checked={formData.rememberMe}
          onChange={handleInputChange}
        />
        
        <Link 
          to="/authentication" 
          className="text-sm text-primary hover:text-primary/80 transition-colors"
        >
          Forgot password?
        </Link>
      </div>

      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-card text-text-secondary">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialLogin('google')}
          iconName="Mail"
          iconPosition="left"
        >
          Google
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialLogin('facebook')}
          iconName="Facebook"
          iconPosition="left"
        >
          Facebook
        </Button>
      </div>

      <div className="bg-muted/50 rounded-lg p-4 mt-6">
        <h4 className="font-medium text-sm mb-2">Demo Credentials:</h4>
        <div className="text-xs text-text-secondary space-y-1">
          <p>Email: user@gharpayy.com</p>
          <p>Phone: +919876543210</p>
          <p>Password: password123</p>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;