// import forge from "node-forge";

// const ENCRYPTION_AES_ENC_KEY_OPTIONS = {
//   iterations: 10000, // Number of iterations for PBKDF2 (adjust according to your security needs)
//   keySize: 32, // AES key size in bytes (256 bits is commonly used)
// };
// export const generateAesKey = () => {
//   const aesSalt = forge.random.getBytesSync(16);
//   const keyPassPhrase = forge.random.getBytesSync(16);
//   const aesKey = forge.pkcs5.pbkdf2(
//     keyPassPhrase,
//     aesSalt,
//     ENCRYPTION_AES_ENC_KEY_OPTIONS.iterations,
//     ENCRYPTION_AES_ENC_KEY_OPTIONS.keySize
//   );
//   return aesKey;
// };

// // var key = generateAesKey();
// // console.log("Key is: ", key);


export const generateAesKey = async () => {
  const key = await window.crypto.subtle.generateKey(
    {
      name: 'AES-CBC',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt']
  );
  return key;
};


export const exportAesKey = async (key) => {
  const exportedKey = await window.crypto.subtle.exportKey('raw', key);
  const exportedKeyArray = new Uint8Array(exportedKey);
  const exportedKeyBase64 = btoa(String.fromCharCode(...exportedKeyArray));
  return exportedKeyBase64;
};
