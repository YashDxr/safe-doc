import { Auth } from "../components/Auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import BarLoader from "react-spinners/BarLoader";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        const errorOutput = await res.json();
        setError(errorOutput.error);
        setLoading(false);
        return;
      }
      setTimeout(() => {
        setLoading(false);
        alert("Registration Successful. Please log in to continue...");
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const validatePassword = (value) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/;
    return passwordRegex.test(value);
  };

  const validateConfirmPassword = (value) => {
    const password = getValues("password");
    return value === password;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl mb-6 text-center text-gray-800">Register</h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              className="mt-1 w-full border-2 border-black rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-3"
              type="text"
              {...register("username", { required: true, minLength: 4 })}
            />
            {errors.username && errors.username.type === "required" && (
              <span className="text-red-500">Username is required</span>
            )}
            {errors.username && errors.username.type === "minLength" && (
              <span className="text-red-500">
                Username must be at least 4 characters long
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              className="mt-1 w-full border-2 border-black rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-3"
              type="text"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500">Email is required</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              className="mt-1 w-full border-2 border-black rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-3"
              type="password"
              {...register("password", {
                required: true,
                validate: (value) => validatePassword(value),
              })}
            />
            {errors.password && errors.password.type === "required" && (
              <span className="text-red-500">Password is required</span>
            )}
            {errors.password && errors.password.type === "validate" && (
              <ul className="text-red-500">
                Password must contain &nbsp;&nbsp;
                <li>- at least 1 uppercase letter</li>
                <li>- at least 1 lowercase letter</li>
                <li>- at least 1 number</li>
                <li>- at least 1 special character</li>
                <li>Password must be at least 4 characters long</li>
              </ul>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="cpassword"
              className="mt-1 w-full border-2 border-black rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-3"
              type="password"
              {...register("confirmPassword", {
                required: true,
                validate: (value) => validateConfirmPassword(value),
              })}
            />
            {errors.confirmPassword &&
              errors.confirmPassword.type === "required" && (
                <span className="text-red-500">
                  Confirm Password is required
                </span>
              )}
            {errors.confirmPassword &&
              errors.confirmPassword.type === "validate" && (
                <span className="text-red-500">
                  Password and Confirm Password should be same
                </span>
              )}
          </div>
          {loading ? (
            <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 my-2">
              <BarLoader color="#36d7b7" />
            </button>
          ) : (
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 my-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Register"}
              </button>
              <Auth />
            </div>
          )}
          {error.length > 0 ? (
            <div className="flex justify-center">
              <span className="text-red-500 text-xl">{error}</span>
            </div>
          ) : (
            <span></span>
          )}
        </form>
        <div className="flex justify-center">
          <p className="mx-2">Existing user?</p>
          <a
            className="cursor-pointer hover:underline text-indigo-800 hover:text-black"
            onClick={handleLogin}
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
