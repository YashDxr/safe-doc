import { OAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

export async function MicrosoftAuth() {
  const provider = new OAuthProvider('microsoft.com');
  const auth = getAuth();
  const userCredentials = await signInWithPopup(auth, provider);
  const user = userCredentials.user;

  console.log("User: ", user);
  return user;
}
