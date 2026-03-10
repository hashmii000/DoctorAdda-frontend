/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Users,
  CheckCircle,
  ArrowRight,
  UserCheck,
  Settings,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile } from "../redux/slices/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { patchRequest } from "../Helpers";
const slides = [
  {
    image:
      "https://plus.unsplash.com/premium_photo-1673953509975-576678fa6710?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D",
    heading: "Profile Setup",
    subtext: "Tell us a bit about yourself",
    icon: UserCheck,
  },
  {
    image:
      "https://media.istockphoto.com/id/868644242/photo/close-up-of-stethoscope-and-doctor.webp?a=1&b=1&s=612x612&w=0&k=20&c=R7-U9IxWlMHKapHd0J9rM-bb9f3_xAVj5MEplpFpawo=",
    heading: "Better Matches",
    subtext: "Get personalized recommendations",
    icon: Settings,
  },
];

const UserDetails = ({ onSubmitSuccess }) => {
  const loc = useLocation();
  const { userId } = loc.state || {};
  console.log("Userid passed", userId);
  const locationData = useSelector((state) => state.user.locationData);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    gender: "",
    latitude: "",
    longitude: "",
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Add this useEffect to populate location data when available
  useEffect(() => {
    if (locationData) {
      setUserData((prev) => ({
        ...prev,
        latitude: locationData.latitude,
        longitude: locationData.longitude,
      }));
    }
  }, [locationData]);
  const validateForm = () => {
    const newErrors = {};

    if (!userData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (userData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!userData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!userData.gender) {
      newErrors.gender = "Please select your gender";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    const cred = {
      name: userData.name,
      email: userData.email,
      gender: userData.gender,
      latitude: userData.latitude,
      longitude: userData.longitude,
    };

    console.log("User Data to Submit: cred", cred);

    try {
      const res = await patchRequest({
        url: `auth/updateProfile/${userId}`,
        cred,
      });
      console.log("User Detail screen response", res)
      toast.success("Profile details saved!");
      navigate("/location", { state: { userId: userId } });
    } catch (err) {
      console.error("Error saving profile data:", err);
      toast.error("Failed to save profile data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const { image, heading, subtext, icon: Icon } = slides[currentSlide];

  return (
    <div className=" flex items-center justify-center p-4 py-10 pt-24 md:pt-40">
      <div className="flex w-full max-w-6xl bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden border border-white/20">
        {/* Left Slider Section */}
        <div className="hidden lg:flex lg:w-1/2 relative text-white flex-col justify-center items-center p-12 transition-all duration-700 ease-in-out">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-blue-600"></div>
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

        {/* Right Form Section */}
        <div className="w-full lg:w-1/2 p-4 md:p-8 lg:p-12 bg-white relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>

          <div className="relative z-10 space-y-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <User className="text-white" size={28} />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl md:text-3xl font-bold text-gray-900 tracking-tight">
                  Complete Your Profile
                </h2>
                <p className="text-gray-600 text-sm md:text-lg">
                  Just a few more details to get started
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <User size={16} />
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={userData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-4 border-2 rounded-xl md:text-lg text-sm outline-none transition-all duration-300 bg-gray-50 focus:bg-white placeholder-gray-400 ${
                      errors.name
                        ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                        : "border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 hover:border-gray-300"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-xs">
                        !
                      </span>
                      {errors.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Mail size={16} />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={userData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-4 border-2 rounded-xl md:text-lg text-sm outline-none transition-all duration-300 bg-gray-50 focus:bg-white placeholder-gray-400 ${
                      errors.email
                        ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                        : "border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 hover:border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-xs">
                        !
                      </span>
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Gender Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Users size={16} />
                  Gender
                </label>
                <div className="relative">
                  <select
                    name="gender"
                    value={userData.gender}
                    onChange={handleChange}
                    className={`w-full px-4 py-4 border-2 rounded-xl text-sm md:text-lg outline-none transition-all duration-300 bg-gray-50 focus:bg-white ${
                      errors.gender
                        ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                        : "border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 hover:border-gray-300"
                    }`}
                  >
                    <option value="">Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-xs">
                        !
                      </span>
                      {errors.gender}
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold rounded-xl flex items-center justify-center gap-3 hover:from-violet-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 text-sm md:text-lg"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Creating Profile...
                  </>
                ) : (
                  <>
                    <CheckCircle size={20} />
                    Complete Profile
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </div>

            {/* Privacy Note */}
            <div className="bg-gradient-to-r from-gray-50 to-violet-50 border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="bg-violet-100 rounded-full p-2">
                  <User className="text-violet-600" size={16} />
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Privacy:</span> Your
                    information is secure and will only be used to personalize
                    your experience
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
                  index === currentSlide ? "bg-violet-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
