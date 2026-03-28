import React, { useContext, useState } from "react";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { userDataContext } from "../context/userContext";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

function Signup() {
  let [show, setShow] = useState(false);
  let { serverUrl } = useContext(authDataContext);
  let { setUserData } = useContext(userDataContext);
  let navigate = useNavigate();

  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [userName, setUserName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);
  let [err, setErr] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let result = await axios.post(
        serverUrl + "/api/auth/signup",
        {
          firstName,
          lastName,
          userName,
          email,
          password,
        },
        { withCredentials: true }
      );
      setUserData(result.data);
      navigate("/");
      setErr("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setUserName("");
    } catch (error) {
      setErr(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-200 to-blue-100">
      <div className="w-[90%] max-w-[450px] backdrop-blur-xl bg-white/80 shadow-2xl rounded-2xl p-10 flex flex-col gap-6 border border-white/40">
        <div className="flex justify-center mb-2">
          <img src={logo} alt="Logo" className="h-12" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Create Account 🚀
        </h1>
        <p className="text-gray-600 text-center text-sm">
          Sign up to get started
        </p>

        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSignUp}>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="First Name"
              required
              className="w-1/2 h-[50px] border border-gray-300 text-gray-800 text-[16px] px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              required
              className="w-1/2 h-[50px] border border-gray-300 text-gray-800 text-[16px] px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <input
            type="text"
            placeholder="Username"
            required
            className="w-full h-[50px] border border-gray-300 text-gray-800 text-[16px] px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            required
            className="w-full h-[50px] border border-gray-300 text-gray-800 text-[16px] px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative w-full">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              required
              className="w-full h-[50px] border border-gray-300 text-gray-800 text-[16px] px-4 pr-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute right-4 top-3 text-gray-500 cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            >
              {show ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
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
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-700 mt-2">
          Already have an account?{" "}
          <span
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
