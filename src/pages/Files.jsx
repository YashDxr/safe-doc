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
import GridLoader from "react-spinners/GridLoader";

export default function Files() {
  const [files, setFiles] = useState([]);
  const [docFileUrl, setDocFileUrl] = useState("");
  const [copiedItem, setCopiedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    setLoading(true);
    setError("");
    const username = localStorage.getItem("user");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/files/getFiles/${username}`,
        {
          method: "GET",
        }
      );
      if (!res.ok) {
        const outputError = await res.json();
        setError(outputError.error);
        return;
      }
      const data = await res.json();

      setTimeout(() => {
        setFiles(data.user.files);
        setLoading(false);
      }, 1500);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  // ${import.meta.env.VITE_BACKEND_URL}/files/decrypt

  const viewFiles = async (filename) => {
    setError("");
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
        const output1Error = await res.json();
        setError(output1Error.error);
        return;
      }
      const data = await res.json();
      const { key } = data;

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
        const output2Error = await res2.json();
        setError(output2Error.error);
        return;
      }

      // Parse the response body as binary data (PDF file)
      const blob = await res2.blob();

      // Create a URL for the blob data
      const fileUrl = URL.createObjectURL(blob);
      setDocFileUrl(fileUrl);
    } catch (err) {
      setError(err);
    }
  };

  const handleClick = (index, user, file) => {
    const url = `${
      import.meta.env.VITE_BACKEND_URL
    }/files/decrypt/${user}/${file}`;
    setCopiedItem(index);
    navigator.clipboard.writeText(url);
    setTimeout(() => {
      setCopiedItem(null);
    }, 1000);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold m-4">All Files</h1>
      {loading ? (
        <div className="flex flex-col justify-center items-center align-middle">
          <h1 className="text-3xl font-bold m-4">Fetching your documents...</h1>
          <GridLoader color="#36d7b7" />
        </div>
      ) : (
        <div className="border border-black rounded-lg shadow-lg p-4 m-4">
          {files.length === 0 ? (
            <div>No Files yet!</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {files.map((file, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold mb-2">
                    {file.filename}
                  </h2>
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
                          onClick={() =>
                            handleClick(
                              index,
                              localStorage.getItem("user"),
                              file.filename
                            )
                          }
                        >
                          <ContentCopyIcon />
                        </div>
                      )}

                      <div className="mr-4">
                        <WhatsappShareButton
                          url={`${
                            import.meta.env.VITE_BACKEND_URL
                          }/files/decrypt/${localStorage.getItem("user")}/${
                            file.filename
                          }`}
                        >
                          <WhatsAppIcon />
                        </WhatsappShareButton>
                      </div>
                      <div className="mr-4">
                        <FacebookShareButton
                          url={`${
                            import.meta.env.VITE_BACKEND_URL
                          }/files/decrypt/${localStorage.getItem("user")}/${
                            file.filename
                          }`}
                        >
                          <FacebookIcon />
                        </FacebookShareButton>
                      </div>
                      <div>
                        <EmailShareButton
                          url={`${
                            import.meta.env.VITE_BACKEND_URL
                          }/files/decrypt/${localStorage.getItem("user")}/${
                            file.filename
                          }`}
                        >
                          <MailIcon />
                        </EmailShareButton>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {error.length > 0 ? (
        <div className="flex justify-center">
          <span className="text-red-500 text-xl">{error}</span>
        </div>
      ) : (
        <span></span>
      )}
      {docFileUrl && (
        <div
          className="my-8 mx-auto"
          style={{ width: "100%", maxWidth: "800px" }}
        >
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
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
