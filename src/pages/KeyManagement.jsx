import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const KeyManagement = () => {
  const navigate = useNavigate();
  const [keysData, setKeysData] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("verified")) {
      navigate("/verification");
    }
    getData();
  }, [navigate]);

  const getData = async () => {
    const user = localStorage.getItem("user");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/store/getFiles/${user}`,
        {
          method: "GET",
        }
      );

      if (!res.ok) {
        console.log("ERROR in saving");
      }

      const data = await res.json();
      console.log("Success: ", data);

      const { filenames } = data;

      const initialKeysData = filenames.map((filename) => ({
        filename,
        key: "",
        copyClicked: false,
      }));

      setKeysData(initialKeysData);
    } catch (error) {
      console.log("ERROR in stores");
    }
  };

  const handleShowKey = async (filename, index) => {
    const username = localStorage.getItem("user");
    const password = "705224@Dit";
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/store/getKey`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
          body: JSON.stringify({ username, filename, password }),
        }
      );

      if (!res.ok) {
        console.log("ERROR in saving");
      }

      const output = await res.json();
      const { key } = output;

      setKeysData((prevKeysData) =>
        prevKeysData.map((item, idx) =>
          idx === index ? { ...item, key } : item
        )
      );

      console.log("Success in key : ", key);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const handleCopy = (key, index) => {
    navigator.clipboard.writeText(key);
    const updatedKeysData = keysData.map((item, idx) => {
      if (idx === index) {
        return { ...item, copyClicked: true };
      }
      return item;
    });
    setKeysData(updatedKeysData);

    setTimeout(() => {
      const resetKeysData = keysData.map((item, idx) => {
        if (idx === index) {
          return { ...item, copyClicked: false };
        }
        return item;
      });
      setKeysData(resetKeysData);
    }, 1000);
  };
  return (
    <div className="flex flex-col items-center py-8">
      <h2 className="text-2xl font-semibold mb-4">Key Management</h2>
      <div className="w-2/3 overflow-x-auto mb-8">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-2 sm:px-4 text-center w-1/4">Filename</th>
              <th className="py-2 px-2 sm:px-4 text-center w-1/4">Key</th>
              <th className="py-2 px-2 sm:px-4 text-center w-1/2">Value</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {keysData.map((item, index) => (
              <tr
                key={index}
                className={
                  (index % 2 === 0 ? "bg-gray-100" : "bg-white") + " border-b"
                }
              >
                <td className="py-3 px-2 sm:px-4 text-center w-1/4">
                  {item.filename}
                </td>
                <td className="py-3 px-2 sm:px-4 text-center w-1/4">
                  <button
                    onClick={() => handleShowKey(item.filename, index)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Show Key
                  </button>
                </td>
                <td className="py-3 px-2 sm:px-4 text-center w-1/2">
                  {item.key && (
                    <div className="flex items-center justify-center">
                      <span>{item.key}</span>
                      <br />
                      {item.copyClicked ? (
                        <strong>Copied...</strong>
                      ) : (
                        <ContentCopyIcon
                          onClick={() => handleCopy(item.key,index)}
                          className="icon cursor-pointer ml-2"
                        />
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Space between table and footer */}
      <div className="mb-16"></div>
    </div>
  );
};

export default KeyManagement;
