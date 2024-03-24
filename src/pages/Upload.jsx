import { useEffect, useRef, useState } from "react";
import InputType from "../components/InputType";
import { useNavigate } from "react-router-dom";
import encryptAndDecryptFile from "../services/Encryption";

export default function Upload() {
  const [document, setDocument] = useState(null);
  const [name, setName] = useState("");
  const [aesKey, setAesKey] = useState("");
  const [encryptedUrl, setEncryptedUrl] = useState("");
  const [decryptedUrl, setDecryptedUrl] = useState("");
  const nameRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, []);

  const getKey = (key) => {
    setAesKey(key);
  };

  const handleClick = async () => {
    if (!document || !name || !aesKey) {
      alert("Please provide all necessary information.");
      return;
    }

    try {
      const { encryptedUrl, decryptedUrl } = await encryptAndDecryptFile(
        document,
        aesKey
      );
      setEncryptedUrl(encryptedUrl);
      setDecryptedUrl(decryptedUrl);
    } catch (error) {
      console.error("Error encrypting and decrypting file:", error);
    }
  };

  return (
    <div className="container mx-auto py-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold m-14">Upload Files</h1>
      <div className="w-1/2 bg-white p-6 rounded-lg shadow-md">
        <label className="">Name of the document:&nbsp;</label>
        <input
          type="text"
          id="fileName"
          className="w-2/3 border border-gray-300 p-2 rounded-md mb-4"
          placeholder="File name..."
          ref={nameRef}
          onChange={() => {
            setName(nameRef.current.value);
          }}
        />

        <>
          <div>
            <label
              htmlFor="fileInput"
              className="block text-lg font-medium mb-2"
            >
              Upload from your device:
            </label>
            <input
              onChange={(e) => {
                setDocument(e.target.files[0]);
              }}
              type="file"
              id="fileInput"
              accept=".pdf"
              className="w-full border border-gray-300 p-2 rounded-md mb-4"
            />
          </div>
        </>

        <div className="relative">
          <label className="block text-lg font-medium mb-2">
            Create a Key:
          </label>
          <div>
            <InputType sendKey={getKey} />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleClick}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Upload
          </button>
        </div>

        {encryptedUrl && decryptedUrl && (
          <div className="flex justify-center mt-4">
            <a
              href={encryptedUrl}
              download={`${name}_encrypted.pdf`}
              className="text-blue-500 underline mr-4"
            >
              Download Encrypted File
            </a>
            <a
              href={decryptedUrl}
              download={`${name}_decrypted.pdf`}
              className="text-blue-500 underline"
            >
              Download Decrypted File
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
