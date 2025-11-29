import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const phoneReg = /^[0-9]{10,15}$/;

const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .required("Last name is required"),
  phone: Yup.string()
    .nullable()
    .test("phone", "Phone must be 10–15 digits", (value) => {
      if (!value) return true; 
      return phoneReg.test(value);
    }),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export default function SignUp() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        
        const { confirmPassword, ...signupData } = values;

      
        const baseURL = process.env.REACT_APP_API_URL || "http://localhost:3000";
        const { data } = await axios.post(`${baseURL}/api/user/signup`, signupData);

        console.log("Signup successful:", data);
        alert("Signup successful! Redirecting to login...");
        navigate("/login");
      } catch (err) {
        console.error("Signup error:", err);

        
        if (
          err.code === "ERR_NETWORK" ||
          err.message?.includes("Network Error") ||
          err.message?.includes("CONNECTION_REFUSED")
        ) {
          alert(
            "⚠️ Cannot connect to server!\n\nPlease make sure the backend server is running on " +
              (process.env.REACT_APP_API_URL || "http://localhost:3000") +
              "\n\nError: " +
              err.message
          );
        }
        
        else if (err.response) {
          const errorMessage =
            err.response.data?.message || err.response.data?.error || "Signup failed";
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
        <div className="w-[90%] h-[85%] max-w-[1400px] flex flex-col lg:flex-row items-center justify-center ml-auto mr-6 mt-8 gap-6 lg:gap-8">
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
                  Sign Up
                </h1>

                <div className="w-full flex flex-col gap-5">
                  {/* First & Last Name */}
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="flex-1 w-full flex flex-col gap-1.5">
                      <label htmlFor="firstName" className="font-semibold text-[#141111b0] text-sm md:text-base">
                        First name
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        className={`h-[48px] md:h-[52px] rounded-[12px] px-4 border transition-all ${
                          formik.touched.firstName && formik.errors.firstName
                            ? "border-red-500"
                            : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-[#047857cf] focus:border-transparent text-sm md:text-base`}
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.firstName && formik.errors.firstName && (
                        <span className="text-xs text-red-500 mt-0.5">
                          {formik.errors.firstName}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 w-full flex flex-col gap-1.5">
                      <label htmlFor="lastName" className="font-semibold text-[#141111b0] text-sm md:text-base">
                        Last name
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        className={`h-[48px] md:h-[52px] rounded-[12px] px-4 border transition-all ${
                          formik.touched.lastName && formik.errors.lastName
                            ? "border-red-500"
                            : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-[#047857cf] focus:border-transparent text-sm md:text-base`}
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.lastName && formik.errors.lastName && (
                        <span className="text-xs text-red-500 mt-0.5">
                          {formik.errors.lastName}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="font-semibold text-[#141111b0] text-sm md:text-base">
                      Phone
                    </label>
                    <div className={`flex items-center h-[48px] md:h-[52px] bg-white rounded-[12px] px-4 gap-3 border transition-all ${
                      formik.touched.phone && formik.errors.phone
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus-within:ring-2 focus-within:ring-[#047857cf] focus-within:border-transparent`}>
                      <img
                        className="w-[18px] md:w-[20px]"
                        alt="Icon"
                        src="https://c.animaapp.com/mi64iwj2VieceI/img/icon.svg"
                      />
                      <span className="text-[#14111154] text-sm md:text-base">+20</span>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        className="border-none outline-none flex-1 text-sm md:text-base"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    {formik.touched.phone && formik.errors.phone && (
                      <span className="text-xs text-red-500 mt-0.5">
                        {formik.errors.phone}
                      </span>
                    )}
                  </div>

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
                          autoComplete="new-password"
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

                  {/* Confirm Password */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="confirmPassword" className="font-semibold text-[#141111b0] text-sm md:text-base">
                      Confirm password
                    </label>
                    <div className={`flex items-center justify-between bg-white rounded-[12px] px-4 border h-[48px] md:h-[52px] transition-all ${
                      formik.touched.confirmPassword && formik.errors.confirmPassword
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
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          autoComplete="new-password"
                          placeholder="Confirm password"
                          className="border-none outline-none flex-1 text-sm md:text-base"
                          value={formik.values.confirmPassword}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                    </div>
                    {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword && (
                        <span className="text-xs text-red-500 mt-0.5">
                          {formik.errors.confirmPassword}
                        </span>
                      )}
                  </div>

                  {/* Button */}
                  <div className="flex flex-col items-center gap-4 mt-3">
                    <button
                      type="submit"
                      className="w-full h-[50px] md:h-[54px] bg-[#047857cf] hover:bg-[#047857] rounded-[12px] text-white text-base md:text-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                    >
                      Sign Up
                    </button>

                    <div className="text-sm md:text-base text-center">
                      <span className="font-semibold text-[#141111b0]">
                        Do you have an account?
                      </span>
                      <button
                        type="button"
                        className="font-bold text-[#047857cf] cursor-pointer hover:underline ml-1"
                        onClick={() => navigate("/login")}
                      >
                        Log in
                      </button>
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