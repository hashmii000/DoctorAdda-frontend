/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { ArrowRight, Shield, Clock, Award, Phone, Gift } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { postRequest } from "../Helpers";
import { useNavigate } from "react-router-dom";
const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZG9jdG9yfGVufDB8fDB8fHww",
    heading: "Cost Effective",
    subtext: "Honest Price Guaranteed",
    icon: Shield,
  },
  {
    image:
      "https://media.istockphoto.com/id/868644242/photo/close-up-of-stethoscope-and-doctor.webp?a=1&b=1&s=612x612&w=0&k=20&c=R7-U9IxWlMHKapHd0J9rM-bb9f3_xAVj5MEplpFpawo=",
    heading: "Trusted Labs",
    subtext: "Verified and Certified Partners",
    icon: Award,
  },
  {
    image:
      "https://media.istockphoto.com/id/1301595548/photo/female-doctor-stock-photo.webp?a=1&b=1&s=612x612&w=0&k=20&c=PW3Lbgi6F8DjYdKffpo6Uyo07ZBxw69utLcASzxX3b0=",
    heading: "Home Sample Collection",
    subtext: "Safe & Convenient Testing",
    icon: Clock,
  },
];

const LoginStep = ({ setStep, setMobile, setMode }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileNumber, setMobileNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    // Your login API call here
    const cred = { phone: mobileNumber };
    try {
      const res = await postRequest({ url: "auth/login", cred });
      console.log("OTP Response:", res?.data?.data.otp);

      if (res?.data?.statusCode === 200 && res?.data?.success) {
        toast.success("OTP sent successfully! " + res?.data?.data?.otp);
        //await new Promise(resolve => setTimeout(resolve, 1000))
        setStep(2);
        setIsLoading(false);
      } else {
        toast.error(res?.data?.message || "User not found. Signup first!");
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Server error. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const { image, heading, subtext, icon: Icon } = slides[currentSlide];

  return (
    <div className=" flex items-center justify-center md:p-4">
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

        {/* Right Login Form Section */}
        <div className="w-full lg:w-1/2 py-4 md:py-12 px-4 lg:p-12 bg-white relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>

          <div className="relative z-10 space-y-8">
            <div className="space-y-3">
              <h2 className=" text-xl md:text-3xl font-bold text-gray-900 tracking-tight">
                Welcome <span className="text-blue-600">Back</span> To Doctor
                Adda
              </h2>
              <p className="text-gray-600 text-sm md:text-lg">
                Enter your mobile number to continue
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Phone size={16} />
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 py-4 transition-all duration-300 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 hover:border-gray-300 overflow-x-hidden">
                    <div className="flex items-center gap-3 text-gray-600 border-r border-gray-200 pr-4">
                      <span className="text-sm md:text-xl">🇮🇳</span>
                      <span className="font-semibold">+91</span>
                    </div>
                    <input
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      value={mobileNumber}
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10);
                        setMobileNumber(value);
                        setMobile(value);
                      }}
                      className="flex-1 text-sm md:text-lg outline-none bg-transparent ml-4 placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  handleLogin();
                }}
                disabled={mobileNumber.length < 10 || isLoading}
                className="w-full py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold rounded-xl flex items-center justify-center gap-3 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 text-sm md:text-lg"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                ) : (
                  <>
                    Continue <ArrowRight size={20} />
                  </>
                )}
              </button>
            </div>

            {/* Enhanced Promo Info */}
            {/* <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-xl p-5 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 rounded-full p-2">
                  <Gift className="text-emerald-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Welcome Bonus:</span> Get{" "}
                    <span className="text-emerald-600 font-bold text-lg">
                      ₹1000
                    </span>{" "}
                    cash in your wallet
                  </p>
                </div>
              </div>
            </div> */}

            <div className="flex items-center justify-center gap-1 text-gray-500 text-sm">
              <p>Don't have an account?</p>
              <button
                onClick={() => setMode && setMode("signup")}
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors cursor-pointer"
              >
                SignUp
              </button>
            </div>

            {/* Terms */}
            <div className="text-center">
              <p className="text-sm text-gray-500 leading-relaxed">
                By continuing, you agree to our{" "}
                <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors underline decoration-blue-600/30 hover:decoration-blue-700">
                  Terms of Service
                </button>{" "}
                and{" "}
                <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors underline decoration-blue-600/30 hover:decoration-blue-700">
                  Privacy Policy
                </button>
              </p>
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
                  index === currentSlide ? "bg-blue-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginStep;
