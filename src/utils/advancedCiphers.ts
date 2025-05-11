/**
 * Performs a brute force decryption by trying all possible Caesar shifts
 * @param text - The encrypted text to decrypt
 * @returns An array of possible decryptions with their shifts
 */
export const bruteForceCaesar = (text: string): { shift: number; result: string }[] => {
  const results: { shift: number; result: string }[] = [];
  
  // Try all possible shifts (1-25)
  for (let shift = 1; shift <= 25; shift++) {
    const result = decryptWithShift(text, shift);
    results.push({ shift, result });
  }
  
  return results;
};

/**
 * Decrypts text using a specific shift value
 */
const decryptWithShift = (text: string, shift: number): string => {
  // Convert to a positive shift in the range 0-25
  const normalizedShift = ((shift % 26) + 26) % 26;
  
  return text
    .split('')
    .map(char => {
      const code = char.charCodeAt(0);
      
      // Handle uppercase letters (ASCII 65-90)
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 - normalizedShift + 26) % 26) + 65);
      }
      // Handle lowercase letters (ASCII 97-122)
      else if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 - normalizedShift + 26) % 26) + 97);
      }
      // Return non-alphabetic characters unchanged
      return char;
    })
    .join('');
};

/**
 * Applies multi-shift encryption/decryption where each word gets a different shift
 * @param text - The text to process
 * @param shifts - Array of shift values to apply to each word
 * @param mode - 'encrypt' or 'decrypt'
 * @returns The processed text
 */
export const multiShiftCipher = (text: string, shifts: number[], mode: 'encrypt' | 'decrypt'): string => {
  // If no shifts provided, return original text
  if (!shifts.length) return text;
  
  const words = text.split(' ');
  const processedWords = words.map((word, index) => {
    // Use modulo to cycle through shifts if there are more words than shifts
    const shift = shifts[index % shifts.length];
    // Apply appropriate shift based on mode
    const effectiveShift = mode === 'encrypt' ? shift : -shift;
    
    return word
      .split('')
      .map(char => {
        const code = char.charCodeAt(0);
        
        // Handle uppercase letters (ASCII 65-90)
        if (code >= 65 && code <= 90) {
          return String.fromCharCode(((code - 65 + effectiveShift + 26) % 26) + 65);
        }
        // Handle lowercase letters (ASCII 97-122)
        else if (code >= 97 && code <= 122) {
          return String.fromCharCode(((code - 97 + effectiveShift + 26) % 26) + 97);
        }
        // Return non-alphabetic characters unchanged
        return char;
      })
      .join('');
  });
  
  return processedWords.join(' ');
};

/**
 * Implements the Vigenère cipher encryption/decryption
 * @param text - The text to process
 * @param keyword - The keyword used for shifting
 * @param mode - 'encrypt' or 'decrypt'
 * @returns The processed text
 */
export const vigenereCipher = (text: string, keyword: string, mode: 'encrypt' | 'decrypt'): string => {
  if (!keyword) return text;
  
  // Convert keyword to uppercase for consistency
  const uppercaseKeyword = keyword.toUpperCase();
  let keyIndex = 0;
  
  return text
    .split('')
    .map(char => {
      const code = char.charCodeAt(0);
      
      // Process only alphabetic characters
      if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
        // Get the shift value from the current keyword character (A=0, B=1, etc.)
        const currentKey = uppercaseKeyword.charCodeAt(keyIndex % uppercaseKeyword.length) - 65;
        // Move to next keyword character
        keyIndex++;
        
        // Apply shift based on mode
        const shift = mode === 'encrypt' ? currentKey : -currentKey;
        
        // Apply to uppercase
        if (code >= 65 && code <= 90) {
          return String.fromCharCode(((code - 65 + shift + 26) % 26) + 65);
        }
        // Apply to lowercase
        else {
          return String.fromCharCode(((code - 97 + shift + 26) % 26) + 97);
        }
      }
      
      // Return non-alphabetic characters unchanged
      return char;
    })
    .join('');
};

/**
 * Applies a custom pattern of shifts to the text
 * @param text - The text to process
 * @param pattern - Array of shift values to apply in sequence
 * @param mode - 'encrypt' or 'decrypt'
 * @returns The processed text
 */
export const customShiftPattern = (text: string, pattern: number[], mode: 'encrypt' | 'decrypt'): string => {
  if (!pattern.length) return text;
  
  let patternIndex = 0;
  
  return text
    .split('')
    .map(char => {
      const code = char.charCodeAt(0);
      
      // Process only alphabetic characters
      if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
        // Get the current shift from the pattern
        const currentShift = pattern[patternIndex % pattern.length];
        // Move to next pattern value
        patternIndex++;
        
        // Apply shift based on mode
        const shift = mode === 'encrypt' ? currentShift : -currentShift;
        
        // Apply to uppercase
        if (code >= 65 && code <= 90) {
          return String.fromCharCode(((code - 65 + shift + 26) % 26) + 65);
        }
        // Apply to lowercase
        else {
          return String.fromCharCode(((code - 97 + shift + 26) % 26) + 97);
        }
      }
      
      // Return non-alphabetic characters unchanged
      return char;
    })
    .join('');
};
