import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Download() {
  const [url, setUrl] = useState("");
  const [aesKey, setAesKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    if (!url || !aesKey) {
      alert("Please provide all necessary information.");
      return;
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ aesKey }),
      });
      if (!response.ok) {
        const errorOutput = await response.json();
        setLoading(false);
        setError(errorOutput.error);
        // const errorMessage = await response.text();
        // throw new Error(`Failed to decrypt file: ${errorMessage}`);
        return;
      }

      const blob = await response.blob();

      const fileUrl = URL.createObjectURL(blob);
      setLoading(false);
      window.open(fileUrl, "_blank");
    } catch (error) {
      setLoading(false);
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
            File URL
          </label>
          <input
            type="text"
            id="file"
            className="w-full border border-gray-300 p-2 rounded-md mb-4"
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            placeholder="https://example.com/xyz/abc"
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
            }}
          />
        </div>
        {loading ? (
          <div className="flex justify-center">
            <button className="bg-blue-500  text-white py-4 px-8 rounded-md hover:bg-blue-600 transition duration-300">
              Loading...
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={handleDownload}
              className="bg-blue-500 text-white py-4 px-8 rounded-md hover:bg-blue-600 transition duration-300 ml-4"
            >
              Decrypt & Download
            </button>
          </div>
        )}
        {error.length > 0 ? (
          <div className="flex justify-center">
            <span className="text-red-500 text-xl">{error}</span>
          </div>
        ) : (
          <span></span>
        )}
      </div>
    </div>
  );
}
