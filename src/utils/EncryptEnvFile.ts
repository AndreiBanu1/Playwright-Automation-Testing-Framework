let CryptoJSUtil = require("crypto-js");
let fs = require("fs");
let path = require("path");

const SALT = process.env.SALT || "defaultSalt";
const currentDir = __dirname;
// Go one level above (back to 'src')
const srcDir = path.resolve(currentDir, "..");

// Change to config folder
const configDir = path.resolve(srcDir, "config");

// Define the .env.qa and .env.uat file paths
const envQaFilePath = path.resolve(configDir, '.env.qa');
const envUatFilePath = path.resolve(configDir, '.env.uat');

// Function to check if the file is one of the target files (.env.qa or .envuat)
function isTargetEnvFile(filePath: string) {
    console.log("Checking if file is target:", filePath); // Debugging
  return filePath === envQaFilePath || filePath === envUatFilePath;
}

function isEncrypted(value: string): boolean {
    // Check if the value looks like base64 or hex encoded string
    const base64Pattern = /^[A-Za-z0-9+/=]+$/;
    const hexPattern = /^[A-Fa-f0-9]+$/;
    return base64Pattern.test(value) || hexPattern.test(value);
  }

export function verifyEnvEncryption(envFilePath: string): boolean {
  const envContent = fs.readFileSync(envFilePath, 'utf-8');
  const lines = envContent.split('\n');
  
  // Iterate over the lines and check each value
  for (const line of lines) {
    if (line.includes('=')) {
      const [key, value] = line.split('=');
      if (value && !isEncrypted(value)) {
        console.warn(`The value for ${key} seems unencrypted: ${value}`);
        return false;  // If any value is unencrypted, return false
      }
    }
  }
  return true;  // All values are encrypted
}

export function encryptEnvFile() {
  // Check if the file is one of the target files
  let envFilePath = process.env.NODE_ENV
    ? path.resolve(configDir, `.env.${process.env.NODE_ENV}`)
    : envQaFilePath; // Default to .env.qa

    console.log("Using .env file for decryption:", envFilePath);

  if (!isTargetEnvFile(envFilePath)) {
    console.log("No encryption required for file:", envFilePath);
    return;
  }

  console.log(`Encrypting ${envFilePath}...`);

  // Read the .env file
  const envFileContent = fs.readFileSync(envFilePath, "utf8");
  const envLines = envFileContent.split("\n");

  // Encrypt values and update the array
  const encryptedLines = envLines.map((line) => {
    const [key, value] = line.split("=");

    if (value) {
      const encryptedValue = CryptoJSUtil.AES.encrypt(value, SALT).toString();
      return `${key}=${encryptedValue}`;
    }

    return line;
  });

  // Join the lines and write back to the .env file
  const updatedEnvContent = encryptedLines.join("\n");
  fs.writeFileSync(envFilePath, updatedEnvContent, "utf8");

  console.log("Encryption complete. Updated .env file.");
}

export function decryptEnvFile() {
  let envFilePath = process.env.NODE_ENV
    ? path.resolve(configDir, `.env.${process.env.NODE_ENV}`)
    : envQaFilePath; // Default to .env.qa

  if (!isTargetEnvFile(envFilePath)) {
    console.log("No decryption required for file:", envFilePath);
    return;
  }

  console.log(`Decrypting ${envFilePath}...`);

  // Read the .env file
  const envFileContent = fs.readFileSync(envFilePath, "utf8");
  const envLines = envFileContent.split("\n");

  const decryptedLines = envLines.map((line) => {
    const [key, value] = line.split("=");

    if (value) {
      try {
        // Decrypt the value
        const bytes = CryptoJSUtil.AES.decrypt(value, SALT);
        const decryptedValue = bytes.toString(CryptoJSUtil.enc.Utf8);

        // Check if decryption was successful and valid
        if (!decryptedValue) {
          throw new Error(`Decryption failed for value: ${value}`);
        }

        return `${key}=${decryptedValue}`;
      } catch (error) {
        console.error(`Error decrypting value for key '${key}':`, error.message);
        return line; // Return the line as-is if decryption fails
      }
    }
    return line;
  });

  // Join the lines and write back to the .env file
  const updatedEnvContent = decryptedLines.join("\n");
  fs.writeFileSync(envFilePath, updatedEnvContent, "utf8");

  console.log("Decryption complete. Updated .env file.");
}
