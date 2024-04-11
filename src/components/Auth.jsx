import { GoogleAuth } from "../services/GoogleAuth";
import { GithubAuth } from "../services/GithubAuth";
import GoogleButton from "react-google-button";
import GithubButton from "react-github-login-button";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const navigate = useNavigate();

  const handleGoogleClick = async (e) => {
    e.preventDefault();
    try {
      const user = await GoogleAuth();
      console.log("Auth: ", user);

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/google`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: user.displayName, email: user.email }),
        }
      );
      const data = await res.json();
      console.log("data: ", data);
      if (data) {
        localStorage.setItem("user", data.username);
        navigate("/", { state: { username: data.username } });
        console.log(data.username);
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
