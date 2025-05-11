
import React from 'react';

const CipherHeader = () => {
  return (
    <div className="text-center mb-8 animate-float">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold neon-text mb-4">
        Caesar Cipher
      </h1>
      <p className="text-cyber-light-purple/80 text-lg max-w-2xl mx-auto">
        Encrypt and decrypt messages using the ancient technique of shifting letters.
        Adjust the shift value and watch your message transform in real-time.
      </p>
    </div>
  );
};

export default CipherHeader;
