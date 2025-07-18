
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { LogIn, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Basic hashing function (for demonstration only - NOT cryptographically secure)
// Must match the one used in RegisterPage.
const simpleHash = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return hash.toString();
};

const LoginPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      // Check credentials against localStorage
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const enteredPasswordHash = simpleHash(password);
      const foundUser = existingUsers.find(user => user.email === email && user.password === enteredPasswordHash);

      if (foundUser) {
        toast({
          title: "Login Successful",
          description: "Redirecting...", // Update when dashboard exists
          variant: "default",
        });
        // Store login state (e.g., in localStorage or context)
        localStorage.setItem('loggedInUser', JSON.stringify({ email: foundUser.email }));
        // navigate('/dashboard'); // Uncomment when dashboard exists
        console.log("Login successful, would navigate to dashboard.");
        setEmail('');
        setPassword('');
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("LocalStorage Error:", error);
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12 fade-in">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-full max-w-md mx-auto shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold"> Login</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                 <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    {/* Add Forgot Password functionality later if needed */}
                     <Button variant="link" size="sm" className="p-0 h-auto text-xs" asChild>
                        <Link to="/forgot-password">Forgot password?</Link>
                    </Button> 
                 </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <LogIn className="mr-2 h-4 w-4" />
                )}
                {isLoading ? 'Logging In...' : 'Login'}
              </Button>
            </form>
             <p className="mt-6 text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Button variant="link" className="p-0 h-auto" asChild>
                    <Link to="/register">Sign up</Link>
                </Button>
             </p>
             {/* Placeholder for Admin Login Link */}
              <p className="mt-2 text-center text-xs text-muted-foreground">
                <Button variant="link" className="p-0 h-auto text-xs" asChild>
                    <Link to="/admin">Admin Access</Link>
                </Button>
             </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;
  