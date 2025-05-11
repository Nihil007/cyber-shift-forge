
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

interface ShiftControlProps {
  shift: number;
  setShift: (value: number) => void;
}

const ShiftControl: React.FC<ShiftControlProps> = ({ shift, setShift }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <label className="text-cyber-light-purple/90 font-semibold">
          Shift Value:
        </label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-cyber-purple glow-border neon-purple-glow bg-cyber-dark-purple/80 text-cyber-purple font-bold cursor-help">
                {shift}
              </div>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Caesar used a shift of 3 for his secret messages</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <Slider
        min={1}
        max={25}
        step={1}
        value={[shift]}
        onValueChange={(values) => setShift(values[0])}
        className="py-2"
      />
      
      <div className="flex justify-between text-xs text-cyber-light-purple/60 mt-1">
        <span>1</span>
        <span>25</span>
      </div>
    </div>
  );
};

export default ShiftControl;
