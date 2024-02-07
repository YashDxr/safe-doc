import { GoogleAuth } from "../services/GoogleAuth";
// import { MicrosoftAuth } from "../services/MicrosoftAuth";
import { GithubAuth } from "../services/GithubAuth";
import GoogleButton from "react-google-button";
// import SignInButton from "@dougrich/react-signin-microsoft";
import GithubButton from "react-github-login-button";

export const Auth = () => {
  const handleGoogleClick = async (e) => {
    e.preventDefault();
    try {
      const user = await GoogleAuth();
      if (user) {
        console.log(user.displayName);
      } else {
        console.log("Error in data");
      }
    } catch (err) {
      console.log("Error", err);
    }
  };

  // const handleMicrosoftClick = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const user = await MicrosoftAuth();
  //     if (user) {
  //       console.log(user.displayName);
  //     } else {
  //       console.log("Error in data");
  //     }
  //   } catch (err) {
  //     console.log("Error", err);
  //   }
  // };

  const handleGithubClick = async (e) => {
    e.preventDefault();
    try {
      const user = await GithubAuth();
      if (user) {
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
      <GoogleButton onClick={handleGoogleClick} className="mx-2"/>
      {/* <SignInButton onClick={handleMicrosoftClick} /> */}
      <GithubButton onClick={handleGithubClick} className="mx-2"/>
    </div>
  );
};
