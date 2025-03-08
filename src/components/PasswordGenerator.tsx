
import React, { useState, useEffect, useRef } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import CharacterSelector from './CharacterSelector';
import PasswordStrength from './PasswordStrength';
import { generatePassword } from '@/utils/passwordUtils';
import { Check, Copy, RefreshCw, Shield } from 'lucide-react';

interface PasswordGeneratorProps {}

const PasswordGenerator: React.FC<PasswordGeneratorProps> = () => {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(12);
  const [copied, setCopied] = useState(false);
  const [passwordSettings, setPasswordSettings] = useState({
    includeLowercase: true,
    includeUppercase: true,
    includeNumbers: true,
    includeSymbols: false,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const passwordRef = useRef<HTMLDivElement>(null);
  const copyButtonRef = useRef<HTMLButtonElement>(null);

  // Generate initial password
  useEffect(() => {
    generateNewPassword();
  }, []);

  // Update password when settings change
  useEffect(() => {
    generateNewPassword();
  }, [passwordLength, passwordSettings]);

  const generateNewPassword = () => {
    setIsGenerating(true);
    
    // Small timeout to allow animation to play
    setTimeout(() => {
      const newPassword = generatePassword({
        length: passwordLength,
        ...passwordSettings
      });
      setPassword(newPassword);
      setIsGenerating(false);
      setCopied(false);
    }, 300);
  };

  const copyToClipboard = async () => {
    if (!password) return;
    
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      
      if (copyButtonRef.current) {
        copyButtonRef.current.classList.add('success-animate');
        setTimeout(() => {
          copyButtonRef.current?.classList.remove('success-animate');
        }, 500);
      }
      
      toast('Password copied to clipboard', {
        description: 'Your generated password has been copied to your clipboard.',
        duration: 3000,
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast('Failed to copy password', {
        description: 'Please try again or copy manually.',
        duration: 3000,
      });
    }
  };

  const handleSliderChange = (value: number[]) => {
    setPasswordLength(value[0]);
  };

  return (
    <div className="frosted-glass rounded-2xl p-6 md:p-8 max-w-md w-full mx-auto shadow-xl animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold tracking-tight">Password Generator</h2>
      </div>
      
      <div 
        ref={passwordRef}
        className={`relative bg-secondary/50 rounded-lg p-4 h-20 flex items-center justify-between overflow-hidden ${isGenerating ? 'animate-pulse' : ''}`}
      >
        <div className="font-mono text-xl font-medium tracking-wider overflow-x-auto whitespace-nowrap no-scrollbar w-full pr-10">
          {isGenerating ? (
            <div className="animate-pulse">Generating...</div>
          ) : (
            password.split('').map((char, index) => (
              <span 
                key={index} 
                className="password-character inline-block"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                {char}
              </span>
            ))
          )}
        </div>
        <button
          ref={copyButtonRef}
          onClick={copyToClipboard}
          className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 p-1 rounded-md"
          disabled={isGenerating}
          aria-label="Copy password to clipboard"
        >
          {copied ? (
            <Check className="h-5 w-5 text-green-500" />
          ) : (
            <Copy className="h-5 w-5" />
          )}
        </button>
      </div>
      
      <PasswordStrength password={password} />
      
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium">Password Length</label>
          <span className="text-sm font-mono bg-secondary px-2 py-1 rounded">{passwordLength}</span>
        </div>
        <Slider
          defaultValue={[passwordLength]}
          min={6}
          max={32}
          step={1}
          onValueChange={handleSliderChange}
          className="mb-6"
        />
        
        <div className="space-y-1">
          <CharacterSelector
            label="Include Lowercase (a-z)"
            isChecked={passwordSettings.includeLowercase}
            onChange={(checked) => setPasswordSettings({...passwordSettings, includeLowercase: checked})}
          />
          <CharacterSelector
            label="Include Uppercase (A-Z)"
            isChecked={passwordSettings.includeUppercase}
            onChange={(checked) => setPasswordSettings({...passwordSettings, includeUppercase: checked})}
          />
          <CharacterSelector
            label="Include Numbers (0-9)"
            isChecked={passwordSettings.includeNumbers}
            onChange={(checked) => setPasswordSettings({...passwordSettings, includeNumbers: checked})}
          />
          <CharacterSelector
            label="Include Symbols (!@#$%...)"
            isChecked={passwordSettings.includeSymbols}
            onChange={(checked) => setPasswordSettings({...passwordSettings, includeSymbols: checked})}
          />
        </div>
      </div>
      
      <div className="mt-8">
        <Button 
          onClick={generateNewPassword}
          disabled={isGenerating}
          className="w-full group relative overflow-hidden"
        >
          <span className="flex items-center justify-center gap-2">
            <RefreshCw className={`h-4 w-4 transition-transform ${isGenerating ? 'animate-rotate-center' : 'group-hover:rotate-90'}`} />
            Generate New Password
          </span>
        </Button>
      </div>
    </div>
  );
};

export default PasswordGenerator;
