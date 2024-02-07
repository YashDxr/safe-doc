import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

export async function GoogleAuth() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const userCredentials = await signInWithPopup(auth, provider);
  const user = userCredentials.user;

  console.log("User: ", user);
  return user;
}
