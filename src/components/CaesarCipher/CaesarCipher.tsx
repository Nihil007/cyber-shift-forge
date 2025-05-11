
import React, { useState, useEffect } from 'react';
import CipherHeader from './CipherHeader';
import ShiftControl from './ShiftControl';
import TextArea from './TextArea';
import CipherToolbar from './CipherToolbar';
import ModeSelector, { CipherMode } from './ModeSelector';
import ModeParameters from './ModeParameters';
import BruteForceResults from './BruteForceResults';
import { caesarCipher, decryptCaesar } from '@/utils/caesarCipher';
import { 
  bruteForceCaesar, 
  multiShiftCipher,
  vigenereCipher,
  customShiftPattern
} from '@/utils/advancedCiphers';

const CaesarCipher = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [shift, setShift] = useState(3);
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [cipherMode, setCipherMode] = useState<CipherMode>('caesar');
  const [bruteForceResults, setBruteForceResults] = useState<{ shift: number; result: string }[]>([]);
  const [modeParams, setModeParams] = useState({
    keyword: 'CYBER',
    shifts: [3, 5, 7],
    pattern: [1, 3, 5]
  });

  // Process text whenever input, shift, mode, or cipher mode changes
  useEffect(() => {
    if (!inputText) {
      setOutputText('');
      setBruteForceResults([]);
      return;
    }

    // Process based on cipher mode
    switch (cipherMode) {
      case 'caesar':
        // Standard Caesar cipher
        if (mode === 'encrypt') {
          setOutputText(caesarCipher(inputText, shift));
        } else {
          setOutputText(decryptCaesar(inputText, shift));
        }
        setBruteForceResults([]);
        break;

      case 'bruteforce':
        // Only available in decrypt mode
        if (mode === 'decrypt') {
          const results = bruteForceCaesar(inputText);
          setBruteForceResults(results);
          // Set the first result as the output text
          setOutputText(results.length > 0 ? results[0].result : '');
        } else {
          setOutputText('Switch to decrypt mode to use brute force');
          setBruteForceResults([]);
        }
        break;

      case 'multi-shift':
        // Multi-shift cipher
        setOutputText(multiShiftCipher(inputText, modeParams.shifts, mode));
        setBruteForceResults([]);
        break;

      case 'vigenere':
        // Vigenère cipher
        setOutputText(vigenereCipher(inputText, modeParams.keyword, mode));
        setBruteForceResults([]);
        break;

      case 'custom-pattern':
        // Custom shift pattern
        setOutputText(customShiftPattern(inputText, modeParams.pattern, mode));
        setBruteForceResults([]);
        break;

      default:
        setOutputText('');
        setBruteForceResults([]);
    }
  }, [inputText, shift, mode, cipherMode, modeParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleReset = () => {
    setInputText('');
    setOutputText('');
    setShift(3);
    setBruteForceResults([]);
  };

  const toggleMode = () => {
    setMode(mode === 'encrypt' ? 'decrypt' : 'encrypt');
    // Clear brute force results when switching modes
    setBruteForceResults([]);
  };

  const handleModeChange = (newMode: CipherMode) => {
    setCipherMode(newMode);
    // Reset brute force results when changing cipher mode
    setBruteForceResults([]);
  };

  const handleParamsChange = (params: any) => {
    setModeParams(prev => ({ ...prev, ...params }));
  };

  const handleSelectBruteForceResult = (text: string) => {
    setInputText(text);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto px-4 sm:px-6">
      <CipherHeader />
      
      <div className="cyber-card w-full rounded-xl p-6 sm:p-8">
        <div className="mb-6 text-center">
          <div className="inline-block px-4 py-2 rounded-full bg-cyber-dark-purple/70 border border-cyber-purple/30 text-cyber-purple font-medium">
            Mode: {mode === 'encrypt' ? 'Encryption' : 'Decryption'}
          </div>
        </div>
        
        <ModeSelector mode={cipherMode} setMode={handleModeChange} />
        
        <ModeParameters mode={cipherMode} onParamsChange={handleParamsChange} />
        
        {cipherMode === 'caesar' && (
          <ShiftControl shift={shift} setShift={setShift} />
        )}
        
        <TextArea 
          value={inputText}
          onChange={handleInputChange}
          placeholder={mode === 'encrypt' ? "Enter text to encrypt..." : "Enter text to decrypt..."}
          label={mode === 'encrypt' ? "Plain Text" : "Encrypted Text"}
        />
        
        {cipherMode === 'bruteforce' && mode === 'decrypt' && (
          <BruteForceResults 
            results={bruteForceResults} 
            onSelectResult={handleSelectBruteForceResult} 
          />
        )}
        
        <TextArea 
          value={outputText}
          placeholder={mode === 'encrypt' ? "Encrypted text will appear here..." : "Decrypted text will appear here..."}
          label={mode === 'encrypt' ? "Encrypted Text" : "Decrypted Text"}
          readOnly={true}
          showCopy={true}
        />
        
        <CipherToolbar 
          onReset={handleReset}
          onSwitch={toggleMode}
          mode={mode}
        />
      </div>
      
      <div className="mt-8 text-center text-cyber-light-purple/60 text-sm">
        <p>The Caesar cipher is one of the earliest and simplest encryption techniques.</p>
        <p>It shifts each letter by a fixed number of positions in the alphabet.</p>
      </div>
    </div>
  );
};

export default CaesarCipher;
