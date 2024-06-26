import { useEffect, useRef, useState } from "react";
import InputType from "../components/InputType";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [aesKey, setAesKey] = useState("");
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
    if (localStorage.getItem("verified")) {
      localStorage.removeItem("verified");
    }
  }, []);

  const getKey = (key) => {
    setAesKey(key);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!document || !name || aesKey.length < 32) {
      alert("Please provide all necessary information.");
      setLoading(false);
      return;
    }

    const user = localStorage.getItem("user");
    try {
      const formData = new FormData();
      formData.append("username", user);
      formData.append("filename", name);
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
        const error1Output = await response.json();
        setError(error1Output.error);
        setLoading(false);
        return;
      }

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/store/save`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
          body: JSON.stringify({ username: user, filename: name, aesKey }),
        }
      );

      if (!res.ok) {
        const error2Output = await res.json();
        setError(error2Output.error);
        setLoading(false);
        return;
      }

      setLoading(false);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error:", error.message);
      setLoading(false);
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

        {error.length > 0 ? (
          <div className="flex justify-center">
            <span className="text-red-500 text-xl">{error}</span>
          </div>
        ) : (
          <span></span>
        )}

        {loading ? (
          <div className="flex justify-center">
            <button className="bg-blue-500  text-white py-4 px-8 rounded-md hover:bg-blue-600 transition duration-300">
              Loading...
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={handleClick}
              className="bg-blue-500  text-white py-4 px-8 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Encrypt & Upload
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
