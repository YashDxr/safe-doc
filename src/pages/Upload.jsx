import { useEffect, useRef, useState } from "react";
import InputType from "../components/InputType";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const [document, setDocument] = useState(null);
  const [name, setName] = useState("");
  const [aesKey, setAesKey] = useState("");
  const [encryptedFileLink, setEncryptedFileLink] = useState(null);
  const [decryptedFileLink, setDecryptedFileLink] = useState(null);
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

  const handleClick = async (e) => {
    e.preventDefault();
    if (!document || !name || !aesKey) {
      // alert("Please provide all necessary information.");
      if (!document) console.log("Doc");
      else if (!name) console.log("Name");
      else console.log("Key");
      return;
    }

    console.log("Key : ", aesKey.length);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("aesKey", aesKey);
      formData.append("file", document);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/files/encrypt`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      console.log("File uploaded and encrypted successfully");

      const filename = name;
      const downloadUrl = `${
        import.meta.env.VITE_BACKEND_URL
      }/files/download/${filename}`;

      // Trigger file download
      window.open(downloadUrl); // Open in a new tab for download
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleDownload = async (e) => {
    e.preventDefault();
    if (!name || !aesKey) {
      alert("Please provide all necessary information.");
      return;
    }

    try {
      // Make a POST request to your backend decryptFile endpoint
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/files/decrypt`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, aesKey }),
        }
      );

      // Check if the request was successful
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to decrypt file: ${errorMessage}`);
      }

      // Parse the response body as binary data (PDF file)
      const blob = await response.blob();

      // Create a URL for the blob data
      const fileUrl = URL.createObjectURL(blob);

      // Open the decrypted PDF in a new window/tab for viewing
      window.open(fileUrl, "_blank");
    } catch (error) {
      console.error("Error decrypting and retrieving file:", error);
      alert("Failed to decrypt file. Please try again.");
    }
  };

  return (
    <div className="container mx-auto py-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold m-14">Upload Files</h1>
      <form
        className="w-1/2 bg-white p-6 rounded-lg shadow-md"
        encType="multipart/form-data"
      >
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

        {/* <div className="flex justify-center">
          <button
            onClick={handleClick}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Upload
          </button>
          <button
            onClick={handleDownload}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Download
          </button>
        </div> */}

        <div className="flex justify-center">
          <button
            onClick={handleClick}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Encrypt & Upload
          </button>
          {encryptedFileLink && (
            <a href={encryptedFileLink} download className="ml-4">
              Download Encrypted File
            </a>
          )}
          <button
            onClick={handleDownload}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ml-4"
          >
            Decrypt & Download
          </button>
          {decryptedFileLink && (
            <a href={decryptedFileLink} download className="ml-4">
              Download Decrypted File
            </a>
          )}
        </div>
      </form>
    </div>
  );
}
