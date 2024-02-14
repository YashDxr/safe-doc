import { useState, useRef } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { generateAesKey } from "../services/GenerateKey";

export default function InputType() {
  const [visible, setVisible] = useState(false);
  const [inputType, setInputType] = useState("password");

  const keyRef = useRef();

  const handleVisible = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
    setVisible(!visible);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(keyRef.current.value);
  };

  const handleKeyGeneration = () => {
    const key = generateAesKey();
    keyRef.current.value = key;
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center w-full">
        <input
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