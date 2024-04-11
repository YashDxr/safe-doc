export const generateAesKey = async () => {
  const key = await window.crypto.subtle.generateKey(
    {
      name: "AES-CBC",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );
  return key;
};

export const exportAesKey = async (key) => {
  const exportedKey = await window.crypto.subtle.exportKey("raw", key);
  const exportedKeyArray = new Uint8Array(exportedKey);
  const exportedKeyBase64 = btoa(String.fromCharCode(...exportedKeyArray));
  return exportedKeyBase64;
};
