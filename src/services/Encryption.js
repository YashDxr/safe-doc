import CryptoJS from "crypto-js";

async function encryptAndDecryptFile(pdfFile, aesKey) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileData = e.target.result;

      // Encrypting the file
      const encryptedFile = CryptoJS.AES.encrypt(fileData, aesKey).toString();

      // Decrypting the file
      const decryptedBytes = CryptoJS.AES.decrypt(encryptedFile, aesKey);
      const decryptedFile = decryptedBytes.toString(CryptoJS.enc.Latin1);

      // Creating Blobs for the encrypted and decrypted files
      const encryptedBlob = new Blob([encryptedFile], {
        type: "application/octet-stream",
      });
      const decryptedBlob = new Blob([decryptedFile], {
        type: "application/pdf",
      });

      // Creating URLs for the encrypted and decrypted files
      const encryptedUrl = URL.createObjectURL(encryptedBlob);
      const decryptedUrl = URL.createObjectURL(decryptedBlob);

      // Resolve the promise with encrypted and decrypted URLs
      resolve({ encryptedUrl, decryptedUrl });
    };
    reader.onerror = reject;
    reader.readAsDataURL(pdfFile);
  });
}

export default encryptAndDecryptFile;
