/**
 * Encrypts or decrypts a message using the Caesar cipher algorithm
 * 
 * @param text - The input text to encrypt/decrypt
 * @param shift - The number of positions to shift (positive for encrypt, negative for decrypt)
 * @returns The encrypted/decrypted text
 */
export const caesarCipher = (text: string, shift: number): string => {
  // Ensure the shift is within the range 0-25
  const normalizedShift = ((shift % 26) + 26) % 26;
  
  return text
    .split('')
    .map(char => {
      // Get the character code
      const code = char.charCodeAt(0);
      
      // Handle uppercase letters (ASCII 65-90)
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + normalizedShift) % 26) + 65);
      }
      // Handle lowercase letters (ASCII 97-122)
      else if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + normalizedShift) % 26) + 97);
      }
      // Return non-alphabetic characters unchanged
      return char;
    })
    .join('');
};

/**
 * Decrypts a message using the Caesar cipher algorithm
 * 
 * @param text - The encrypted text to decrypt
 * @param shift - The number of positions used for encryption
 * @returns The decrypted text
 */
export const decryptCaesar = (text: string, shift: number): string => {
  // To decrypt, we shift in the opposite direction (26 - shift)
  return caesarCipher(text, -shift);
};
