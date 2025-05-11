
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface TextAreaProps {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  label: string;
  readOnly?: boolean;
  showCopy?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  placeholder,
  label,
  readOnly = false,
  showCopy = false,
}) => {
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied to clipboard!",
      description: "Your text has been copied to the clipboard.",
      duration: 2000,
    });
  };

  return (
    <div className="mb-6 relative">
      <div className="flex justify-between items-center mb-2">
        <label className="text-cyber-light-purple/90 font-semibold">
          {label}
        </label>
        {showCopy && value && (
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="text-cyber-purple hover:text-cyber-magenta transition-colors duration-300"
          >
            <Copy className="h-4 w-4 mr-1" />
            Copy
          </Button>
        )}
      </div>
      <div className={`relative ${readOnly ? 'cyber-panel' : ''}`}>
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          className={`w-full p-4 rounded-md h-32 resize-none text-lg 
                     ${readOnly 
                       ? 'bg-transparent text-cyber-magenta focus:ring-0 focus:outline-none animate-pulse-slow' 
                       : 'bg-cyber-dark-purple/80 border border-cyber-purple/30 focus:border-cyber-purple focus:ring-2 focus:ring-cyber-purple/40 text-white'}`}
        />
        {readOnly && value && (
          <div className="absolute inset-0 bg-cyber-purple/5 pointer-events-none rounded-md" />
        )}
      </div>
    </div>
  );
};

export default TextArea;
