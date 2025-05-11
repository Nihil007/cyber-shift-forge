
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusIcon, MinusIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CipherMode } from './ModeSelector';

interface ModeParametersProps {
  mode: CipherMode;
  onParamsChange: (params: any) => void;
}

const ModeParameters: React.FC<ModeParametersProps> = ({ mode, onParamsChange }) => {
  const [keyword, setKeyword] = useState('CYBER');
  const [multiShifts, setMultiShifts] = useState<number[]>([3, 5, 7]);
  const [customPattern, setCustomPattern] = useState<number[]>([1, 3, 5]);
  
  // Handle keyword change for Vigenère cipher
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Filter out non-alphabetic characters
    const filteredKeyword = e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase();
    setKeyword(filteredKeyword);
    onParamsChange({ keyword: filteredKeyword });
  };
  
  // Handle multi-shift updates
  const handleMultiShiftChange = (index: number, value: number) => {
    const newShifts = [...multiShifts];
    newShifts[index] = value;
    setMultiShifts(newShifts);
    onParamsChange({ shifts: newShifts });
  };
  
  // Handle custom pattern updates
  const handlePatternChange = (index: number, value: number) => {
    const newPattern = [...customPattern];
    newPattern[index] = value;
    setCustomPattern(newPattern);
    onParamsChange({ pattern: newPattern });
  };
  
  // Add a new shift value
  const addShiftValue = (array: number[], setter: React.Dispatch<React.SetStateAction<number[]>>, callback: (arr: number[]) => void) => {
    const newArray = [...array, 1];
    setter(newArray);
    callback(newArray);
  };
  
  // Remove a shift value
  const removeShiftValue = (index: number, array: number[], setter: React.Dispatch<React.SetStateAction<number[]>>, callback: (arr: number[]) => void) => {
    if (array.length <= 1) return;
    const newArray = array.filter((_, i) => i !== index);
    setter(newArray);
    callback(newArray);
  };
  
  // For brute force mode, nothing to configure
  if (mode === 'bruteforce') {
    return (
      <div className="mb-6 p-4 rounded-md bg-cyber-dark-purple/40 border border-cyber-purple/20">
        <p className="text-sm text-cyber-light-purple/80">
          This mode will attempt all possible 25 shifts to decode your message.
        </p>
      </div>
    );
  }

  // Vigenère cipher parameters
  if (mode === 'vigenere') {
    return (
      <div className="mb-6">
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-cyber-light-purple/80">
            Keyword (alphabetic characters only)
          </label>
          <Input 
            type="text"
            value={keyword}
            onChange={handleKeywordChange}
            className="bg-cyber-dark-purple/60 border-cyber-purple/30 text-cyber-light-purple"
            placeholder="Enter keyword"
          />
          <p className="text-xs text-cyber-light-purple/60">
            Each letter in the keyword determines the shift value for each corresponding character in your message.
          </p>
        </div>
      </div>
    );
  }

  // Multi-shift parameters
  if (mode === 'multi-shift') {
    return (
      <div className="mb-6">
        <label className="block text-sm text-cyber-light-purple/80 mb-2">
          Shift values for each word
        </label>
        <div className="space-y-3">
          {multiShifts.map((shift, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                type="number"
                min={1}
                max={25}
                value={shift}
                onChange={(e) => handleMultiShiftChange(index, parseInt(e.target.value) || 1)}
                className="w-20 bg-cyber-dark-purple/60 border-cyber-purple/30 text-cyber-light-purple"
              />
              <span className="text-cyber-light-purple/60">Word {index + 1}</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="p-0 w-8 h-8 border-cyber-purple/30"
                      onClick={() => removeShiftValue(index, multiShifts, setMultiShifts, (arr) => onParamsChange({ shifts: arr }))}
                    >
                      <MinusIcon className="h-4 w-4 text-cyber-light-purple" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Remove this shift</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ))}
          
          <Button 
            variant="outline" 
            className="border-cyber-purple/30 text-cyber-light-purple"
            onClick={() => addShiftValue(multiShifts, setMultiShifts, (arr) => onParamsChange({ shifts: arr }))}
          >
            <PlusIcon className="mr-1 h-4 w-4" /> Add Shift
          </Button>
        </div>
        <p className="mt-2 text-xs text-cyber-light-purple/60">
          Each word in your message will be shifted by the corresponding value. If you have more words than shifts, the pattern repeats.
        </p>
      </div>
    );
  }

  // Custom pattern parameters
  if (mode === 'custom-pattern') {
    return (
      <div className="mb-6">
        <label className="block text-sm text-cyber-light-purple/80 mb-2">
          Shift pattern sequence
        </label>
        <div className="space-y-3">
          {customPattern.map((shift, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                type="number"
                min={1}
                max={25}
                value={shift}
                onChange={(e) => handlePatternChange(index, parseInt(e.target.value) || 1)}
                className="w-20 bg-cyber-dark-purple/60 border-cyber-purple/30 text-cyber-light-purple"
              />
              <span className="text-cyber-light-purple/60">Position {index + 1}</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="p-0 w-8 h-8 border-cyber-purple/30"
                      onClick={() => removeShiftValue(index, customPattern, setCustomPattern, (arr) => onParamsChange({ pattern: arr }))}
                    >
                      <MinusIcon className="h-4 w-4 text-cyber-light-purple" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Remove this shift</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ))}
          
          <Button 
            variant="outline" 
            className="border-cyber-purple/30 text-cyber-light-purple"
            onClick={() => addShiftValue(customPattern, setCustomPattern, (arr) => onParamsChange({ pattern: arr }))}
          >
            <PlusIcon className="mr-1 h-4 w-4" /> Add Pattern Value
          </Button>
        </div>
        <p className="mt-2 text-xs text-cyber-light-purple/60">
          Each character is shifted according to this pattern sequence. The pattern repeats for longer text.
        </p>
      </div>
    );
  }

  // Default for caesar mode - no additional parameters needed
  return null;
};

export default ModeParameters;
