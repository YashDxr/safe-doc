import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Verification() {
  const [clicked, setClicked] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [otpBox, setOtpBox] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [loadingVerification, setLoadingVerification] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!localStorage.getItem("user")) {
  //     navigate("/login");
  //   }
  // }, []);

  const handleverifyUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    const username = localStorage.getItem("user");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/private/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        setTimeout(() => {
          setEmail(data);
          setClicked(true);
          setLoading(false);
        }, 2000);
      } else {
        console.log("Error:", res.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleverifyOtp = async (e) => {
    e.preventDefault();
    setLoadingVerification(true);
    const username = localStorage.getItem("user");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/private/verifyotp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, otp }),
        }
      );
      console.log("RES: ", res);
      if (res.ok) {
        console.log("Success: ", res);
        localStorage.setItem("verified", true);
        setTimeout(() => {
          setLoadingVerification(false);
          navigate("/keystore");
        }, 1500);
      } else {
        console.log("Error: ", res);
        setLoadingVerification(false);
        // console.log("Error:", res.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGenerateOtp = async (e) => {
    e.preventDefault();
    try {
      setLoadingOtp(true);
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/private/reqOtp/${email}`,
        {
          method: "GET",
        }
      );
      if (res.ok) {
        setLoadingOtp(false);
        setMessage("OTP sent successfully. Please check your email.");
        setOtpBox(true);
      } else {
        console.log("Error:", res.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl mb-6 text-center text-gray-800">
          Key Store Verification
        </h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Account Password
            </label>
            <input
              id="password"
              className="mt-1 w-full border-2 border-black rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-3"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          {clicked && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="flex items-center">
                <div className="mr-2 w-2/3">
                  <input
                    id="email"
                    className="mt-1 w-full border-2 border-black rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-3"
                    type="text"
                    value={email}
                    disabled
                  />
                </div>
                <div className="w-1/3">
                  <button
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 my-2"
                    onClick={handleGenerateOtp}
                  >
                    {loadingOtp ? "Generating..." : "Generate OTP"}
                  </button>
                </div>
              </div>
              <p className="text-green-600">{message}</p>
            </div>
          )}

          {otpBox && (
            <input
              id="otp"
              className="mt-1 w-full border-2 border-black rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-3"
              type="text"
              onChange={(e) => setOtp(e.target.value)}
            />
          )}

          {clicked ? (
            <div>
              {loadingVerification ? (
                <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 my-2">
                  Verifying...
                </button>
              ) : (
                <button
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 my-2"
                  onClick={handleverifyOtp}
                >
                  Verify OTP
                </button>
              )}
            </div>
          ) : (
            <div>
              {loading ? (
                <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 my-2">
                  Checking Credentials...
                </button>
              ) : (
                <button
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 my-2"
                  onClick={handleverifyUser}
                >
                  Verify User
                </button>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
