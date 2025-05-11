
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { InfoIcon } from 'lucide-react';

export type CipherMode = 
  | 'caesar'
  | 'bruteforce'
  | 'multi-shift'
  | 'vigenere'
  | 'custom-pattern';

interface ModeSelectorProps {
  mode: CipherMode;
  setMode: (mode: CipherMode) => void;
}

const modeInfo = {
  caesar: {
    title: "Basic Caesar Cipher",
    description: "Uses a single shift value for all characters"
  },
  bruteforce: {
    title: "Reverse Caesar (Brute Force)",
    description: "Tries all possible shifts to help decrypt without a known key"
  },
  "multi-shift": {
    title: "Multi-Shift Mode",
    description: "Apply different shift values to each word"
  },
  vigenere: {
    title: "Vigenère Cipher",
    description: "Uses a keyword to determine variable shifts"
  },
  "custom-pattern": {
    title: "Custom Shift Pattern",
    description: "Define a sequence of shifts to apply to each character"
  }
};

const ModeSelector: React.FC<ModeSelectorProps> = ({ mode, setMode }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <label className="text-cyber-light-purple/90 font-semibold">
          Cipher Mode:
        </label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <InfoIcon size={16} className="text-cyber-light-purple/70 cursor-help" />
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              <p>Choose from different encryption methods</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <Select value={mode} onValueChange={(value) => setMode(value as CipherMode)}>
        <SelectTrigger className="w-full bg-cyber-dark-purple/60 border-cyber-purple/30 text-cyber-light-purple">
          <SelectValue placeholder="Select a cipher mode" />
        </SelectTrigger>
        <SelectContent className="bg-cyber-dark-purple border-cyber-purple/30">
          {Object.entries(modeInfo).map(([key, info]) => (
            <SelectItem key={key} value={key} className="text-cyber-light-purple hover:bg-cyber-purple/20">
              <div>
                <span className="font-medium">{info.title}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <p className="mt-2 text-sm text-cyber-light-purple/60">
        {modeInfo[mode].description}
      </p>
    </div>
  );
};

export default ModeSelector;
