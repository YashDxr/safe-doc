import {
  WhatsappShareButton,
  EmailShareButton,
  FacebookShareButton,
} from "react-share";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import MailIcon from "@mui/icons-material/Mail";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

export default function Files() {
  const [files, setFiles] = useState([]);
  const [docFileUrl, setDocFileUrl] = useState("");
  const [copiedItem, setCopiedItem] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
    if (localStorage.getItem("verified")) {
      localStorage.removeItem("verified");
    }
    getFiles();
  }, []);

  const getFiles = async () => {
    const username = localStorage.getItem("user");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/files/getFiles/${username}`,
        {
          method: "GET",
        }
      );
      if (!res.ok) {
        console.log("Data error");
      }
      const data = await res.json();

      console.log("1: ", data);
      console.log("2: ", data.user);
      console.log("3: ", data.user.files);

      setFiles(data.user.files);
    } catch (err) {
      console.log(" Files Error: ", err);
    }
  };

  const viewFiles = async (filename) => {
    const username = localStorage.getItem("user");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/files/getKey`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, filename }),
        }
      );
      if (!res.ok) {
        console.log("Data error");
      }
      const data = await res.json();
      const { key } = data;
      // console.log(key);

      const res2 = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/files/decrypt`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, name: filename, aesKey: key }),
        }
      );

      if (!res2.ok) {
        const errorMessage = await res2.text();
        throw new Error(`Failed to decrypt file: ${errorMessage}`);
      }

      // Parse the response body as binary data (PDF file)
      const blob = await res2.blob();

      // Create a URL for the blob data
      const fileUrl = URL.createObjectURL(blob);
      setDocFileUrl(fileUrl);
    } catch (err) {
      console.log("Error Server");
    }
  };

  const handleClick = (index, url) => {
    setCopiedItem(index);
    navigator.clipboard.writeText(url);
    setTimeout(() => {
      setCopiedItem(null);
    }, 1000);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold m-4">All Files</h1>
      <div className="border border-black rounded-lg shadow-lg p-4 m-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {files.map((file, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-2">{file.filename}</h2>
              <div className="flex justify-between items-center">
                <a
                  onClick={() => viewFiles(file.filename)}
                  className="mt-4 block text-blue-500 hover:underline cursor-pointer"
                >
                  View File
                </a>
                <div className="flex items-center">
                  {copiedItem === index ? (
                    <div>Copied</div>
                  ) : (
                    <div
                      className="mr-4 cursor-pointer"
                      onClick={() => handleClick(index, docFileUrl)}
                    >
                      <ContentCopyIcon />
                    </div>
                  )}

                  <div className="mr-4">
                    <WhatsappShareButton url={docFileUrl}>
                      <WhatsAppIcon />
                    </WhatsappShareButton>
                  </div>
                  <div className="mr-4">
                    <FacebookShareButton url={docFileUrl}>
                      <FacebookIcon />
                    </FacebookShareButton>
                  </div>
                  <div>
                    <EmailShareButton url={docFileUrl}>
                      <MailIcon />
                    </EmailShareButton>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {docFileUrl && (
        <div className="my-8 mx-auto" style={{ width: "100%", maxWidth: "800px" }}>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer
              fileUrl={docFileUrl}
              style={{ border: "1px solid #333", height: "600px" }}
            />
          </Worker>
        </div>
      )}
    </div>
  );
}
