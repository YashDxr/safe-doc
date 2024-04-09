import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Download() {
  const [name, setName] = useState("");
  const [aesKey, setAesKey] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
    if (localStorage.getItem("verified")) {
      localStorage.removeItem("verified");
    }
  }, []);

  const handleDownload = async () => {
    console.log("Started...");
    if (!name || !aesKey) {
      alert("Please provide all necessary information.");
      return;
    }
    const username = localStorage.getItem("user");
    try {
      // Make a POST request to your backend decryptFile endpoint
      console.log("Fetch...");
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/files/decrypt`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, name, aesKey }),
        }
      );
      console.log("Response...");
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to decrypt file: ${errorMessage}`);
      }

      const blob = await response.blob();

      const fileUrl = URL.createObjectURL(blob);
      console.log("URL...", fileUrl);
      window.open(fileUrl, "_blank");
    } catch (error) {
      console.error("Error decrypting and retrieving file:", error);
      alert("Failed to decrypt file. Please try again.");
    }
  };

  return (
    <div className="container mx-auto py-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold m-14">Download File</h1>
      <div className="w-1/2 bg-white p-6 rounded-lg shadow-md">
        <div>
          <label htmlFor="fileLink" className="block text-lg font-medium mb-2">
            Paste a link: || Filename
          </label>
          <input
            type="text"
            id="file"
            className="w-full border border-gray-300 p-2 rounded-md mb-4"
            onChange={(e) => {
              setName(e.target.value);
              console.log(e.target.value);
            }}
            // placeholder="https://example.com/file.pdf"
          />
        </div>

        <div>
          <label htmlFor="fileLink" className="block text-lg font-medium mb-2">
            Enter Key:
          </label>
          <input
            type="text"
            id="key"
            className="w-full border border-gray-300 p-2 rounded-md mb-4"
            placeholder="Key..."
            onChange={(e) => {
              setAesKey(e.target.value);
              console.log(e.target.value);
            }}
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleDownload}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ml-4"
          >
            Decrypt & Download
          </button>
        </div>
      </div>
    </div>
  );
}
