import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

export default function Header() {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };
  const loggedInUser = localStorage.getItem("user");
  useEffect(() => {
    updateUserState();
  }, [loggedInUser]);

  const updateUserState = () => {
    const loggedIn = localStorage.getItem("user");
    setUser(loggedIn || "");
  };

  const handleLogout = async () => {
    setLoading(true);
    localStorage.removeItem("user");
    updateUserState();
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 3000);
  };

  return (
    <AppBar position="static">
      {loading ? (
        <div className="flex flex-col items-center justify-center align-middle">
          <h1>Logging Out...</h1>
          <PacmanLoader color="#36d7b7" />
        </div>
      ) : (
        <Container maxWidth="xl">
          <Toolbar>
            <div
              onClick={() => {
                navigate("/");
              }}
              className="flex flex-row items-center cursor-pointer"
            >
              Safe-Doc
            </div>
            <Box sx={{ flexGrow: 1 }} />
            <div className="md:flex md:items-center md:justify-end">
              <>
                {/* <Button
                onClick={() => handleNavigation("/decrypt")}
                sx={{
                  my: 1,
                  color: "white",
                  display: { xs: "none", md: "block" },
                }}
              >
                Decrypt
              </Button> */}
                <Button
                  onClick={() => handleNavigation("/keystore")}
                  sx={{
                    my: 1,
                    color: "white",
                    display: { xs: "none", md: "block" },
                  }}
                >
                  Key Management
                </Button>
                <Button
                  onClick={() => handleNavigation("/files")}
                  sx={{
                    my: 1,
                    color: "white",
                    display: { xs: "none", md: "block" },
                  }}
                >
                  My Files
                </Button>
                <Button
                  onClick={() => handleNavigation("/upload")}
                  sx={{
                    my: 1,
                    color: "white",
                    display: { xs: "none", md: "block" },
                  }}
                >
                  Upload
                </Button>
                <Button
                  onClick={() => handleNavigation("/download")}
                  sx={{
                    my: 1,
                    color: "white",
                    display: { xs: "none", md: "block" },
                  }}
                >
                  Download
                </Button>
                <Button
                  onClick={handleLogout}
                  sx={{
                    my: 1,
                    color: "white",
                    display: { xs: "none", md: "block" },
                  }}
                >
                  {user.length > 0 ? "Logout" : "Login"}
                </Button>
              </>
            </div>
          </Toolbar>
        </Container>
      )}
    </AppBar>
  );
}
