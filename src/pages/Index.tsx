
import { useState, useEffect } from 'react';
import PasswordGenerator from '@/components/PasswordGenerator';

const Index = () => {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/50 p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-slide-down">
          <div className="inline-block bg-primary/10 text-primary text-xs font-medium py-1 px-3 rounded-full mb-3">
            Simple & Secure
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
            Generate Strong Passwords
          </h1>
          <p className="text-muted-foreground">
            Create secure, unique passwords with our elegant password generator.
          </p>
        </div>
        
        <PasswordGenerator />
        
        <div className="mt-8 text-center animate-fade-in text-sm text-muted-foreground">
          <p>
            Your passwords are generated locally and never stored or transmitted.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
