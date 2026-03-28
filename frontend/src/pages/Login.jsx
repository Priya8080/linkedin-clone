import React, { useContext, useState } from "react";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { userDataContext } from "../context/userContext";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  let [show, setShow] = useState(false);
  let { serverUrl } = useContext(authDataContext);
  let { setUserData } = useContext(userDataContext);
  let navigate = useNavigate();

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);
  let [err, setErr] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let result = await axios.post(
        serverUrl + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      setUserData(result.data);
      navigate("/");
      setErr("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setErr(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-200 to-blue-100">
      
      <div className="w-[90%] max-w-[420px] backdrop-blur-xl bg-white/80 shadow-2xl rounded-2xl p-10 flex flex-col gap-6 border border-white/40">
       
        <div className="flex justify-center mb-2">
          <img src={logo} alt="Logo" className="h-12" />
        </div>

        
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Welcome Back 👋
        </h1>
        <p className="text-gray-600 text-center text-sm">
          Sign in to continue to your dashboard
        </p>

       
        <form className="flex flex-col gap-5 mt-4" onSubmit={handleSignIn}>
          
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="w-full h-[50px] border border-gray-300 text-gray-800 text-[16px] px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

         
          <div className="relative w-full">
            <input
              type={show ? "text" : "password"}
              placeholder="Enter your password"
              required
              className="w-full h-[50px] border border-gray-300 text-gray-800 text-[16px] px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition pr-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute right-4 top-3 text-gray-500 cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            >
              {show ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

       
          {err && (
            <p className="text-center text-red-500 text-sm font-medium">
              *{err}
            </p>
          )}

        
          <button
            className="w-full h-[50px] rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg shadow-md hover:shadow-lg transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

       
        <p className="text-center text-sm text-gray-700 mt-2">
          Don’t have an account?{" "}
          <span
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
