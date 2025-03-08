
import React, { useEffect, useRef } from 'react';
import { calculatePasswordStrength, getStrengthLabel, getStrengthColor } from '@/utils/passwordUtils';

interface PasswordStrengthProps {
  password: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const strengthScore = calculatePasswordStrength(password);
  const strengthLabel = getStrengthLabel(strengthScore);
  const strengthColor = getStrengthColor(strengthScore);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.width = `${strengthScore}%`;
      
      // Add transition classes
      progressRef.current.classList.add('transition-all', 'duration-500', 'ease-out');
    }
  }, [strengthScore]);

  return (
    <div className="mt-6 animate-fade-in">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm text-muted-foreground">Password Strength</p>
        <p className="text-sm font-medium tracking-wide">{strengthLabel}</p>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div 
          ref={progressRef}
          className={`h-full ${strengthColor} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${strengthScore}%` }}
        />
      </div>
    </div>
  );
};

export default PasswordStrength;
