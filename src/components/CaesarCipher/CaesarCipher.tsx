
import React, { useState, useEffect } from 'react';
import CipherHeader from './CipherHeader';
import ShiftControl from './ShiftControl';
import TextArea from './TextArea';
import CipherToolbar from './CipherToolbar';
import { caesarCipher, decryptCaesar } from '@/utils/caesarCipher';

const CaesarCipher = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [shift, setShift] = useState(3);
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');

  // Process text whenever input, shift, or mode changes
  useEffect(() => {
    if (inputText) {
      if (mode === 'encrypt') {
        setOutputText(caesarCipher(inputText, shift));
      } else {
        setOutputText(decryptCaesar(inputText, shift));
      }
    } else {
      setOutputText('');
    }
  }, [inputText, shift, mode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleReset = () => {
    setInputText('');
    setOutputText('');
    setShift(3);
  };

  const toggleMode = () => {
    setMode(mode === 'encrypt' ? 'decrypt' : 'encrypt');
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
        
        <ShiftControl shift={shift} setShift={setShift} />
        
        <TextArea 
          value={inputText}
          onChange={handleInputChange}
          placeholder={mode === 'encrypt' ? "Enter text to encrypt..." : "Enter text to decrypt..."}
          label={mode === 'encrypt' ? "Plain Text" : "Encrypted Text"}
        />
        
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
