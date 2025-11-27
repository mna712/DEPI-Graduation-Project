
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const baseURL = process.env.REACT_APP_API_URL || "http://localhost:3000";
        const { data } = await axios.post(`${baseURL}/api/user/login`, values);
        console.log("Login successful:", data);

        
        const token = data?.data?.token || data?.token;
        if (token) {
          login(token);
        }

        alert("Login successful! Redirecting to home...");
        navigate("/");
      } catch (err) {
        console.error("Login error:", err);

        
        if (
          err.code === "ERR_NETWORK" ||
          err.message?.includes("Network Error") ||
          err.message?.includes("CONNECTION_REFUSED")
        ) {
          const baseURL = process.env.REACT_APP_API_URL || "http://localhost:3000";
          alert(
            "⚠️ Cannot connect to server!\n\nPlease make sure the backend server is running on " +
              baseURL +
              "\n\nError: " +
              err.message
          );
        }
        
        else if (err.response) {
          const errorMessage =
            err.response.data?.message || err.response.data?.error || "Login failed";
          alert(`❌ ${errorMessage}\n\nStatus: ${err.response.status}`);
        }
        
        else {
          alert("❌ An error occurred. Please try again.\n\nError: " + (err.message || "Unknown error"));
        }
      }
    },
  });

  return (
    <div className="bg-app-background overflow-hidden w-full h-screen flex flex-col relative">
      <main className="flex-1 flex items-center justify-center w-full h-full overflow-y-auto py-4 pb-12 mb-8">
        <div className="w-[90%] h-[85%] max-w-[1400px] flex flex-col lg:flex-row items-center justify-center ml-auto mr-6 mt-2 gap-6 lg:gap-8">
          {/* Mobile Banner - Shown only on small screens */}
          <div className="flex lg:hidden flex-col items-center gap-3 mb-2">
            <h2 className="text-black text-[20px] sm:text-[22px] font-roboto-serif text-center">
              <span className="font-medium">Welcome To </span>
              <span className="font-bold">ReOwn</span>
            </h2>
            <img
              className="w-[140px] h-[140px] object-contain"
              alt="Illustration"
              src="https://c.animaapp.com/mi64iwj2VieceI/img/eee279c7d9b4c4e5fc060a9f9bb61c5f-removebg-preview-1.png"
            />
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="w-full lg:w-1/2 bg-white rounded-[20px] shadow-lg animate-fade-in h-full lg:h-auto flex items-center justify-center"
          >
            <div className="w-full p-6 md:p-8 lg:p-10">
              <div className="flex flex-col items-center gap-5">
                <h1 className="w-full text-dark-green text-[26px] md:text-[30px] lg:text-[32px] font-semibold mb-1 text-center lg:text-left">
                  Log In
                </h1>

                <div className="w-full flex flex-col gap-5">
                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="font-semibold text-[#141111b0] text-sm md:text-base">
                      Email
                    </label>
                    <div className={`flex items-center bg-white rounded-[12px] px-4 gap-3 border h-[48px] md:h-[52px] transition-all ${
                      formik.touched.email && formik.errors.email
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus-within:ring-2 focus-within:ring-[#047857cf] focus-within:border-transparent`}>
                      <img
                        className="w-[20px] md:w-[22px] h-5 md:h-6"
                        alt="Mail"
                        src="https://c.animaapp.com/mi64iwj2VieceI/img/vuesax-outline-sms.png"
                      />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="example@email.com"
                        className="border-none outline-none flex-1 text-sm md:text-base"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    {formik.touched.email && formik.errors.email && (
                      <span className="text-xs text-red-500 mt-0.5">
                        {formik.errors.email}
                      </span>
                    )}
                  </div>

                  {/* Password */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="password" className="font-semibold text-[#141111b0] text-sm md:text-base">
                      Password
                    </label>
                    <div className={`flex items-center justify-between bg-white rounded-[12px] px-4 border h-[48px] md:h-[52px] transition-all ${
                      formik.touched.password && formik.errors.password
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus-within:ring-2 focus-within:ring-[#047857cf] focus-within:border-transparent`}>
                      <div className="flex items-center gap-2 flex-1">
                        <img
                          className="w-5 h-5 md:w-6 md:h-6"
                          alt="Lock"
                          src="https://c.animaapp.com/mi64iwj2VieceI/img/vuesax-linear-lock.svg"
                        />
                        <input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          placeholder="Password"
                          className="border-none outline-none flex-1 text-sm md:text-base"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                      <span className="text-xs text-red-500 mt-0.5">
                        {formik.errors.password}
                      </span>
                    )}
                  </div>

                  {/* Button */}
                  <div className="flex flex-col items-center gap-4 mt-3">
                    <button
                      type="submit"
                      className="w-full h-[50px] md:h-[54px] bg-[#047857cf] hover:bg-[#047857] rounded-[12px] text-white text-base md:text-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                    >
                      Log In
                    </button>

                    <div className="text-sm md:text-base text-center">
                      <span className="font-semibold text-[#141111b0]">
                        Don't have an account?
                      </span>
                      <span 
                        className="font-bold text-[#047857cf] cursor-pointer hover:underline"
                        onClick={() => navigate('/signup')}
                      >
                        {" "}Sign Up
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* Right Side Banner */}
          <div className="hidden lg:flex flex-col items-center justify-center gap-6 animate-fade-in w-1/2 h-full px-8">
            <h2 className="text-black text-[30px] md:text-[34px] lg:text-[38px] font-roboto-serif text-center">
              <span className="font-medium">Welcome To </span>
              <span className="font-bold text-[#047857cf]">ReOwn</span>
            </h2>

            <img
              className="w-full max-w-[450px] h-auto object-contain"
              alt="Illustration"
              src="https://c.animaapp.com/mi64iwj2VieceI/img/eee279c7d9b4c4e5fc060a9f9bb61c5f-removebg-preview-1.png"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
