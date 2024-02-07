import { Auth } from "../components/Auth";

export default function Login() {
  const handleSubmit = () => {
    console.log("Submitted");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl mb-6 text-center text-gray-800">Login</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email/Username
            </label>
            <input
              id="email"
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
              className="mt-1 w-full border-2 border-black rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-3"
              type="password"
            />
          </div>
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
      </div>
    </div>
  );
}
