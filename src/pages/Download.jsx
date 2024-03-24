import {useNavigate} from 'react-router-dom';
import {useEffect } from 'react';
export default function Download() {

  
  const navigate = useNavigate();
  useEffect(() => {
    if(!localStorage.getItem("user")){
      navigate("/login");
    }
  },[]);


  return (
    <div className="container mx-auto py-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold m-14">Download File</h1>
      <div className="w-1/2 bg-white p-6 rounded-lg shadow-md">
        <div>
          <label htmlFor="fileLink" className="block text-lg font-medium mb-2">
            Paste a link:
          </label>
          <input
            type="text"
            id="fileLink"
            className="w-full border border-gray-300 p-2 rounded-md mb-4"
            placeholder="https://example.com/file.pdf"
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
          />
        </div>

        <div className="flex justify-center">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
