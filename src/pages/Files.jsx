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
export default function Files() {
  const [copiedItem, setCopiedItem] = useState(null);
  const files = [
    { name: "File1", url: "https://google.com" },
    { name: "File2", url: "https://youtube.com" },
    { name: "File3", url: "https://facebook.com" },
    { name: "File4", url: "https://instagram.com" },
    { name: "File5", url: "https://whatsaap.com" },
    { name: "File6", url: "https://google.com" },
    { name: "File7", url: "https://facebook.com" },
    { name: "File8", url: "https://youtube.com" },
    { name: "File9", url: "https://instagram.com" },
  ];

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, []);

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
              <h2 className="text-lg font-semibold mb-2">{file.name}</h2>
              <div className="flex justify-between items-center">
                <a
                  href="#"
                  className="mt-4 block text-blue-500 hover:underline"
                >
                  View File
                </a>
                <div className="flex items-center">
                  {copiedItem === index ? (
                    <div>Copied</div>
                  ) : (
                    <div
                      className="mr-4 cursor-pointer"
                      onClick={() => handleClick(index, file.url)}
                    >
                      <ContentCopyIcon />
                    </div>
                  )}

                  <div className="mr-4">
                    <WhatsappShareButton url={file.url}>
                      <WhatsAppIcon />
                    </WhatsappShareButton>
                  </div>
                  <div className="mr-4">
                    <FacebookShareButton url={file.url}>
                      <FacebookIcon />
                    </FacebookShareButton>
                  </div>
                  <div>
                    <EmailShareButton url={file.url}>
                      <MailIcon />
                    </EmailShareButton>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
