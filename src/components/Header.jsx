import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const handleNavigation = (route) => {
    navigate(route);
    setMenuOpen(false); // Close the menu after navigation
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div
            onClick={() => {
              navigate("/");
            }}
            className="flex flex-row items-center cursor-pointer"
          >
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
          <Box sx={{ flexGrow: 1 }} />
          <div className="md:flex md:items-center md:justify-end">
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
            {loggedIn ? (
              <>
                <Button
                  onClick={handleLogout}
                  sx={{
                    my: 1,
                    color: "white",
                    display: { xs: "none", md: "block" },
                  }}
                >
                  Log out
                </Button>
              </>
            ) : (
              <Button
                onClick={() => handleNavigation("/login")}
                sx={{
                  my: 1,
                  color: "white",
                  display: { xs: "none", md: "block" },
                }}
              >
                Log in
              </Button>
            )}
            <IconButton sx={{ p: 0 }}>
              <Avatar src="https://t4.ftcdn.net/jpg/02/52/93/81/360_F_252938192_JQQL8VoqyQVwVB98oRnZl83epseTVaHe.jpg" />
            </IconButton>
          </div>
        </Toolbar>
      </Container>
      {/* Drawer for mobile menu */}
      <Drawer anchor="left" open={menuOpen} onClose={handleMenuOpen}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleMenuOpen}
          onKeyDown={handleMenuOpen}
        >
          <List>
            <ListItem button onClick={() => handleNavigation("/files")}>
              <ListItemText primary="My Files" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation("/upload")}>
              <ListItemText primary="Upload" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation("/download")}>
              <ListItemText primary="Download" />
            </ListItem>
            {loggedIn ? (
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Log out" />
              </ListItem>
            ) : (
              <ListItem button onClick={() => handleNavigation("/login")}>
                <ListItemText primary="Log in/Sign up" />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
