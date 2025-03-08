import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const [state, setState] = useState("Sign up");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Debugging: Check backend URL
  useEffect(() => {
    console.log("Backend URL in Login:", backendUrl);
  }, [backendUrl]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!backendUrl) {
      toast.error("Backend URL is not defined. Check .env file.");
      return;
    }

    try {
      const endpoint =
        state === "Sign up" ? `${backendUrl}/api/user/register` : `${backendUrl}/api/user/login`;
      const payload = state === "Sign up" ? { name, email, password } : { email, password };

      console.log("Submitting to:", endpoint, "Payload:", payload);

      const { data } = await axios.post(endpoint, payload);

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success(`${state} successful!`);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r">
      <form
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md"
        onSubmit={onSubmitHandler}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {state === "Sign up" ? "Create Account" : "Welcome Back"}
        </h2>
        <p className="text-gray-600 text-center mb-8">
          {state === "Sign up"
            ? "Sign up to book appointments effortlessly."
            : "Log in to manage your appointments."}
        </p>

        {state === "Sign up" && (
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              type="text"
              id="name"
              placeholder="Enter your full name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            type="email"
            id="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            type="password"
            id="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300"
        >
          {state === "Sign up" ? "Create Account" : "Login"}
        </button>

        <p className="text-center text-gray-600 mt-6">
          {state === "Sign up" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-primary cursor-pointer hover:underline"
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <span
                onClick={() => setState("Sign up")}
                className="text-primary cursor-pointer hover:underline"
              >
                Create one
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;