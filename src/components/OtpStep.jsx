/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from "react";
import { Shield, Lock, CheckCircle, RotateCcw, Smartphone } from "lucide-react";
import { postRequest } from "../Helpers";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, updateUserProfile } from "../redux/slices/userSlice";
import { setCookieItem } from "../Hooks/cookie";
const slides = [
  {
    image:
      "https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZG9jdG9yfGVufDB8fDB8fHww",
    heading: "Secure & Fast",
    subtext: "Quick OTP Verification for Seamless Login",
    icon: Shield,
  },
  {
    image:
      "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9jdG9yfGVufDB8fDB8fHww",
    heading: "Your Data is Safe",
    subtext: "End-to-End Encryption of Sensitive Info",
    icon: Lock,
  },
];

const OtpStep = ({
  mobile = "",
  onVerifySuccess,
  redirectTo = "/user-details",
  authToken = null,
  onAuthSuccess = null,
  isFromSignup = false,
  onLoginSuccess = null,
}) => {
  const dispatch = useDispatch();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const otpRefs = useRef([]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  // Slider rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Resend timer
  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  // Auto-advance on digit input
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < otpRefs.current.length - 1) {
        otpRefs.current[index + 1].focus();
      }
    } else {
      e.target.value = "";
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        // If current field has a value, clear it
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // If current field is empty, go to previous field
        otpRefs.current[index - 1].focus();
      }
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);
    const newOtp = [...otp];

    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    // Focus on the next empty field or last field
    const nextIndex = Math.min(pastedData.length, 3);
    otpRefs.current[nextIndex].focus();
  };

  // Store authentication data
  const handleAuthSuccess = (token, id) => {
    try {
      // Store auth token using cookies
      if (token) {
        setCookieItem("Token", token, 30);
      }

      // Call custom auth success handler if provided
      if (onAuthSuccess) {
        onAuthSuccess({
          token,
          mobile,
          isAuthenticated: true,
          loginTime: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error("Error storing auth data:", error);
    }
  };

  const handleVerifyOtp = async () => {
    const otpCode = otp.join("");

    // 1. Check OTP length
    if (otpCode.length !== 4) {
      toast.error("Please enter a 4-digit OTP");
      return;
    }

    setIsLoading(true);

    try {
      const cred = {
        phone: mobile,
        otp: otpCode,
      };

      // 2. API call
      const response = await postRequest({ url: "auth/verifyOtp", cred });

      // 3. Handle success
      if (response?.data?.success && response?.data?.statusCode === 200) {
        const token = response?.data?.data?.authToken;

        if (!token) {
          throw new Error("Token not found in response");
        }
        const userData = response?.data;
        console.log("userData", userData?.data?._id);
        // dispatch(login(userData))
        // console.log("userData?.data?.isNew", userData?.data?.isNew)

        // Update user profile for both new and existing users
        // if (userData?.data?.isNew === false) {
        //   dispatch(updateUserProfile(userData.data));
        // }

        setIsVerified(true);
        handleAuthSuccess(token, userData?.data?._id);

        // Only navigate to UserDetails if user came from signup
        if (isFromSignup) {
          // navigateToNextScreen();
          navigate("/user-details", { state: { userId: userData?.data?._id } });
        } else {
          // For login users, just show success and call the callback
          toast.success("Login successful!");

          if (onLoginSuccess) {
            onLoginSuccess();
            navigate("/location", { state: { userId: userData?.data?._id } });
          }
        }
      }
      // 4. Handle API-level errors
      else {
        const errorMessage = response?.message || "OTP verification failed";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("OTP verification error:", error);

      if (error?.response?.data?.message) {
        // Backend returned a specific error message
        toast.error(error.response.data.message);
      } else {
        // General or network error
        toast.error(error.message || "Something went wrong. Please try again.");
      }
    } finally {
      // 5. Stop loading spinner
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendTimer(30);
    setCanResend(false);
    setOtp(["", "", "", ""]);
    otpRefs.current[0].focus();

    try {
      const cred = { phone: mobile };
      // Simulate API call to resend OTP
      const response = await postRequest({
        url: "auth/resendOtp",
        cred,
      });
      const otp = response?.data?.data?.otp;
      const message = response?.data?.message || "OTP sent successfully!";
      console.log(response?.data?.data?.otp);
      toast.success(` ${otp} ${message}`);
    } catch (error) {
      console.error("Error resending OTP:", error?.response?.data?.message);
      // alert("Failed to resend OTP. Please try again.");
    }
  };

  const { image, heading, subtext, icon: Icon } = slides[currentSlide];
  const isOtpComplete = otp.every((digit) => digit !== "");

  return (
    <div className="flex items-center justify-center py-4 md:py-0 md:p-4">
      <div className="flex w-full max-w-6xl bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden border border-white/20">
        {/* Left Slider Section */}
        <div className="hidden lg:flex lg:w-1/2 relative text-white flex-col justify-center items-center p-12 transition-all duration-700 ease-in-out">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-blue-600 to-indigo-700"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>

          <div className="relative z-10 text-center space-y-6">
            <div className="w-32 h-32 mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-white/10 rounded-full blur-xl"></div>
              <img
                src={image}
                alt={heading}
                className="w-full h-full object-cover rounded-full border-4 border-white/20 shadow-2xl relative z-10 transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute -bottom-2 -right-2 bg-white/20 rounded-full p-2 backdrop-blur-sm">
                <Icon size={24} className="text-white" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-3xl font-bold tracking-tight">{heading}</h3>
              <p className="text-white/90 text-lg font-medium">{subtext}</p>
            </div>
          </div>

          {/* Enhanced Dots */}
          <div className="absolute bottom-8 flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 ${
                  index === currentSlide
                    ? "w-8 h-3 bg-white rounded-full"
                    : "w-3 h-3 bg-white/40 rounded-full hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right OTP Form Section */}
        <div className="w-full lg:w-1/2 p-4 md:p-8 lg:p-12 bg-white relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>

          <div className="relative z-10 space-y-8">
            <div className="text-center space-y-4">
              <div
                className={`w-16 h-16 mx-auto bg-gradient-to-br rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                  isVerified
                    ? "from-green-500 to-emerald-500"
                    : "from-emerald-500 to-blue-500"
                }`}
              >
                {isVerified ? (
                  <CheckCircle className="text-white" size={28} />
                ) : (
                  <Smartphone className="text-white" size={28} />
                )}
              </div>
              <div className="space-y-2">
                <h2 className="text-xl md:text-3xl font-bold text-gray-900 tracking-tight">
                  {isVerified ? "Verified!" : "Verify OTP"}
                </h2>
                <p className="text-gray-600 text-lg">
                  {isVerified ? (
                    <span className="text-green-600 font-semibold">
                      OTP verified successfully! Redirecting...
                    </span>
                  ) : (
                    <>
                      Enter the 4-digit code sent to{" "}
                      <span className="text-sm md:text-lg font-semibold text-gray-900">
                        {" "}
                        <br />
                        +91-{mobile}
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-center gap-4">
                  {[0, 1, 2, 3].map((index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      value={otp[index]}
                      disabled={isVerified}
                      className={`w-14 h-14 text-2xl font-bold text-center border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 hover:border-gray-300 ${
                        isVerified
                          ? "border-green-300 bg-green-50 text-green-700"
                          : "border-gray-200 bg-gray-50 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500/20"
                      }`}
                      onChange={(e) => handleOtpChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onPaste={handlePaste}
                      ref={(el) => (otpRefs.current[index] = el)}
                    />
                  ))}
                </div>

                {!isVerified && (
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                      <div className="w-8 h-0.5 bg-gray-200 rounded"></div>
                      <span>Paste code here</span>
                      <div className="w-8 h-0.5 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={handleVerifyOtp}
                disabled={!isOtpComplete || isLoading || isVerified}
                className={`w-full py-4 text-sm text-lg font-semibold rounded-xl flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 ${
                  isVerified
                    ? "bg-green-600 text-white"
                    : "bg-gradient-to-r from-emerald-600 to-blue-600 text-white hover:from-emerald-700 hover:to-blue-700"
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Verifying...
                  </>
                ) : isVerified ? (
                  <>
                    <CheckCircle size={20} />
                    Verified Successfully!
                  </>
                ) : (
                  <>
                    <CheckCircle size={20} />
                    Verify OTP
                  </>
                )}
              </button>

              {/* Resend Section */}
              {!isVerified && (
                <div className="text-center space-y-3">
                  <p className="text-sm text-gray-500">
                    Didn't receive the code?
                  </p>
                  {canResend ? (
                    <button
                      onClick={handleResendOtp}
                      className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
                    >
                      <RotateCcw size={16} />
                      Resend OTP
                    </button>
                  ) : (
                    <div className="inline-flex items-center gap-2 text-gray-500">
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-emerald-500 rounded-full animate-spin"></div>
                      Resend in {resendTimer}s
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Security Note */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 rounded-full p-2">
                  <Shield className="text-blue-600" size={16} />
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Secure:</span> Your OTP is
                    encrypted and expires in 5 minutes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View Slider Preview */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={image}
              alt={heading}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 text-sm">{heading}</h4>
            <p className="text-gray-600 text-xs">{subtext}</p>
          </div>
          <div className="flex space-x-1">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-emerald-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpStep;
