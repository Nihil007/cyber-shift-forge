
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface BruteForceResultsProps {
  results: { shift: number; result: string }[];
  onSelectResult: (text: string) => void;
}

const BruteForceResults: React.FC<BruteForceResultsProps> = ({ results, onSelectResult }) => {
  const { toast } = useToast();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  
  const handleCopyResult = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied!",
        description: "Text copied to clipboard",
        duration: 2000,
      });
    });
  };
  
  const handleUseResult = (text: string) => {
    onSelectResult(text);
    toast({
      title: "Result applied",
      description: "The selected decryption has been set as your text",
      duration: 2000,
    });
  };

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 mt-4">
      <h3 className="text-lg font-semibold text-cyber-light-purple mb-2">
        Possible Decryptions
      </h3>
      <div className="max-h-60 overflow-y-auto pr-2">
        <div className="space-y-2">
          {results.map((item, index) => (
            <div 
              key={index} 
              className="p-3 rounded-md bg-cyber-dark-purple/50 border border-cyber-purple/20 transition-all hover:border-cyber-purple/40"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 flex items-center justify-center rounded-full bg-cyber-purple/20 border border-cyber-purple/30 text-cyber-light-purple text-sm">
                    {item.shift}
                  </div>
                  <span 
                    className="text-cyber-light-purple cursor-pointer overflow-hidden text-ellipsis"
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  >
                    {expandedIndex === index ? item.result : item.result.length > 40 ? `${item.result.slice(0, 40)}...` : item.result}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline"
                    size="sm"
                    className="border-cyber-purple/30 text-cyber-light-purple text-xs"
                    onClick={() => handleCopyResult(item.result)}
                  >
                    Copy
                  </Button>
                  <Button 
                    size="sm"
                    className="bg-cyber-purple/70 hover:bg-cyber-purple text-white text-xs"
                    onClick={() => handleUseResult(item.result)}
                  >
                    Use
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BruteForceResults;
