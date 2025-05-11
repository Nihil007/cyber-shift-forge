
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';

interface CipherToolbarProps {
  onReset: () => void;
  onSwitch: () => void;
  mode: 'encrypt' | 'decrypt';
}

const CipherToolbar: React.FC<CipherToolbarProps> = ({ onReset, onSwitch, mode }) => {
  const { toast } = useToast();
  
  const handleReset = () => {
    onReset();
    toast({
      title: "Reset complete!",
      description: "All fields have been cleared.",
      duration: 2000,
    });
  };

  return (
    <div className="flex justify-center space-x-4 mt-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              onClick={handleReset}
              variant="outline"
              className="border border-cyber-purple/30 bg-cyber-dark-purple/50 text-cyber-light-purple hover:bg-cyber-dark-purple/80 hover:border-cyber-purple transition-all duration-300"
            >
              Reset
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Clear all fields and start fresh</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onSwitch}
              className="bg-gradient-to-r from-cyber-purple to-cyber-magenta text-white hover:opacity-90 transition-all duration-300"
            >
              Switch to {mode === 'encrypt' ? 'Decrypt' : 'Encrypt'}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle between encryption and decryption</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default CipherToolbar;
