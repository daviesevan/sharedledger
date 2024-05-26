import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonComponent from "./ButtonComponent";
import api from "../Api";
import toast, { Toaster } from "react-hot-toast";

const AuthFormComponent = ({ route, method }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phonenumber, setPhone] = useState("");
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  

  const formData = {
    email,
    password,
    ...(method === "register" && { username, phonenumber }),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post(route, formData);
      if (method === "login") {
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("refresh_token", res.data.refresh_token);
        // toast.success("Login successful!");
        navigate("/dashboard");
        console.log(">>>Redirected")
      } else {
        if (res.data.errors === "Email already exists") {
          toast.error("Email already exists! Try logging in!");
          setTimeout(() => {
            navigate("/login");
          }, 500);
          
        } else if (res.data.errors === "Phone number already exists") {
          toast.error("Phone number already exists. Please use another one!");
        } else {
          toast.success("Account created successfully!");
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        }
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrors(error.response.data.error);
        setTimeout(() => {
          setErrors("");
        }, 3000);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <section className="px-4 pb-24 mx-auto max-w-7xl">
        <header className="flex items-center justify-center py-5 mb-5 border-b border-gray-200">
          <a href="/" title="Go to Home Page">
            <span className="sr-only">Sharedledger</span>
          </a>
        </header>
        <div className="w-full py-6 mx-auto md:w-3/5 lg:w-2/5">
          <h1 className="mb-1 text-xl font-medium text-center text-gray-800 md:text-3xl">
            {method === "register"
              ? "Create your Free Account"
              : "Sign In to Your Account"}
          </h1>
          <p className="mb-2 text-sm font-normal text-center text-gray-700 md:text-base">
            {method === "register" ? (
              <>
                Already have an account?
                <Link
                  to="/login"
                  className="text-blue-700 hover:text-blue-900"
                >
                  {" "}
                  Sign in
                </Link>
              </>
            ) : (
              <>
                Don't have an account?
                <Link
                  to="/signup"
                  className="text-blue-700 hover:text-blue-900"
                >
                  {" "}
                  Sign up
                </Link>
              </>
            )}
          </p>
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            {method === "register" && (
              <>
                <label className="block">
                  <span className="block mb-1 text-xs font-medium text-gray-700">
                    Name
                  </span>
                  <input
                    className="bg-gray-50 border rounded-lg border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    type="text"
                    placeholder="Your full name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </label>
                <label className="block">
                  <span className="block mb-1 text-xs font-medium text-gray-700">
                    Your Phone
                  </span>
                  <input
                    className="bg-gray-50 border rounded-lg border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    type="tel"
                    placeholder="Your phone number"
                    value={phonenumber}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </label>
              </>
            )}
            <label className="block">
              <span className="block mb-1 text-xs font-medium text-gray-700">
                Your Email
              </span>
              <input
                className="bg-gray-50 border rounded-lg border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                type="email"
                placeholder="Ex. james@bond.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                inputMode="email"
                required
              />
            </label>
            <label className="block">
              <span className="block mb-1 text-xs font-medium text-gray-700">
                Create a password
              </span>
              <input
                className="bg-gray-50 border rounded-lg border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            {errors && (
              <p className="my-5 text-xs font-medium text-left text-red-700">
                {errors}
              </p>
            )}
            <ButtonComponent
              onClick={handleSubmit}
              text={method === "register" ? "Sign Up" : "Sign In"}
              loading={loading}
            />
          </form>

          <p className="my-5 text-xs font-medium text-center text-gray-700">
            By clicking "{method === "register" ? "Sign Up" : "Sign In"}" you
            agree to our
            <a href="#" className="text-blue-700 hover:text-blue-900">
              {" "}
              Terms of Service
            </a>{" "}
            and
            <a href="#" className="text-blue-700 hover:text-blue-900">
              {" "}
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
};

export default AuthFormComponent;
