import { Auth } from "../components/Auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function Register() {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
    // console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const output = await res.json();
      console.log(output);
    } catch (err) {
      console.log("Error", err);
    }
  };
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl mb-6 text-center text-gray-800">Register</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              className="mt-1 w-full border-2 border-black rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-3"
              type="text"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              className="mt-1 w-full border-2 border-black rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-3"
              type="text"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              className="mt-1 w-full border-2 border-black rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-3"
              type="password"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="cpassword"
              className="mt-1 w-full border-2 border-black rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-3"
              type="password"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 my-2"
            >
              Register
            </button>
            <Auth />
          </div>
        </form>
        <a
          className="flex justify-center cursor-pointer hover:underline text-indigo-800 hover:text-black"
          onClick={handleLogin}
        >
          Existing user...?
        </a>
      </div>
    </div>
  );
}
