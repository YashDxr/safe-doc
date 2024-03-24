import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";

const DecryptFile = ({ encryptedFile, AesKey }) => {
  const [decryptedFile, setDecryptedFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (encryptedFile && AesKey) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const encryptedData = e.target.result;
        const decryptedData = CryptoJS.AES.decrypt(
          encryptedData,
          AesKey
        ).toString(CryptoJS.enc.Utf8);
        const decryptedBlob = new Blob([decryptedData], {
          type: "application/pdf",
        });
        setDecryptedFile(decryptedBlob);
      };
      reader.readAsText(encryptedFile);
    }
  }, [encryptedFile, AesKey]);
  useEffect(() => {
    if (decryptedFile) {
      setLoading(!loading);
    }
  }, [decryptedFile]);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {decryptedFile && (
        <div>
          <p>Decrypted File:</p>
          <a
            href={URL.createObjectURL(decryptedFile)}
            download={`decrypted_${encryptedFile.name}`}
          >
            Download Decrypted File
          </a>
        </div>
      )}
    </div>
  );
};

export default DecryptFile;
