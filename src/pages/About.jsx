import React, { useEffect, useState } from "react";
import { Heart, Calendar, Video, Shield, Users, Clock, CheckCircle, Star } from 'lucide-react';
import DoctorsBanner from "../components/DoctorsBanner"; 
import AboutSection from '../components/AboutSection';

const About = () => {
  useEffect(() => {
          window.scrollTo(0, 0);
        }, []);
  const features = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Instant Appointment Booking",
      description: "Easily schedule consultations with experienced doctors across various specialties"
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Teleconsultation",
      description: "Connect with doctors online for quick medical advice without stepping out of your home"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Medical Records",
      description: "Keep track of prescriptions, reports, and medical history in one place"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Trusted Healthcare Network",
      description: "Find certified and experienced doctors, clinics, and hospitals near you"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Our dedicated team is always available to assist you with any queries or issues"
    }
  ];

  const benefits = [
    { icon: <CheckCircle className="w-6 h-6" />, title: "Convenience", desc: "Book appointments anytime, anywhere" },
    { icon: <Star className="w-6 h-6" />, title: "Verified Doctors", desc: "Connect with qualified healthcare professionals" },
    { icon: <Shield className="w-6 h-6" />, title: "Secure & Private", desc: "Your data and medical records are safely stored" },
    { icon: <Heart className="w-6 h-6" />, title: "Seamless Experience", desc: "User-friendly interface for effortless healthcare management" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      
      <DoctorsBanner />
      <AboutSection />

      {/* Mission Section */}
      <div className="max-w-6xl mx-auto  py-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            At Doctor's Adda, our mission is to revolutionize healthcare by leveraging technology to provide 
            hassle-free appointment booking, teleconsultation, and easy access to medical records. We aim to 
            ensure that quality healthcare is just a tap away.
          </p>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">What We Offer</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive healthcare solutions designed to make your medical journey smooth and efficient.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-4 rounded-full w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Why Choose Us?</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto mb-8"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-2 rounded-full flex-shrink-0">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience Smarter Healthcare?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join Doctor's Adda today and discover a revolutionary way to access healthcare services.
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            Get Started Today
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">Verified Doctors</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-green-600 mb-2">50K+</div>
              <div className="text-gray-600">Happy Patients</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-gray-600">Secure & Private</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;