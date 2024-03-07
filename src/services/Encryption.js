export const encryptData = async (file, password) => {
  const arrayBuffer = await file.arrayBuffer();
  const passwordData = new TextEncoder().encode(password);

  const key = await window.crypto.subtle.importKey(
    'raw',
    passwordData,
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const derivedKey = await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    key,
    { name: 'AES-CBC', length: 256 },
    true,
    ['encrypt']
  );
  const iv = window.crypto.getRandomValues(new Uint8Array(16));
  const encryptedData = await window.crypto.subtle.encrypt(
    {
      name: 'AES-CBC',
      iv
    },
    derivedKey,
    arrayBuffer
  );
  const encryptedArrayBuffer = new Uint8Array(encryptedData);
  const resultBuffer = new Uint8Array(iv.byteLength + encryptedArrayBuffer.byteLength);
  resultBuffer.set(iv, 0);
  resultBuffer.set(encryptedArrayBuffer, iv.byteLength);

  return resultBuffer;
};
