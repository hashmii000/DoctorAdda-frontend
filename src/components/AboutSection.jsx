import React, { useState, useEffect } from "react";
import {
  Heart,
  Users,
  Clock,
  Shield,
  Stethoscope,
  Activity,
} from "lucide-react";

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Doctors",
      description: "Connect with qualified healthcare professionals",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Availability",
      description: "Access medical consultations anytime, anywhere",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Platform",
      description: "Your health data is protected with advanced security",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50 py-20 px-6">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-300 rounded-full opacity-20 animate-bounce delay-1000"></div>
        <div className="absolute bottom-32 right-1/3 w-14 h-14 bg-green-300 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            {/* Main Image Container */}
            <div className="relative bg-gradient-to-br from-blue-600 to-green-600 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <div className="bg-white rounded-2xl p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-green-500 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse">
                  <Stethoscope className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Healthcare Made Simple
                </h3>
                <p className="text-gray-600 mb-6">
                  Connecting you with trusted medical professionals instantly
                </p>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -top-6 -left-6 bg-white rounded-xl p-4 shadow-lg animate-float">
              <div className="flex items-center space-x-2">
                <Activity className="w-6 h-6 text-green-500" />
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    1000+
                  </div>
                  <div className="text-xs text-gray-500">Doctors</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg animate-float delay-500">
              <div className="flex items-center space-x-2">
                <Heart className="w-6 h-6 text-blue-500" />
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    10k+
                  </div>
                  <div className="text-xs text-gray-500">Patients</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative">
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-pulse">
                <Heart className="w-4 h-4 mr-2" />
                Healthcare Excellence
              </div>

              <h2 className="text-4xl  font-bold text-gray-900 mb-6 leading-tight">
                About{" "}
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Doctor's Adda
                </span>
              </h2>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                DoctorsAdda Healthtech Private Limited is your comprehensive
                healthcare solution that bridges the gap between doctors and
                patients. We make medical consultations more accessible,
                convenient, and efficient through our innovative platform.
              </p>

              <div className="grid grid-cols-1 gap-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-4 transition-all duration-700 delay-${
                      index * 200
                    } ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-5"
                    }`}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center text-white transform hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default AboutSection;
