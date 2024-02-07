import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <div
            onClick={() => {
              navigate("/");
              setValue("");
            }}
            className="flex flex-row items-center cursor-pointer"
          >
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
              }}
            >
              Safe-Doc
            </Typography>
          </div>
          <Box sx={{ flexGrow: 1, display: { md: "flex" } }}>
            <Button
              onClick={() => {
                navigate("/files");
                setValue("Log in");
              }}
              sx={{ my: 2, color: "white", display: "inline-block" }}
            >
              My files
            </Button>
            <Button
              onClick={() => {
                navigate("/upload");
                setValue("Log in");
              }}
              sx={{ my: 2, color: "white", display: "inline-block" }}
            >
              Upload
            </Button>
            <Button
              onClick={() => {
                navigate("/download");
                setValue("Log in");
              }}
              sx={{ my: 2, color: "white", display: "inline-block" }}
            >
              Download
            </Button>
          </Box>

          <div>
            {value == "" ? (
              <Button sx={{ my: 2, color: "white", display: "inline-block" }}>
                Log in/Sign up
              </Button>
            ) : (
              <Button
                onClick={() => {
                  navigate("/login");
                }}
                sx={{ my: 2, color: "white", display: "inline-block" }}
              >
                Log in
              </Button>
            )}
          </div>
          <IconButton sx={{ p: 0 }}>
            <Avatar src="https://t4.ftcdn.net/jpg/02/52/93/81/360_F_252938192_JQQL8VoqyQVwVB98oRnZl83epseTVaHe.jpg" />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
