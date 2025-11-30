import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function ForgetPassword() {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [formData, setFormData] = useState({
    email: "",
    otp: ["", "", "", "", "", ""],
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Timer for OTP resend
  React.useEffect(() => {
    if (step === 2 && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step, timer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...formData.otp];
    newOtp[index] = value.slice(-1);
    setFormData(prev => ({ ...prev, otp: newOtp }));

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !formData.otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const validateField = (name, value) => {
    let error = "";
    
    switch(name) {
      case "email":
        if (!value) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email address";
        break;
      case "newPassword":
        if (!value) error = "Password is required";
        else if (value.length < 6) error = "Password must be at least 6 characters";
        break;
      case "confirmPassword":
        if (!value) error = "Confirm password is required";
        else if (value !== formData.newPassword) error = "Passwords must match";
        break;
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleEmailSubmit = async () => {
    validateField("email", formData.email);
    setTouched({ email: true });
    
    if (!formData.email || errors.email) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setStep(2);
    setTimer(60);
    setCanResend(false);
  };

  const handleOtpSubmit = async () => {
    const otpValue = formData.otp.join("");
    
    if (otpValue.length !== 6) {
      alert("❌ Please enter complete OTP code");
      return;
    }
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setStep(3);
  };

  const handlePasswordSubmit = async () => {
    validateField("newPassword", formData.newPassword);
    validateField("confirmPassword", formData.confirmPassword);
    setTouched({ newPassword: true, confirmPassword: true });
    
    const hasErrors = errors.newPassword || errors.confirmPassword;
    if (hasErrors || !formData.newPassword || !formData.confirmPassword) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    alert("✅ Password reset successful! (Demo)");
    setIsSubmitting(false);
    navigate('/login')
  };

  const handleResendOtp = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setTimer(60);
    setCanResend(false);
    setFormData(prev => ({ ...prev, otp: ["", "", "", "", "", ""] }));
    alert("✅ OTP sent successfully!");
  };

   const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 overflow-hidden bg-gradient-to-br from-green-50 via-white to-yellow-50">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bg-green-200 rounded-full -top-40 -right-40 w-80 h-80 mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute bg-yellow-200 rounded-full -bottom-40 -left-40 w-80 h-80 mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-green-100 rounded-full top-1/2 left-1/2 w-80 h-80 mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back to Login */}
        <button
          onClick={navigateToLogin}
          className="flex items-center gap-2 mb-6 text-gray-600 transition-all hover:text-green-600 animate-fadeInDown"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-medium">Back to Login</span>
        </button>

        <div className="p-8 space-y-6 bg-white shadow-2xl rounded-2xl backdrop-blur-sm bg-opacity-95 animate-fadeInUp">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((num) => (
              <React.Fragment key={num}>
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                      step >= num
                        ? "bg-green-600 text-white scale-110"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {step > num ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      num
                    )}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${step >= num ? "text-green-600" : "text-gray-400"}`}>
                    {num === 1 ? "Email" : num === 2 ? "Verify" : "Reset"}
                  </span>
                </div>
                {num < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded transition-all duration-300 ${
                      step > num ? "bg-green-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step 1: Email Input */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="mb-2 text-2xl font-bold text-green-800">Forgot Password?</h2>
                <p className="text-sm text-gray-600">
                  No worries! Enter your email and we'll send you a reset code
                </p>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    touched.email && errors.email
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 focus:border-green-500"
                  }`}
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.email && errors.email && (
                  <p className="mt-1 text-xs text-red-500 animate-shake">
                    {errors.email}
                  </p>
                )}
              </div>

              <button
                onClick={handleEmailSubmit}
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                    Sending Code...
                  </span>
                ) : (
                  "Send Reset Code"
                )}
              </button>
            </div>
          )}

          {/* Step 2: OTP Verification */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="mb-2 text-2xl font-bold text-green-800">Verify Your Email</h2>
                <p className="text-sm text-gray-600">
                  We've sent a 6-digit code to<br />
                  <span className="font-semibold text-green-600">{formData.email}</span>
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-center text-gray-700">
                  Enter Verification Code
                </label>
                <div className="flex justify-center gap-2">
                  {formData.otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      className="w-12 h-12 text-xl font-bold text-center transition-all border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    />
                  ))}
                </div>
              </div>

              <div className="text-sm text-center">
                {timer > 0 ? (
                  <p className="text-gray-600">
                    Resend code in <span className="font-semibold text-green-600">{timer}s</span>
                  </p>
                ) : (
                  <button
                    onClick={handleResendOtp}
                    disabled={isSubmitting}
                    className="font-semibold text-green-600 transition-all hover:text-green-700 hover:underline"
                  >
                    Resend Code
                  </button>
                )}
              </div>

              <button
                onClick={handleOtpSubmit}
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                    Verifying...
                  </span>
                ) : (
                  "Verify Code"
                )}
              </button>
            </div>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h2 className="mb-2 text-2xl font-bold text-green-800">Set New Password</h2>
                <p className="text-sm text-gray-600">
                  Create a strong password for your account
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      name="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={`w-full px-4 py-3 pr-12 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                        touched.newPassword && errors.newPassword
                          ? "border-red-400 bg-red-50"
                          : "border-gray-200 focus:border-green-500"
                      }`}
                      value={formData.newPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute text-gray-400 transition-colors -translate-y-1/2 right-4 top-1/2 hover:text-green-600"
                    >
                      {showNewPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                    {touched.newPassword && errors.newPassword && (
                      <p className="mt-1 text-xs text-red-500 animate-shake">
                        {errors.newPassword}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={`w-full px-4 py-3 pr-12 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                        touched.confirmPassword && errors.confirmPassword
                          ? "border-red-400 bg-red-50"
                          : "border-gray-200 focus:border-green-500"
                      }`}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute text-gray-400 transition-colors -translate-y-1/2 right-4 top-1/2 hover:text-green-600"
                    >
                      {showConfirmPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                    {touched.confirmPassword && errors.confirmPassword && (
                      <p className="mt-1 text-xs text-red-500 animate-shake">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={handlePasswordSubmit}
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                    Resetting Password...
                  </span>
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.6s ease-out;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}