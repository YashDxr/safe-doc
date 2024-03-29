import { useForm } from "react-hook-form";
import { Auth } from "../components/Auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  const onSubmit = async (formData) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const output = await res.json();
      console.log(output);
      console.log(output.user.username);
      if (res.ok) {
        localStorage.setItem("user", output.user.username);
        navigate("/");
      } else {
        setError(output.error);
      }
    } catch (err) {
      console.error("Error", err);
      setError("An unexpected error occurred.");
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl mb-6 text-center text-gray-800">Login</h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              {...register("email")}
              className="mt-1 w-full border-2 border-black rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-3"
              type="text"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              {...register("password")}
              className="mt-1 w-full border-2 border-black rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-3"
              type="password"
            />
          </div>
          <div>{error && <p className="text-red-500">{error}</p>}</div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 my-2"
            >
              Login
            </button>
            <Auth />
          </div>
        </form>
        <a
          className="flex justify-center cursor-pointer hover:underline text-indigo-800 hover:text-black"
          onClick={handleRegister}
        >
          New user...?
        </a>
      </div>
    </div>
  );
}
