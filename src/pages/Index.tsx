
import React from 'react';
import CaesarCipher from '@/components/CaesarCipher/CaesarCipher';

const Index = () => {
  return (
    <div className="min-h-screen bg-cyber-gradient flex flex-col items-center justify-center py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(155,135,245,0.15),transparent_80%)]"></div>
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: Math.random() > 0.5 ? '#9b87f5' : '#D946EF',
              boxShadow: `0 0 ${Math.random() * 10 + 5}px ${Math.random() > 0.5 ? '#9b87f5' : '#D946EF'}`,
              opacity: Math.random() * 0.5 + 0.3,
              animation: `float ${Math.random() * 10 + 10}s infinite`
            }}
          />
        ))}
      </div>
      <div className="relative z-10 w-full">
        <CaesarCipher />
      </div>
    </div>
  );
};

export default Index;
