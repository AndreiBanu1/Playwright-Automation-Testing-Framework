let CryptoJSUtil = require("crypto-js");

const SALT = process.env.SALT || "defaultSalt";

//Encryption function
export function encrypt(text: string) {
    const cipherText = CryptoJSUtil.AES.encrypt(text, SALT).toString();
    return cipherText;
}

//Decryption function
export function decrypt(cipherText: string) {
    const bytes = CryptoJSUtil.AES.decrypt(cipherText, SALT);
    const originalText = bytes.toString(CryptoJSUtil.enc.Utf8);
    return originalText;
}