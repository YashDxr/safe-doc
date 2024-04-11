import { useState, useRef, useEffect } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { generateAesKey, exportAesKey } from "../services/GenerateKey";

export default function InputType({ sendKey }) {
  const [visible, setVisible] = useState(false);
  const [inputType, setInputType] = useState("password");
  const [key, setKey] = useState("");

  const keyRef = useRef();

  const handleVisible = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
    setVisible(!visible);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(keyRef.current.value);
  };

  useEffect(() => {
    if (key.length > 0) {
      sendKey(key);
    }
  }, [key]);

  const handleKeyGeneration = async () => {
    const AESkey = await generateAesKey();
    const exportedKey = await exportAesKey(AESkey);
    keyRef.current.value = exportedKey;
    setKey(exportedKey);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center w-full">
        <input
          onChange={(e) => setKey(keyRef.current.value)}
          ref={keyRef}
          type={inputType}
          id="filePassword"
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex m-2">
          {visible ? (
            <VisibilityIcon
              className="icon cursor-pointer"
              onClick={handleVisible}
            />
          ) : (
            <VisibilityOffIcon
              className="icon cursor-pointer"
              onClick={handleVisible}
            />
          )}
          <ContentCopyIcon
            onClick={handleCopy}
            className="icon cursor-pointer ml-2"
          />
        </div>
      </div>
      <button
        onClick={handleKeyGeneration}
        type="button"
        className="my-1 w-1/3 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Generate Key
      </button>
    </div>
  );
}
