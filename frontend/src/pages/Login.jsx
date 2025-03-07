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
    <form className="min-h-[80vh] flex items-center" onSubmit={onSubmitHandler}>
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">{state === "Sign up" ? "Create Account" : "Login"}</p>
        <p>Please {state === "Sign up" ? "sign up" : "log in"} to book an appointment</p>

        {state === "Sign up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <button type="submit" className="bg-primary text-white w-full py-2 rounded-md text-base">
          {state === "Sign up" ? "Create Account" : "Login"}
        </button>

        {state === "Sign up" ? (
          <p>
            Already have an account?{" "}
            <span onClick={() => setState("Login")} className="text-primary underline cursor-pointer">
              Login here
            </span>
          </p>
        ) : (
          <p>
            Don't have an account?{" "}
            <span onClick={() => setState("Sign up")} className="text-primary underline cursor-pointer">
              Create one
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;