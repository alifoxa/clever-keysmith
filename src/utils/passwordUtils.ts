
// Character sets for password generation
export const characters = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

export type PasswordSettings = {
  length: number;
  includeLowercase: boolean;
  includeUppercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
};

/**
 * Generates a random password based on settings
 */
export const generatePassword = (settings: PasswordSettings): string => {
  let charset = '';
  
  if (settings.includeLowercase) charset += characters.lowercase;
  if (settings.includeUppercase) charset += characters.uppercase;
  if (settings.includeNumbers) charset += characters.numbers;
  if (settings.includeSymbols) charset += characters.symbols;

  // If no character types are selected, default to lowercase
  if (charset === '') charset = characters.lowercase;

  let password = '';
  const charsetLength = charset.length;

  // Ensure we have at least one character from each selected type
  let mandatoryChars = '';
  if (settings.includeLowercase) {
    mandatoryChars += characters.lowercase.charAt(Math.floor(Math.random() * characters.lowercase.length));
  }
  if (settings.includeUppercase) {
    mandatoryChars += characters.uppercase.charAt(Math.floor(Math.random() * characters.uppercase.length));
  }
  if (settings.includeNumbers) {
    mandatoryChars += characters.numbers.charAt(Math.floor(Math.random() * characters.numbers.length));
  }
  if (settings.includeSymbols) {
    mandatoryChars += characters.symbols.charAt(Math.floor(Math.random() * characters.symbols.length));
  }

  // Add mandatory characters
  password = mandatoryChars;
  
  // Fill the rest of the password with random characters
  for (let i = password.length; i < settings.length; i++) {
    const randomIndex = Math.floor(Math.random() * charsetLength);
    password += charset.charAt(randomIndex);
  }

  // Shuffle the password to mix up the mandatory characters
  return shuffleString(password);
};

/**
 * Shuffles a string randomly
 */
const shuffleString = (str: string): string => {
  const arr = str.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
};

/**
 * Calculates password strength from 0-100
 */
export const calculatePasswordStrength = (password: string): number => {
  if (!password) return 0;
  
  let strength = 0;
  const length = password.length;

  // Length contribution (up to 30 points)
  strength += Math.min(30, length * 2);

  // Character variety contribution
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[^a-zA-Z0-9]/.test(password);

  // Add points for each character type (up to 40 points)
  const typesCount = [hasLowercase, hasUppercase, hasNumbers, hasSymbols].filter(Boolean).length;
  strength += typesCount * 10;

  // Add points for complexity (up to 30 points)
  const uniqueChars = new Set(password.split('')).size;
  strength += Math.min(30, Math.floor((uniqueChars / length) * 30));

  // Cap at 100
  return Math.min(100, strength);
};

/**
 * Gets a descriptive strength label
 */
export const getStrengthLabel = (strengthScore: number): string => {
  if (strengthScore < 20) return 'Very Weak';
  if (strengthScore < 40) return 'Weak';
  if (strengthScore < 60) return 'Moderate';
  if (strengthScore < 80) return 'Strong';
  return 'Very Strong';
};

/**
 * Gets color for strength indicator
 */
export const getStrengthColor = (strengthScore: number): string => {
  if (strengthScore < 20) return 'bg-red-500';
  if (strengthScore < 40) return 'bg-orange-500';
  if (strengthScore < 60) return 'bg-yellow-500';
  if (strengthScore < 80) return 'bg-lime-500';
  return 'bg-green-500';
};
