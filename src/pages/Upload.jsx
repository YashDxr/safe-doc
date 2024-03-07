import { useEffect, useRef, useState } from "react";
import { storage } from "../shared/firebase-config";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import InputType from "../components/InputType";
import { useNavigate } from "react-router-dom";
import { encryptData } from "./../services/Encryption.js";
import CryptoJS from "crypto-js";

export default function Upload() {
  const [uploadMethod, setUploadMethod] = useState("device");
  const [document, setDocument] = useState(null);
  const [name, setName] = useState("");
  const [AesKey, setAesKey] = useState("");
  const [encryptedFile, setEncryptedFile] = useState(null);
  const nameRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (document && AesKey) {
      console.log("Before: ", document);
      console.log(typeof document, "|||", typeof AesKey);
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const encryptedData = CryptoJS.AES.encrypt(data, AesKey).toString();
        const encryptedBlob = new Blob([encryptedData], {
          type: "application/pdf",
        });
        setEncryptedFile(encryptedBlob);
      };
      reader.readAsDataURL(document);
      console.log("After: ", document);
    }
  }, [document, AesKey]);


  useEffect(() => {
    if (encryptedFile) {
      console.log("Encrypted", encryptedFile);
    }
  }, [encryptedFile]);


  useEffect(() => {
    console.log("AESKEY recieved: ", AesKey);
  }, [AesKey]);

  const getKey = (key) => {
    setAesKey(key);
  };

  const handleClick = () => {
    if (document == null || encryptedFile == null) return;
    const docRef = ref(storage, `documents/${name + v4()}`);
    uploadBytes(docRef, document).then(() => {
      alert("Document uploaded successfully!");
    });
  };

  // const allDocumentRef = ref(storage, `documents/`);
  // useEffect(() => {
  //   listAll(allDocumentRef)
  //     .then((docs) => {
  //       const promises = docs.items.map((doc) => getDownloadURL(doc));
  //       return Promise.all(promises);
  //     })
  //     .then((urls) => {
  //       setDocList(urls);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching documents: ", error);
  //     });
  // }, []);

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
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">
            Select upload method:
          </label>
          <div>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="device"
                checked={uploadMethod === "device"}
                onChange={() => setUploadMethod("device")}
                className="form-radio"
              />
              <span className="ml-2">Upload from device</span>
            </label>
            <label className="inline-flex items-center ml-4">
              <input
                type="radio"
                value="link"
                checked={uploadMethod === "link"}
                onChange={() => setUploadMethod("link")}
                className="form-radio"
              />
              <span className="ml-2">Paste link</span>
            </label>
          </div>
        </div>

        {uploadMethod === "device" && (
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
                accept="images/* , .pdf"
                className="w-full border border-gray-300 p-2 rounded-md mb-4"
                disabled={uploadMethod !== "device"}
              />
            </div>
            <div className="text-slate-200 cursor-not-allowed">
              <label
                htmlFor="fileLink"
                className="block text-lg font-medium mb-2 cursor-not-allowed"
              >
                Paste a link:
              </label>
              <input
                type="text"
                id="fileLink"
                className="w-full border border-gray-300 p-2 rounded-md mb-4 cursor-not-allowed"
                placeholder="https://example.com/file.pdf"
                disabled={uploadMethod !== "link"}
              />
            </div>
          </>
        )}

        {uploadMethod === "link" && (
          <>
            <div className="text-slate-200 cursor-not-allowed">
              <label
                htmlFor="fileInput"
                className="block text-lg font-medium mb-2 cursor-not-allowed"
              >
                Upload from your device:
              </label>
              <input
                type="file"
                id="fileInput"
                className="w-full border border-gray-300 p-2 rounded-md mb-4 cursor-not-allowed"
                disabled={uploadMethod !== "device"}
              />
            </div>
            <div>
              <label
                htmlFor="fileLink"
                className="block text-lg font-medium mb-2"
              >
                Paste a link:
              </label>
              <input
                type="text"
                id="fileLink"
                className="w-full border border-gray-300 p-2 rounded-md mb-4"
                placeholder="https://example.com/file.pdf"
                disabled={uploadMethod !== "link"}
              />
            </div>
          </>
        )}
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
        {/* {docList.map((url, index) => (
          <iframe key={index} src={url}></iframe>
        ))} */}
      </div>
      {encryptedFile && <div>
        <p>Encrypted File:</p>
        <a
          href={URL.createObjectURL(encryptedFile)}
          download={`${name}.pdf`}
        >
          Download Encrypted File
        </a>
      </div>}
    </div>
  );
}
