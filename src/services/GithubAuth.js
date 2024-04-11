import { GithubAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

export async function GithubAuth() {
  const provider = new GithubAuthProvider();
  const auth = getAuth();
  const userCredentials = await signInWithPopup(auth, provider);
  const user = userCredentials.user;

  // console.log("User: ", user);
  return user;
}
