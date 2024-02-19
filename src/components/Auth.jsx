import { GoogleAuth } from "../services/GoogleAuth";
import { GithubAuth } from "../services/GithubAuth";
import GoogleButton from "react-google-button";
import GithubButton from "react-github-login-button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);
  const handleGoogleClick = async (e) => {
    e.preventDefault();
    try {
      const user = await GoogleAuth();
      if (user) {
        localStorage.setItem("user", user.displayName);
        navigate("/", { state: { username: user.displayName } });
        console.log(user.displayName);
      } else {
        console.log("Error in data");
      }
    } catch (err) {
      console.log("Error", err);
    }
  };

  const handleGithubClick = async (e) => {
    e.preventDefault();
    try {
      const user = await GithubAuth();
      if (user) {
        localStorage.setItem("user", user.displayName);
        navigate("/", { state: { username: user.displayName } });
        console.log(user.displayName);
      } else {
        console.log("Error in data");
      }
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <div className="flex flex-row m-4">
      <GoogleButton onClick={handleGoogleClick} className="mx-2" />
      <GithubButton onClick={handleGithubClick} className="mx-2" />
    </div>
  );
};
