
import React from 'react';
import { Switch } from '@/components/ui/switch';

interface CharacterSelectorProps {
  label: string;
  isChecked: boolean;
  onChange: (checked: boolean) => void;
}

const CharacterSelector: React.FC<CharacterSelectorProps> = ({ 
  label, 
  isChecked, 
  onChange 
}) => {
  return (
    <div className="flex items-center justify-between py-3">
      <label 
        className="text-sm font-medium leading-none cursor-pointer"
      >
        {label}
      </label>
      <Switch 
        checked={isChecked} 
        onCheckedChange={onChange}
        className="data-[state=checked]:bg-primary"
      />
    </div>
  );
};

export default CharacterSelector;
