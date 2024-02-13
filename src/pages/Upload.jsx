import { useState } from "react";

export default function Upload() {
  const [uploadMethod, setUploadMethod] = useState("device");

  return (
    <div className="container mx-auto py-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold m-14">Upload Files</h1>
      <div className="w-1/2 bg-white p-6 rounded-lg shadow-md">
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
                type="file"
                id="fileInput"
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
        <div className="flex justify-center">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
