import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Upload from "../pages/Upload";
import Download from "../pages/Download";
import Files from "../pages/Files";
import Login from "../pages/Login";
import Register from "../pages/Register";
import KeyManagement from "../pages/KeyManagement";
import Verification from "../components/Verification";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/download" element={<Download />} />
      <Route path="/files" element={<Files />} />
      <Route path="/keystore" element={<KeyManagement />} />
      <Route path="/verification" element={<Verification />} />
    </Routes>
  );
}
